import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/, {
    message: "Invalid password",
  })
  password!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
