import { useQuery } from "@apollo/client";
import { GET_POWER_RANK } from "../../graphql/query";
import { Stack } from "@mui/material";
import { Key } from "react";

export default function Rank() {
  const { data, loading, error } = useQuery(GET_POWER_RANK);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    const users = data.getPowerRank.map(
      (d: { name: string; power: number }) => {
        return { name: d.name, power: d.power };
      }
    );
    return (
      <Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          padding={"0px 50px 0px 50px"}
          margin={"5px"}
        >
          <Stack>이름</Stack>
          <Stack>전투력</Stack>
        </Stack>
        {users.map((user: { name: string; power: number }, idx: number) => {
          return (
            <Stack
              direction={"row"}
              border={"solid blue 0.5px"}
              justifyContent={"space-between"}
              padding={"10px 50px 10px 50px"}
              margin={"5px"}
              key={idx}
            >
              <Stack alignItems={"center"}>{user.name}</Stack>
              <Stack alignItems={"center"}>{user.power}</Stack>
            </Stack>
          );
        })}
      </Stack>
    );
  }
}
