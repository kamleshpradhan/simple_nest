/* eslint-disable prettier/prettier */
import { IsString, IsOptional } from 'class-validator';

export class EditBookmarksDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  link: string;
}
