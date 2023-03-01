import { CommentService } from "../../services/CommentService";
import { CreateCommentDto } from "../../dtos/createCommentDto";
import { validateOrReject } from "class-validator";

const commentService = new CommentService();

export const commentResolver = {
  Mutation: {
    /**
     * 댓글 생성
     */
    async createComment(_parent: void, args: { input: CreateCommentDto }) {
      // input값 할당
      const createCommentDto = new CreateCommentDto();
      createCommentDto.content = args.input.content;
      createCommentDto.postId = Number(args.input.postId);

      // input값 검증
      await validateOrReject(createCommentDto);

      // 댓글 생성 값 반환
      return await commentService.createComment(createCommentDto);
    },
  },
};
