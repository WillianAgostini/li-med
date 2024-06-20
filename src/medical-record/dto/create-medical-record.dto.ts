import { IsString, IsNumber, IsArray, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalRecordDto {
  @ApiProperty({
    description: 'Name of the patient',
    example: 'John Doe',
  })
  @IsString()
  patientName: string;

  @ApiProperty({
    description: 'Age of the patient',
    example: 45,
  })
  @IsNumber()
  patientAge: number;

  @ApiProperty({
    description: 'Gender of the patient',
    example: 'Male',
  })
  @IsString()
  patientGender: string;

  @ApiProperty({
    description: 'List of symptoms',
    example: ['Fever', 'Cough', 'Shortness of breath'],
  })
  @IsArray()
  @IsString({ each: true })
  symptoms: string[];

  @ApiProperty({
    description: 'Diagnosis provided by the doctor',
    example: 'Pneumonia',
  })
  @IsString()
  diagnosis: string;

  @ApiProperty({
    description: 'Treatment recommended by the doctor',
    example: 'Antibiotics and rest',
    required: false,
  })
  @IsOptional()
  @IsString()
  treatment?: string;

  @ApiProperty({
    description: 'List of medications prescribed',
    example: ['Amoxicillin', 'Ibuprofen'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  medications?: string[];

  @ApiProperty({
    description: 'List of allergies',
    example: ['Penicillin', 'Peanuts'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allergies?: string[];

  @ApiProperty({
    description: 'Medical history of the patient',
    example: ['Asthma', 'Diabetes'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  medicalHistory?: string[];

  @ApiProperty({
    description: 'Surgeries the patient has undergone',
    example: ['Appendectomy', 'Knee replacement'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  surgeries?: string[];

  @ApiProperty({
    description: 'Date when the record was created',
    example: '2024-06-20T12:34:56Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @ApiProperty({
    description: 'Date when the record was last updated',
    example: '2024-06-21T12:34:56Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
