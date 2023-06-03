import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Image,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/features/userSlice";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [formValue, setFormValue] = useState(initialState);
  const { /*loading,*/ error } = useSelector((state) => ({
    ...state.userAuth,
  }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <Stack
      minH={"88vh"}
      direction={{ base: "column", md: "row" }}
      marginTop={"78px"}
    >
      <Stack flex={1} align={"center"} justify={"center"} p={8}>
        <Stack align={"center"}>
          <Heading fontFamily="poppins" fontSize={"4xl"} textColor="#518d91">
            Sign in to your account
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"sm"}
          px={8}
          py={10}
          width={"85%"}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                onClick={handleLoginSubmit}
                py={6}
                fontFamily="poppins"
                fontSize={"lg"}
                bg="#518d91"
                colorScheme="white"
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={"/login.png"} />
      </Flex>
    </Stack>
  );
}
