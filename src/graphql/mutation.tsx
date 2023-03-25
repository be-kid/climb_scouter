import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($name: String!, $password: String!) {
    createUser(name: $name, password: $password) {
      name
    }
  }
`;

export const CREATE_RECORD = gql`
  mutation createRecord($record: CreateRecordInput!) {
    createRecord(record: $record) {
      name
      records {
        date
        gym
        total
        problems {
          grade
          count
        }
      }
    }
  }
`;
