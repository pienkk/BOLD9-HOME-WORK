import { createServer } from "../index";
import request from "supertest";
import prisma from "../../prisma/context";
import { Express } from "express-serve-static-core";

let app: Express;

beforeAll(async () => {
  app = await createServer();
});

afterAll(async () => {
  // 유저 기록값 삭제
  const deleteUser = prisma.user.deleteMany();
  await prisma.$transaction([deleteUser]);

  // prisma 접속 종료
  await prisma.$disconnect();
});

describe("userResolver", () => {
  // 성공
  it("createUser() 유저를 생성하고 이름, 이메일을 받는다.", () => {
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
