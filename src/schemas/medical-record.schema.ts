import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MedicalRecordDocument = MedicalRecord & Document;

@Schema({ timestamps: true })
export class MedicalRecord {
  @Prop()
  consultationDate: Date;

  @Prop()
  anamnese?: string;

  @Prop()
  problemList?: string;

  @Prop()
  lifestyleAndOtherInfo?: string;

  @Prop()
  physicalExam?: string;

  @Prop()
  diagnosticConclusion?: string;

  @Prop()
  medicalCertificate?: string;

  @Prop()
  prescriptions?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
