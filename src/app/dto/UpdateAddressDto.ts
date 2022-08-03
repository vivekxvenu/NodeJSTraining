import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";

export class UpdateAddressDto {
    @IsUUID()
    public id: string;

    @IsString()
    public line1: string;

    @IsString()
    public line2: string;

    @IsString()
    public city: string;

    @IsString()
    public state: string;

    @IsString()
    public country: string;

    @IsNumber()
    public pincode: number;

    // @IsUUID()
    // public id: string;

}
