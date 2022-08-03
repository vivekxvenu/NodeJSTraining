import { IsString } from "class-validator";

export class LoginDto{
    @IsString()
    public name: string;

    @IsString()
    public password: string;
}