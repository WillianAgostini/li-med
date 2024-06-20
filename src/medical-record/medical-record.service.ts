import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { MedicalRecord, MedicalRecordDocument } from 'src/schemas/medical-record.schema';

@Injectable()
export class MedicalRecordService {
  constructor(@InjectModel(MedicalRecord.name) private readonly medicalRecordModel: Model<MedicalRecordDocument>) {}

  async create(createMedicalRecordDto: CreateMedicalRecordDto): Promise<MedicalRecord> {
    const createdMedicalRecord = new this.medicalRecordModel(createMedicalRecordDto);
    return createdMedicalRecord.save();
  }

  async findAll(): Promise<MedicalRecord[]> {
    return this.medicalRecordModel.find().exec();
  }

  async findOne(id: string): Promise<MedicalRecord> {
    return this.medicalRecordModel.findById(id).exec();
  }

  async update(id: string, updateMedicalRecordDto: UpdateMedicalRecordDto): Promise<MedicalRecord> {
    const existingMedicalRecord = await this.medicalRecordModel.findByIdAndUpdate(id, updateMedicalRecordDto, { new: true }).exec();

    if (!existingMedicalRecord) {
      throw new NotFoundException(`Medical record #${id} not found`);
    }
    return existingMedicalRecord;
  }

  async remove(id: string): Promise<any> {
    const deletedMedicalRecord = await this.medicalRecordModel.findOneAndDelete({ id }).exec();
    if (!deletedMedicalRecord) {
      throw new NotFoundException(`Medical record #${id} not found`);
    }
    return deletedMedicalRecord;
  }
}
