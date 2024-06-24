import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicalRecord, MedicalRecordDocument } from 'src/schemas/medical-record.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(MedicalRecord.name) private medicalRecordModel: Model<MedicalRecordDocument>,
  ) {}

  async findAll(): Promise<MedicalRecord[]> {
    return this.medicalRecordModel.find().exec();
  }

  async findOne(id: string): Promise<MedicalRecord> {
    const doc = await this.medicalRecordModel.findById(id).exec();
    this.handleDocValidation(id, doc);
    return doc;
  }

  async create(createMedicalRecordDto: CreateMedicalRecordDto): Promise<MedicalRecord> {
    const user = await this.userModel.findById(createMedicalRecordDto.user);
    if (!user) {
      throw new NotFoundException(`User #${createMedicalRecordDto.user} not found`);
    }
    const newMedicalRecord = new this.medicalRecordModel(createMedicalRecordDto);
    const savedMedicalRecord = await newMedicalRecord.save();
    user.medicalRecords.push(savedMedicalRecord);
    await user.save();

    return savedMedicalRecord;
  }

  async update(id: string, updateMedicalRecordDto: UpdateMedicalRecordDto): Promise<MedicalRecord> {
    const doc = await this.medicalRecordModel.findByIdAndUpdate(id, updateMedicalRecordDto, { new: true }).exec();
    this.handleDocValidation(id, doc);
    return doc;
  }

  async remove(id: string): Promise<MedicalRecord> {
    const doc = await this.medicalRecordModel.findByIdAndDelete(id).exec();
    this.handleDocValidation(id, doc);
    await this.userModel.findByIdAndUpdate(doc.user, {
      $pull: { medicalRecords: doc._id },
    });
    return doc;
  }

  private handleDocValidation(id: string, doc: MedicalRecord) {
    if (!doc) {
      throw new NotFoundException(`Medical record #${id} not found`);
    }
  }
}
