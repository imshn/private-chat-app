import { useState, useContext, useEffect } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Heading,
  Button,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../service/auth";
import { MdOutlineAccountCircle, MdLockOutline } from "react-icons/md";

import userContext from "../../context/auth/userConext";
import socket from "../../../service/socketjs";
const LoginComponent = () => {
  const { setUser } = useContext(userContext);
  const formBackgroundColor = useColorModeValue("gray.200");
  const borderColor = useColorModeValue("blue.500");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({});

  const signIn = () => {
    login(form).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setUser({
          username: res.data.user.username,
          _id: res.data.user._id,
          isLoggedIn: true,
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        socket.emit("login", res.data.user._id);
        return navigate("/");
      } else {
        setError(res.response.data.message);
      }
    });
  };

  return (
    <Flex height={"100vh"} alignItems="center" justifyContent="center">
      <Flex
        direction={"column"}
        background={formBackgroundColor}
        p={12}
        rounded={6}
        border={"1px"}
        borderColor={borderColor}
      >
        <Heading mb={6}>Log in</Heading>
        <InputGroup>
          <InputLeftElement
            children={<Icon as={MdOutlineAccountCircle} color={"gray.500"} />}
          />
          <Input
            placeholder="username"
            variant={"filled"}
            mb={3}
            onChange={(e) => {
              setForm({ ...form, username: e.target.value });
            }}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            children={<Icon as={MdLockOutline} color={"gray.500"} />}
          />
          <Input
            placeholder="Password"
            variant={"filled"}
            mb={6}
            type="password"
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
        </InputGroup>
        <Button colorScheme={"teal"} mb={6} onClick={signIn}>
          Login
        </Button>
        {error && (
          <Alert status="error" variant="solid">
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Flex>
    </Flex>
  );
};
export default LoginComponent;
