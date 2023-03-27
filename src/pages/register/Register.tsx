import { useMutation } from "@apollo/client";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CREATE_USER } from "../../graphql/mutation";
import { ChangeEvent, useState } from "react";

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

export default function Register(props: any) {
  const { refetch } = props;

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async () => {
    setOpen(!open);
    await createUser({
      variables: {
        name: name,
        password: password,
      },
    });
    setName("");
    setPassword("");
    await refetch();
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack alignItems={"center"} justifyContent={"space-around"}>
      <Stack padding={"20px"} />
      <TextField
        id="outlined-basic"
        label="이름"
        variant="outlined"
        value={name}
        onChange={handleNameChange}
      />
      <Stack padding={"20px"} />
      <TextField
        id="outlined-basic"
        label="비밀번호"
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
      />
      <Stack padding={"20px"} />
      <Button variant="contained" onClick={handleSubmit}>
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
              <Typography id="modal-modal-title" variant="h6" align={"center"}>
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
