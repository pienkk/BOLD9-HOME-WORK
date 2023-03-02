import { IsNotEmpty, IsNumber, IsString } from "class-validator";

/**
 * 댓글 생성에 필요한 입력 값
 */
export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsNumber()
  @IsNotEmpty()
  postId!: number;
}
