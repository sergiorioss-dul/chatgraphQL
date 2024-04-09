import { gql } from '@apollo/client';

export const GETALL_USERS = gql`
  query getAllUsers {
    users {
      email
      firstName
      id
      lastName
    }
  }
`;

export const GET_MESSAGES = gql`
  query MessagesByUser($receiverId: Int!) {
    messageByUser(receiverId: $receiverId) {
      createdAt
      receiverId
      senderId
      text
    }
  }
`;
