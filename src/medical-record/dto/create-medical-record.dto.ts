import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalRecordDto {
  @ApiProperty({ example: '60d21b4667d0d8992e610c85' })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({ example: '2024-06-15' })
  @IsDateString()
  @IsNotEmpty()
  consultationDate: string;

  @ApiProperty({ example: 'Descrição detalhada da anamnese' })
  @IsString()
  anamnese: string;

  @ApiProperty({ example: 'Lista de problemas do paciente' })
  @IsString()
  problemList: string;

  @ApiProperty({ example: 'Hábitos de vida e outras informações relevantes' })
  @IsString()
  lifestyleAndOtherInfo: string;

  @ApiProperty({ example: 'Resultados do exame físico' })
  @IsString()
  physicalExam: string;

  @ApiProperty({ example: 'Conclusão diagnóstica' })
  @IsString()
  diagnosticConclusion: string;

  @ApiProperty({ example: 'Detalhes do atestado médico' })
  @IsString()
  medicalCertificate: string;

  @ApiProperty({ example: 'Prescrições médicas' })
  @IsString()
  prescriptions: string;
}
