import { Type } from "class-transformer";
import {IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { UpdateAddressDto } from "./UpdateAddressDto";

export class UpdateEmployeeDto {
    @IsUUID()
    public id: string;

    @IsString()
    public name: string;

    @IsString()
    public username: string;

    @IsString()
    public password: string;

    @IsString()
    public joiningDate: Date;

    @IsNumber()
    public experience: number;

    @IsString()
    public departmentId: string;

    @IsString()
    public role: string;


    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    public address: UpdateAddressDto;

}