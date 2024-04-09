import { gql } from '@apollo/client';

export const MESSAGE_SUB = gql`
  subscription MessageAdded {
    messageAdded {
      createdAt
      id
      receiverId
      senderId
      text
    }
  }
`;
