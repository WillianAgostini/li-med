import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalRecordController } from './medical-record/medical-record.controller';
import { MedicalRecordService } from './medical-record/medical-record.service';
import { MedicalRecord, MedicalRecordSchema } from './schemas/medical-record.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      dbName: 'med',
    }),
    MongooseModule.forFeature([{ name: MedicalRecord.name, schema: MedicalRecordSchema }]),
  ],
  controllers: [MedicalRecordController],
  providers: [MedicalRecordService],
})
export class AppModule {}
