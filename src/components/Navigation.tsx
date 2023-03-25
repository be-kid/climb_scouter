import { BottomNavigation, BottomNavigationAction, Stack } from "@mui/material";

import * as React from "react";
import Rank from "../pages/rank/Rank";
import Record from "../pages/record/Record";
import Register from "../pages/register/Register";

export default function Navigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Stack width={"50%"}>
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
      {value === 0 ? <Rank /> : value === 1 ? <Record /> : <Register />}
    </Stack>
  );
}
