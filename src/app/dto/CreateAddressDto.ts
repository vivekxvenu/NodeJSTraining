import {IsNumber, IsString} from "class-validator";

export class CreateAddressDto {
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

}
