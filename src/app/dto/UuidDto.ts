import { IsDate, IsNumber, IsString, IsUUID } from "class-validator";

export class UuidDto {
    @IsUUID()
    public id: string;
}