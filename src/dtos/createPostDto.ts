import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsBoolean()
  @IsNotEmpty()
  published!: boolean;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  // 대문자 1개, 소문사 1개, 숫자 1개, 특수문자 1개 8 ~ 20 문자
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/, {
    message: "Invalid password",
  })
  password!: string;
}
