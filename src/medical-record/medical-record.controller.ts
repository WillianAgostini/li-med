import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

@Controller('medicalRecord')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Post()
  async create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordService.create(createMedicalRecordDto);
  }

  @Get()
  async findAll() {
    return this.medicalRecordService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const medicalRecord = await this.medicalRecordService.findOne(id);
    if (!medicalRecord) {
      throw new NotFoundException('Medical record not found');
    }
    return medicalRecord;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMedicalRecordDto: UpdateMedicalRecordDto) {
    const updatedMedicalRecord = await this.medicalRecordService.update(id, updateMedicalRecordDto);
    if (!updatedMedicalRecord) {
      throw new NotFoundException('Medical record not found');
    }
    return updatedMedicalRecord;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.medicalRecordService.remove(id);
    if (!deleted) {
      throw new NotFoundException('Medical record not found');
    }
    return { message: 'Medical record deleted successfully' };
  }
}
