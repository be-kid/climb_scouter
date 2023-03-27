import { BottomNavigation, BottomNavigationAction, Stack } from "@mui/material";

import Rank from "../pages/rank/Rank";
import Record from "../pages/record/Record";
import Register from "../pages/register/Register";

import { useQuery } from "@apollo/client";
import { GET_POWER_RANK } from "../graphql/query";
import { PowerRank } from "../types/types";
import { useState } from "react";

export default function Navigation() {
  const [value, setValue] = useState(0);
  const { data, loading, refetch } = useQuery(GET_POWER_RANK);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    const users = data.getPowerRank.map((d: PowerRank) => {
      return { name: d.name, power: d.power };
    });

    return (
      <Stack width={"80%"}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="전투력" />

          <BottomNavigationAction label="기록입력" />

          <BottomNavigationAction label="이름등록" />
        </BottomNavigation>
        {value === 0 ? (
          <Rank users={users} />
        ) : value === 1 ? (
          <Record rankRefetch={refetch} />
        ) : (
          <Register refetch={refetch} />
        )}
      </Stack>
    );
  }
}
