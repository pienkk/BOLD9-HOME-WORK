import { createServer } from "../index";
import request from "supertest";
import prisma from "../../prisma/context";
import { Express } from "express-serve-static-core";

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

  // 성공
  it("getPostsByUser() 유저 이름을 받아 해당 유저가 작성한 게시글리스트와 게시글에 해당하는 댓글 리스트를 반환한다.", () => {
    return request(app)
      .post("/graphql")
      .send({
        query: `query{
        getPostsByUser(name:"gisuk"){
          title
          content
          comments{
            content
          }
        }
      }`,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getPostsByUser).toEqual([
          {
            content: "graphql은 좋다",
            title: "graphql과 prisma의 장점",
            comments: [
              { content: "유익한 포스팅이네요" },
              { content: "큰 도움이 되었습니다" },
            ],
          },
        ]);
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
