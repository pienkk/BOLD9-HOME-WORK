import { gql } from "apollo-server-express";

export const commentTypeDefs = gql`
  """
  댓글
  """
  type Comment {
    """
    인덱스
    """
    id: ID!
    """
    컨텐츠
    """
    content: String!
    """
    게시글 id
    """
    postId: ID!
    """
    작성 일자
    """
    createdAt: Date!
  }

  """
  댓글 생성 입력값
  """
  input CommentCreateInput {
    content: String!
    postId: ID!
  }

  type Mutation {
    """
    댓글 생성
    """
    createComment(input: CommentCreateInput!): Comment!
  }
`;
