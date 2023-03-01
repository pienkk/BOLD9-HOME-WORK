import { CreatePostDto } from "../dtos/createPostDto";
import prisma from "../../prisma/context";
import { GraphQLError } from "graphql";

export class PostService {
  /**
   * 게시글 생성
   */
  public async createPost(createPostDto: CreatePostDto) {
    // 유저 가입 여부 확인
    const user = await prisma.user.findUnique({
      where: { email: createPostDto.email },
    });
    // 없는 유저이거나, 비밀번호가 일치하지 않을 경우
    if (!user || user.password !== createPostDto.password) {
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
