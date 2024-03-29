import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  """
  Date 타입 추가
  """
  scalar Date

  """
  유저
  """
  type User {
    """
    인덱스
    """
    id: ID!
    """
    이메일
    """
    email: String!
    """
    비밀번호
    """
    password: String!
    """
    이름
    """
    name: String!
    """
    가입 일자
    """
    createdAt: Date!
    """
    작성한 게시글 리스트
    """
    posts: [Post]
  }

  """
  유저 생성 입력값
  """
  input UserCreateInput {
    email: String!
    password: String!
    name: String!
  }

  type Mutation {
    """
    유저 생성
    """
    createUser(input: UserCreateInput!): User!
  }
`;
