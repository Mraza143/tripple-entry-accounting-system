import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/userSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  role: "user",
  avatar: "",
};

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formValue, setFormValue] = useState(initialState);
  const { /*loading ,*/ error } = useSelector((state) => ({
    ...state.userAuth,
  }));
  const { name, email, password, role, avatar } = formValue;

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (name && email && password && role && avatar) {
      dispatch(register({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFormValue({ ...formValue, [name]: reader.result });
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormValue({ ...formValue, [name]: value });
    }
  };

  return (
    <Flex
      fontFamily="poppins"
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      marginTop={"78px"}
    >
      <Stack spacing={8} mx={"auto"} minW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading
            fontFamily="Lobster Two"
            fontSize={"5xl"}
            textColor="#4c797c"
            textAlign={"center"}
          >
            Create your account
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"sm"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={onInputChange}
              />
            </FormControl>

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
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="file" isRequired>
              <FormLabel>Upload Image</FormLabel>
              <Input
                cursor="pointer"
                type="file"
                name="avatar"
                onChange={onInputChange}
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleSignupSubmit}
                py={6}
                fontFamily="poppins"
                fontSize={"lg"}
                bg="#518d91"
                colorScheme="white"
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to="/login" color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
