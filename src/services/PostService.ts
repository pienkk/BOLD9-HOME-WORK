import { CreatePostDto } from "../dtos/createPostDto";
import prisma from "../../prisma/context";
import { GraphQLError } from "graphql";

export class PostService {
  /**
   * 게시글 생성
   */
  public async createPost(createPostDto: CreatePostDto) {
    // 유저 가입 여부 확인
    const user = await prisma.user.findFirst({
      where: {
        AND: [
          { email: createPostDto.email },
          { password: createPostDto.password },
        ],
      },
    });
    // 정보가 일치하는 유저가 없는 경우
    if (!user) {
      throw new GraphQLError("정보가 일치하는 유저가 없습니다.", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    // 게시글 생성 후 생성된 게시글 반환
    return prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        published: createPostDto.published,
        authorId: user.id,
      },
    });
  }
}
