import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MedicalRecord, MedicalRecordDocument } from 'src/schemas/medical-record.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(MedicalRecord.name) private medicalRecordModel: Model<MedicalRecordDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('medicalRecords').exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).populate('medicalRecords').exec();
    this.handleDocValidation(id, user);
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const doc = new this.userModel(createUserDto);
    return doc.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const doc = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    this.handleDocValidation(id, doc);
    return doc;
  }

  async remove(id: string): Promise<any> {
    const doc = await this.userModel.findByIdAndDelete(id).exec();
    this.handleDocValidation(id, doc);
    await this.medicalRecordModel.deleteMany({
      user: id,
    });
    return doc;
  }

  private handleDocValidation(id: string, doc: User) {
    if (!doc) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
}
