import { useMutation, useQuery } from "@apollo/client";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { GET_GYM_GRADE, GET_POWER_RANK } from "../../graphql/query";
import { CREATE_RECORD } from "../../graphql/mutation";
import DeleteIcon from "@mui/icons-material/Delete";
import { PowerRank, Problem } from "../../types/types";

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 100,
  bgcolor: "background.paper",
  border: "1px solid skyblue",
  boxShadow: 24,
  p: 4,
};

export default function Record(props: any) {
  const { rankRefetch } = props;

  const [name, setName] = useState("");
  const [gymName, setGymName] = useState("");
  const [grade, setGrade] = useState("");
  const [count, setCount] = useState(0);
  const [problems, setProblems] = useState([] as Problem[]);

  const [createRecord, { loading, error }] = useMutation(CREATE_RECORD);

  const userQuery = useQuery(GET_POWER_RANK);
  const { data, refetch } = useQuery(GET_GYM_GRADE, {
    variables: { gymName },
  });
  const userData = userQuery.data;
  const userLoading = userQuery.loading;
  const gymGrade: [string, string][] = [];

  const handleNameChange = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
  };
  const handleGymNameChange = async (event: SelectChangeEvent) => {
    setGymName(event.target.value as string);
    await refetch({ gymName: event.target.value });
  };
  const handleGradeChange = (event: SelectChangeEvent) => {
    setGrade(event.target.value);
  };
  const handleCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(event.target.value));
  };
  const addProblems = () => {
    const problem = { grade, count };
    setProblems([problem, ...problems]);
    setGrade("");
    setCount(0);
  };
  const handleDeleteButton = (event: any) => {
    const idx = event.currentTarget.id;
    const newProblems = [...problems];
    newProblems.splice(idx, 1);
    setProblems([...newProblems]);
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setOpen(!open);
    await createRecord({
      variables: {
        record: {
          name,
          gym: gymName,
          problems,
        },
      },
    });

    await rankRefetch();

    setName("");
    setGymName("");
    setGrade("");
    setCount(0);
    setProblems([]);
  };
  if (userLoading) {
    return <Stack>Loading...</Stack>;
  } else {
    const users = userData.getPowerRank.map((d: PowerRank) => {
      return d.name;
    });

    let colors: { [x: string]: any };
    if (data) {
      for (const gg in data.getGymGrade) {
        if (gg !== "__typename") gymGrade.push([gg, data.getGymGrade[gg]]);
      }
      colors = Object.fromEntries(gymGrade);
    }

    return (
      <Stack alignItems={"center"}>
        <Stack direction={"row"}>
          <FormControl sx={{ width: "150px", margin: "10px" }}>
            <InputLabel id="demo-simple-select-label">이름</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={name}
              label="name"
              onChange={handleNameChange}
            >
              {users.map((user: string, idx: number) => {
                return (
                  <MenuItem value={user} key={idx}>
                    {user}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ width: "150px", margin: "10px" }}>
            <InputLabel id="demo-simple-select-label">암장</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gymName}
              label="gymName"
              onChange={handleGymNameChange}
            >
              <MenuItem value={"theClimb"}>theClimb</MenuItem>
              <MenuItem value={"thePlastic"}>thePlastic</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          padding={"0px 0px 20px 0px"}
        >
          <FormControl sx={{ width: 100 }}>
            <InputLabel id="demo-simple-select-label">난이도</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={grade}
              label="grade"
              onChange={handleGradeChange}
            >
              {data
                ? gymGrade.map((g: [string, string], idx: number) => {
                    return (
                      <MenuItem value={g[0]} key={idx}>
                        {g[1]}
                      </MenuItem>
                    );
                  })
                : ""}
            </Select>
          </FormControl>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={count}
            sx={{ width: 100 }}
            onChange={handleCountChange}
          />
          <Button
            variant="outlined"
            sx={{ margin: "0 0 0 10px" }}
            onClick={addProblems}
          >
            추가
          </Button>
        </Stack>

        {problems.map((problem: Problem, idx: number) => {
          return (
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              border={"solid 0.5px blue"}
              margin={"5px"}
              padding={"5px"}
              width={"200px"}
              key={idx}
            >
              <Stack>{`"${colors[problem.grade]}" ${problem.count}개`}</Stack>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={handleDeleteButton}
                id={idx.toString()}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          );
        })}

        <Button
          variant="contained"
          sx={{ width: 100, margin: "10px" }}
          onClick={handleSubmit}
        >
          등록
        </Button>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  align={"center"}
                >
                  {error ? "중복!" : "성공!"}
                </Typography>
              </Box>
            )}
          </Modal>
          ;
        </Backdrop>
      </Stack>
    );
  }
}
