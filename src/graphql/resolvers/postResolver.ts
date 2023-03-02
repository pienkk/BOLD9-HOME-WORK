import { PostService } from "../../services/PostService";
import { CreatePostDto } from "../../dtos/createPostDto";
import { validateOrReject } from "class-validator";
import { findPostByUserName } from "../../types/postType";
import { Comment, Post } from "@prisma/client";

const postService = new PostService();

export const postResolver = {
  Mutation: {
    /**
     * 게시글 생성
     */
    async createPost(
      _parent: void,
      args: { input: CreatePostDto }
    ): Promise<Post> {
      // input값 할당
      const createPostDto = new CreatePostDto();
      createPostDto.title = args.input.title;
      createPostDto.content = args.input.content;
      createPostDto.published = args.input.published;
      createPostDto.email = args.input.email;
      createPostDto.password = args.input.password;

      // input값 검증
      await validateOrReject(createPostDto);

      // 게시글 생성 값 반환
      return await postService.createPost(createPostDto);
    },
  },

  Query: {
    /**
     * 유저가 생성한 게시글리스트 반환
     */
    async getPostsByUser(
      _parent: void,
      args: findPostByUserName
    ): Promise<(Post & { comments: Comment[] })[]> {
      return await postService.getPostsByUser(args.name);
    },
  },
};
