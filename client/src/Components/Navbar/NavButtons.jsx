import { Button, Stack } from "@chakra-ui/react";
import { useDispatch /*, useSelector*/ } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../redux/features/userSlice";
import { ConnectWallet } from "@thirdweb-dev/react";

const NavButtons = ({ isLoggedIn, isMobileScreen }) => {
  const navigate = useNavigate();

  // const { result } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();

  const handleLogoutSubmit = () => {
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
        <>
          <Button
            onClick={handleLogoutSubmit}
            fontSize={isMobileScreen ? "sm" : "lg"}
            fontWeight={400}
            variant={"link"}
            to={"/"}
            padding={"7px"}
            colorScheme="white"
            textDecoration={"none"}
          >
            Log out
          </Button>

          <ConnectWallet
            accentColor="#00c2cf"
            colorMode="dark"
            width={{ base: "150px", md: "unset" }}
            style={{
              background: "#00c2cf",
              color: "white",
            }}
          />
        </>
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
