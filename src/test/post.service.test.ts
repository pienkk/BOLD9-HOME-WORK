import { PostService } from "../services/PostService";
import { Post, User } from "@prisma/client";
import { CreatePostDto } from "../dtos/createPostDto";
import prisma from "../../prisma/context";

describe("PostService 게시글 비즈니스 로직", () => {
  let postService: PostService;

  beforeEach(() => {
    postService = new PostService();
  });

  describe("createPost() 게시글 생성", () => {
    // 게시글 생성 정보
    const createPostDto: CreatePostDto = {
      title: "graphql은 말이야",
      content: "써보고 말해",
      published: true,
      email: "kisuk623@gmail.com",
      password: "Qwerasd!22",
    };
    // DB 유저 정보
    const existingUser: User = {
      id: 1,
      email: "kisuk623@gmail.com",
      name: "장기석",
      password: "Qwerasd!22",
      createdAt: new Date("2022-03-01"),
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

    // 성공
    it("입력된 유저의 정보가 존재할 경우 게시글을 작성하고 작성된 게시글 정보를 반환한다.", async () => {
      // prisma Mock
      const prismaUserFindFirstSpy = jest
        .spyOn(prisma.user, "findFirst")
        .mockResolvedValue(existingUser);
      const prismaPostCreateSpy = jest
        .spyOn(prisma.post, "create")
        .mockResolvedValue(existingPost);

      const result = await postService.createPost(createPostDto);

      expect(prismaUserFindFirstSpy).toHaveBeenCalledWith({
        where: {
          AND: [{ email: "kisuk623@gmail.com" }, { password: "Qwerasd!22" }],
        },
      });
      expect(prismaPostCreateSpy).toBeCalledTimes(1);
      expect(result).toEqual({
        id: 1,
        title: "graphql은 말이야",
        content: "써보고 말해",
        published: true,
        authorId: 1,
        createdAt: new Date("2022-03-01"),
      });
    });

    // 실패
    it("입력된 유저의 정보가 존재하지 않을 경우 정보가 일치하는 유저가 없다는 예외를 던진다.", async () => {
      //prisma Mock
      const prismaUserFindFirstSpy = jest
        .spyOn(prisma.user, "findFirst")
        .mockResolvedValue(null);

      const result = async () => {
        return postService.createPost(createPostDto);
      };

      expect(result).rejects.toThrow("정보가 일치하는 유저가 없습니다.");
    });
  });
});
