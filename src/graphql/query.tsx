import { gql } from "@apollo/client";

export const GET_POWER_RANK = gql`
  query {
    getPowerRank {
      name
      power
    }
  }
`;

export const GET_GYM_GRADE = gql`
  query ($gymName: String!) {
    getGymGrade(gymName: $gymName) {
      lv0
      lv1
      lv2
      lv3
      lv4
      lv5
      lv6
      lv7
      lv8
      lv9
      lv10
      lv11
      lv12
      lv13
      lv14
      lv15
    }
  }
`;
