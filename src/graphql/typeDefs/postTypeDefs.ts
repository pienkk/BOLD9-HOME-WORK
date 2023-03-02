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
    createdAt: Date!
    """
    댓글 리스트
    """
    comments: [Comment]!
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

  type Query {
    """
    유저가 생성한 게시글 조회
    """
    getPostsByUser(name: String!): [Post]!
  }

  type Mutation {
    """
    게시글 생성
    """
    createPost(input: PostCreateInput!): Post!
  }
`;
