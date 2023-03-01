import { createServer } from "./index";

const serverStart = async () => {
  const app = await createServer();

  const options = {
    port: Number(process.env.PORT) || 3000,
  };
  // 서버 시작
  app.listen(options.port, () => {
    console.log(`Server on! Port : ${options.port}`);
  });
};

serverStart();
