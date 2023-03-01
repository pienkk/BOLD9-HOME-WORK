import { gql } from "apollo-server-express";

export const postTypeDefs = gql`
  """
  게시글
  """
  type Post {
    """
    인덱스
    """
    id: ID!
    """
    제목
    """
    title: String!
    """
    내용
    """
    content: String!
    """
    출판 여부
    """
    published: Boolean!
    """
    작성자 id
    """
    authorId: ID!
    """
    작성 일자
    """
    createdAt: Date
  }

  """
  게시글 생성 입력값
  """
  input PostCreateInput {
    title: String!
    content: String!
    published: Boolean!
    email: String!
    password: String!
  }

  type Mutation {
    """
    게시글 생성
    """
    createPost(input: PostCreateInput!): Post!
  }
`;