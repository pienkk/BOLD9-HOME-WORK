import { CreatePostDto } from "../dtos/createPostDto";
import prisma from "../../prisma/context";
import { GraphQLError } from "graphql";
import { Comment, Post } from "@prisma/client";

export class PostService {
  /**
   * 게시글 생성
   */
  public async createPost(createPostDto: CreatePostDto): Promise<Post> {
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
    return await prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        published: createPostDto.published,
        authorId: user.id,
      },
    });
  }

  /**
   * 유저 이름이 일치하는 유저의 게시글 리스트 반환
   */
  public async getPostsByUser(
    name: string
  ): Promise<(Post & { comments: Comment[] })[]> {
    // 유저 확인
    const user = await prisma.user.findFirst({ where: { name } });
    // 일치하는 유저가 없는 경우
    if (!user) {
      throw new GraphQLError("정보가 일치하는 유저가 없습니다.", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    }

    // 출판되고, 제목에 graphql이 포함된 게시글 리스트 반환
    return await prisma.post.findMany({
      where: {
        AND: [{ authorId: user.id }, { published: true }],
        title: { contains: "graphql" },
      },
      include: {
        comments: true,
      },
    });
  }
}
