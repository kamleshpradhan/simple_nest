/* eslint-disable prettier/prettier */
import {IsString, IsOptional, IsNotEmpty} from "class-validator"

export class CreateBookmarksDto{
    @IsString()
    @IsOptional()
    title:string

    @IsString()
    @IsOptional()
    description:string

    @IsString()
    @IsNotEmpty()
    link:string
}