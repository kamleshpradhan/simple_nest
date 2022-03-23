/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from 'class-validator';

export class Userdto {
  @IsEmail()
  email: string
  
  @IsString()
  name: string
}
