import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MedicalRecordDocument = HydratedDocument<MedicalRecord>;

@Schema()
export class MedicalRecord {
  @Prop({ required: true })
  patientName: string;

  @Prop({ required: true })
  patientAge: number;

  @Prop({ required: true })
  patientGender: string;

  @Prop({ required: true })
  symptoms: string[];

  @Prop({ required: true })
  diagnosis: string;

  @Prop()
  treatment: string;

  @Prop()
  medications: string[];

  @Prop()
  allergies: string[];

  @Prop()
  medicalHistory: string[];

  @Prop()
  surgeries: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
