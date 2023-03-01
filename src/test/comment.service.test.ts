import { CommentService } from "../services/CommentService";
import { Comment, Post } from "@prisma/client";
import { CreateCommentDto } from "../dtos/createCommentDto";
import prisma from "../../prisma/context";

describe("CommentService 댓글 비즈니스 로직", () => {
  let commentService: CommentService;

  beforeEach(() => {
    commentService = new CommentService();
  });

  describe("createComment() 댓글 생성", () => {
    // 댓글 생성 정보
    const createCommentDto: CreateCommentDto = {
      content: "가르쳐 주세요",
      postId: 1,
    };
    // DB 게시글 정보
    const existingPost: Post = {
      id: 1,
      title: "graphql은 말이야",
      content: "써보고 말해",
      published: true,
      authorId: 1,
      createdAt: new Date("2022-03-01"),
    };
    // DB 댓글 정보
    const existingComment: Comment = {
      id: 1,
      content: "가르쳐 주세요",
      postId: 1,
      createdAt: new Date("2023-03-02"),
    };

    // 성공
    it("게시글이 존재할 경우 댓글을 작성하고 작성된 댓글 정보를 반환한다.", async () => {
      // prisma Mock
      const prismaPostFindFirstSpy = jest
        .spyOn(prisma.post, "findFirst")
        .mockResolvedValue(existingPost);
      const prismaCommentCreateSpy = jest
        .spyOn(prisma.comment, "create")
        .mockResolvedValue(existingComment);

      const result = await commentService.createComment(createCommentDto);

      expect(prismaPostFindFirstSpy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(prismaCommentCreateSpy).toBeCalledTimes(1);
      expect(result).toEqual({
        id: 1,
        content: "가르쳐 주세요",
        postId: 1,
        createdAt: new Date("2023-03-02"),
      });
    });

    // 실패
    it("게시글이 존재하지 않을 경우 존재하지 않는 게시글에는 댓글을 작성할 수 없다는 예외를 던진다.", async () => {
      // prisma Mock
      const prismaPostFindFirstSpy = jest
        .spyOn(prisma.post, "findFirst")
        .mockResolvedValue(null);

      const result = async () => {
        return commentService.createComment(createCommentDto);
      };

      expect(result).rejects.toThrow(
        "존재하지 않는 게시글에는 댓글을 작성할 수 없습니다."
      );
    });
  });
});
