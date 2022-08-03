import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
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

    // @IsNumber()
    // public age: number;

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