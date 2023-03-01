import { createServer } from "../index";
import request from "supertest";
import prisma from "../../prisma/context";
import { Express } from "express-serve-static-core";

let app: Express;

beforeAll(async () => {
  app = await createServer();
  await prisma.user.createMany({
    data: [
      { email: "kisuk623@gmail.com", password: "qwerQWER12!", name: "기석" },
      { email: "honggildong@gmail.com", password: "Qweasd!2a", name: "길동" },
      { email: "sejong@gmail.com", password: "sejongKingWang!a", name: "세종" },
    ],
  });
});

afterAll(async () => {
  // DB 기록 삭제
  const deleteUser = prisma.user.deleteMany();
  const deletePost = prisma.post.deleteMany();
  await prisma.$transaction([deleteUser, deletePost]);

  // prisma 접속 종료
  await prisma.$disconnect();
});

//
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

describe("postResolver", () => {
  //성공
  it("createPost() 유저 정보와 생성할 게시글 정보를 받아 게시글을 생성한다.", () => {
    return request(app)
      .post("/graphql")
      .send({
        query: `
        mutation{
          createPost(input:{title:"나의 게시글", content:"내꺼",published:true, email:"kisuk623@gmail.com", password: "qwerQWER12!"}){
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
