import {
  Button,
  Stack,
  Box,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../redux/features/userSlice";
import { ConnectWallet } from "@thirdweb-dev/react";
import jwt from 'jsonwebtoken';




const NavButtons = ({ isLoggedIn, isMobileScreen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("");
  
  useEffect(() => {
    const token = Cookies.get("token");
    const decodedToken = jwt.decode(token);
//const userId = decodedToken.userId;
const avartar = decodedToken?.avatar;
setAvatar(avartar)
setRole(decodedToken?.role)
console.log(token)
console.log(decodedToken)

  }, [isLoggedIn]);

  // const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  const { user } = useSelector((state) => ({
    ...state.userAuth,
  }));

  const handleLogoutSubmit = () => {
    navigate("/");
    dispatch(setLogout());
  };

  return (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify={isMobileScreen ? "flex-start" : "flex-end"}
      direction={"row"}
      spacing={6}
      display={
        isMobileScreen
          ? { base: "flex", md: "none" }
          : { base: "none", md: "flex" }
      }
    >
      {isLoggedIn ? (
        <Box display="flex" alignItems="center" gap={10}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
              marginLeft={{ base: "0em", md: "0.5em" }}
            >
              <Avatar
                size={"md"}
                src={user ? avatar : "/profile.png"}
              />
            </MenuButton>
            <MenuList>
              {role === "admin" && (
                <>
                  <MenuItem
                    textColor="black"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuDivider />
                </>
              )}

              <MenuItem textColor="black" onClick={handleLogoutSubmit}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>

          <ConnectWallet
            marginRight={"25px"}
            accentColor="#00c2cf"
            colorMode="dark"
            // width={{ base: "280px", md: "unset" }}
            style={{
              background: "#00c2cf",
              color: "white",
            }}
          />
        </Box>
      ) : (
        <>
          <Button
            onClick={() => navigate("/login")}
            fontSize={isMobileScreen ? "sm" : "lg"}
            fontWeight={400}
            variant={"link"}
            to={"/login"}
            textColor="white"
          >
            Log In
          </Button>

          <Button
            onClick={() => navigate("/signup")}
            display={
              isMobileScreen
                ? { base: "inline-flex", md: "none" }
                : { base: "none", md: "inline-flex" }
            }
            fontSize={isMobileScreen ? "sm" : "lg"}
            fontWeight={600}
            color={"#4c797c"}
            backgroundColor="white"
            to={"/signup"}
            _hover={{
              bg: "white.300",
            }}
          >
            Sign Up
          </Button>
        </>
      )}
    </Stack>
  );
};

export default NavButtons;
