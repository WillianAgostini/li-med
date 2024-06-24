import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MedicalRecord } from './medical-record.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dateOfBirth: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true, unique: true })
  recordNumber: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'MedicalRecord' }] })
  medicalRecords: MedicalRecord[];
}

export const UserSchema = SchemaFactory.createForClass(User);
