import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalRecordController } from './medical-record/medical-record.controller';
import { MedicalRecordService } from './medical-record/medical-record.service';
import { MedicalRecord, MedicalRecordSchema } from './schemas/medical-record.schema';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User, UserSchema } from './schemas/user.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      dbName: process.env.DATABASE_NAME,
    }),
    MongooseModule.forFeature([
      { name: MedicalRecord.name, schema: MedicalRecordSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [MedicalRecordController, UserController],
  providers: [MedicalRecordService, UserService],
})
export class AppModule {}
