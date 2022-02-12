import React from "react";
import { Link, Box, Text, Button, Stack } from "@chakra-ui/react";
import { MenuToggle} from './MenuToggle'
import { userIsAuthenticated } from '../helper/auth'
import { useNavigate } from "react-router-dom"
import NavBarContainer from "./NavBarContainer"


import Logo from "./Logo";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        w="100px"
        color={["black", "black", "primary.500", "primary.500"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {

  const navigate = useNavigate()
  // const location = useLocation()
  // console.log(location)

  const handleLogout = () => {
    // Remove token
    window.localStorage.removeItem('tinyhabits-token')
    // Redirect to the home page
    navigate('/')
  }

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
      <MenuItem to="/login">Events </MenuItem>
      { userIsAuthenticated() ?
        <>
        <MenuItem to="/user/profile">Profile </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </>
        :
        <>
        <MenuItem to="/login">Login </MenuItem>
        <MenuItem to="/register" isLast>
          <Button
            size="sm"
            rounded="md"
            color={["primary.500", "primary.500", "white", "white"]}
            bg={["black", "black", "primary.500", "primary.500"]}
            _hover={{
              bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
            }}
          >
            Register
          </Button>
        </MenuItem>
        </>
        }
      </Stack>
    </Box>
  )
}


export default NavBar;