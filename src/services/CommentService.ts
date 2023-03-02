import { CreateCommentDto } from "../dtos/createCommentDto";
import prisma from "../../prisma/context";
import { GraphQLError } from "graphql";
import { Comment } from "@prisma/client";

export class CommentService {
  /**
   * 댓글 생성
   */
  public async createComment(
    createCommentDto: CreateCommentDto
  ): Promise<Comment> {
    // 게시글 존재 여부 확인
    const post = await prisma.post.findFirst({
      where: { id: createCommentDto.postId },
    });
    // 게시글이 없는 경우
    if (!post) {
      throw new GraphQLError(
        "존재하지 않는 게시글에는 댓글을 작성할 수 없습니다.",
        {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        }
      );
    }

    // 댓글 생성 후 생성된 댓글 반환
    return prisma.comment.create({
      data: {
        content: createCommentDto.content,
        postId: createCommentDto.postId,
      },
    });
  }
}
