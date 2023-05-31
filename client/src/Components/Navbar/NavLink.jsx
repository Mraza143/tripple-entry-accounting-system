import { Link } from "react-router-dom";

const NavLink = ({ data }) => (
  <Link
    px={6}
    py={1}
    fontWeight="bold"
    fontSize="xl"
    rounded={"md"}
    to={data.linkUrl}
    _hover={{ textDecoration: "underline" }}
    _active={{ color: "gray.300" }}
    _focus={{ outline: "none" }}
  >
    {data.linkText}
  </Link>
);

export default NavLink;
