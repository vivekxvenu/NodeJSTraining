import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./CreateAddressDto";

export class CreateEmployeeDto {
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
    @Type(() => CreateAddressDto)
    public address: CreateAddressDto;
}