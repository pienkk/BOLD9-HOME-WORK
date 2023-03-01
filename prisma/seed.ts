import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 *  DB seed 생성
 **/
async function main() {
  const gisuk = await prisma.user.upsert({
    where: { email: "kisuk623@bold-9.com" },
    update: {},
    create: {
      email: "kisuk623@bold-9.com",
      password: "Qweasd221!@",
      name: "gisuk",
      posts: {
        create: {
          title: "graphql과 prisma의 장점",
          content: "graphql은 좋다",
          published: true,
          comments: {
            create: [{ content: "유익한 포스팅이네요" }, { content: "큰 도움이 되었습니다" }],
          },
        },
      },
    },
  });

  const honggildong = await prisma.user.upsert({
    where: { email: "honggildong@bold-9.com" },
    update: {},
    create: {
      email: "honggildong@bold-9.com",
      password: "Qwesasd!221",
      name: "seonghui",
      posts: {
        create: [
          {
            title: "prisma의 좋은점",
            content: "너무 좋다",
            published: true,
            comments: {
              create: [
                { content: "저도 좋은거 같아요" },
                { content: "저도 그렇게 생각합니다" },
                { content: "저두요" },
              ],
            },
          },
          {
            title: "graphql의 문제점",
            content: "graphql은 파일업로드가 불편하다",
            published: false,
            comments: {
              create: [
                { content: "파일업로드는 어떻게 해야하나요?" },
                { content: "저도 같은 생각입니다" },
              ],
            },
          },
        ],
      },
    },
  });

  const sejong = await prisma.user.upsert({
    where: { email: "sejong@bold-9.com" },
    update: {},
    create: {
      email: "sejong@bold-9.com",
      password: "QQASxzxc!2213",
      name: "sejong",
      posts: {
        create: [
          {
            title: "graphql을 쓰면서 느낀점",
            content: "생각보다 어렵네",
            published: false,
          },
          {
            title: "graphql의 schema first",
            content: "schema first와 code first 뭐가 더 좋은가",
            published: true,
            comments: {
              create: [
                { content: "다음편도 출시해주세요" },
                { content: "읽기 좋은 글이었습니다." },
                { content: "흥미롭게 읽었습니다." },
              ],
            },
          },
        ],
      },
    },
  });

  // 생성된 seed 확인
  console.log({ gisuk, honggildong, sejong });
}

// seed 생성후 DB 연결 종료
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
