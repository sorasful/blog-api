import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from "class-validator";

export class SignInDto {
    @IsEmail()
    @IsDefined()
    @ApiModelProperty()
    email: string;

    @IsEmail()
    @IsDefined()
    @ApiModelProperty()
    password: string;
}