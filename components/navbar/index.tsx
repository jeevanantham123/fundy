import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  useColorModeValue,
  Flex,
  IconButton,
  HStack,
  Button,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import Link from "next/link";

interface NavbarWrapperProps {
  signOut: () => void;
}

const NavbarWrapper: FunctionComponent<NavbarWrapperProps> = (props) => {
  const Links = ["HomePage", "User", "Admin"];
  const hrefs: any = {
    HomePage: "/",
    User: "/Dashboard/User",
    Admin: "/Dashboard/Admin",
  };

  const NavLink = (props: any) => {
    return (
      <Box
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        <Link href={hrefs[props?.link]}>{props?.link}</Link>
      </Box>
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink link={link} key={link} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button onClick={() => props.signOut()}>Sign out</Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink link={link} key={link} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      {props.children}
    </>
  );
};

export default NavbarWrapper;
