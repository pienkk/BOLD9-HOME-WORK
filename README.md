## BOLD9 Homework Test

### 사용기술

- typescript
- prisma
- graphql

### 작업 내용

- User, Post, Comment 3개의 관계 테이블 생성
- schema first 방법으로 graphql 작성
- graphql playground 테스트 환경 생성

### API

- 유저 생성
- 게시글 생성
- 댓글 생성
- 유저가 작성한 게시글과 해당 게시글의 댓글 조회

### 실행 방법

#### pm2 실행

1. 저장소를 클론 받고 .env.sample 파일을 참조하여 .env 파일작성

```bash
$git clone https://github.com/pienkk/BOLD9-HOME-WORK
```

2. 패키지 설치

```bash
$npm install
```

3. 프리즈마 DB migrate, Seed up

```bash
$prisma migrate dev
```

```bash
$prisma seed up
```

4. 서버 실행 pm2가 없을 경우 pm2 추가 설치

```bash
$npm run start
```

```bash
$npm install -g pm2
```

#### docker 실행

1. Docker 빌드

```bash
$ docker build -t <your-name>/bold9 .
```

2. Docker 실행

```bash
$ docker run -p 3000:3000 -d <your-name>/bold9
```

### 테스트

유닛테스트, E2E 테스트 완료

<img width="839" alt="image" src="https://user-images.githubusercontent.com/104005339/222422533-7e7622f2-5ed1-4023-932a-282b83a5412b.png">
