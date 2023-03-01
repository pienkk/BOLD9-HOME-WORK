import { createServer } from "../index";
import request from "supertest";
import prisma from "../../prisma/context";
import { Express } from "express-serve-static-core";
import { Post } from "@prisma/client";

let app: Express;

beforeAll(async () => {
  app = await createServer();
});

afterAll(async () => {
  // DB 기록 삭제
  const deleteUser = prisma.user.deleteMany();
  const deletePost = prisma.post.deleteMany();
  const deleteComment = prisma.comment.deleteMany();
  await prisma.$transaction([deleteUser, deletePost, deleteComment]);

  // prisma 접속 종료
  await prisma.$disconnect();
});

/**
 * 유저
 */
describe("userResolver", () => {
  // 성공
  it("createUser() 유저를 생성한다.", () => {
    return request(app)
      .post("/graphql")
      .send({
        query: `
        mutation {
          createUser(input:{email:"kisuk623@naver.com",password:"Qqwe12a33!@",name:"기석"}){
            name
            email
          }
        }`,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createUser.email).toBe("kisuk623@naver.com");
        expect(res.body.data.createUser.name).toBe("기석");
      });
  });
});

/**
 * 게시글
j */
describe("postResolver", () => {
  // 성공
  it("createPost() 유저 정보와 생성할 게시글 정보를 받아 게시글을 생성한다.", () => {
    return request(app)
      .post("/graphql")
      .send({
        query: `
        mutation{
          createPost(input:{title:"나의 게시글", content:"내꺼",published:true, email:"kisuk623@bold-9.com", password: "Qweasd221!@"}){
            title
            content
          }
        }
      `,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createPost.title).toBe("나의 게시글");
        expect(res.body.data.createPost.content).toBe("내꺼");
      });
  });
});

/**
 * 댓글
 */
describe("commentResolver", () => {
  // 성공
  it("createComment() 게시글 id와 댓글 정보를 받아 댓글을 생성한다.", async () => {
    const post = await prisma.post.findFirst();
    return request(app)
      .post("/graphql")
      .send({
        query: `
      mutation{
        createComment(input:{content:"첫번째 댓글입니다.", postId:"${post?.id}"}){
          content
          postId,
        }
      }
      `,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createComment.content).toBe("첫번째 댓글입니다.");
      });
  });
});
