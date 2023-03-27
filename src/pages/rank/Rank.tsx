import { Stack } from "@mui/material";
import { PowerRank } from "../../types/types";

export default function Rank(props: any) {
  const { users } = props;

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
      {users.map((user: PowerRank, idx: number) => {
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
