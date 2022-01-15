import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Auth } from "@supabase/ui";
import {
  Menu,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Select,
  Center,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  AlertIcon,
  Alert,
  useToast,
} from "@chakra-ui/react";
import { RaisePageContext } from "./Context";
import {
  ArrowForwardIcon,
  CheckCircleIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { useRouter } from "next/router";

interface RaisePageComponentProps {}

const RaisePageComponent: FunctionComponent<RaisePageComponentProps> = () => {
  const { user } = Auth.useUser();
  const toast = useToast();
  const router = useRouter();

  const { responseData, fetchFundType, saveFundDetails } =
    useContext(RaisePageContext);
  const [TabIndex, setTabIndex] = useState(0);
  const [SelectedFundType, setSelectedFundType] = useState({
    type: "Select Your Category",
    id: null,
  });
  const [fundData, setfundData] = useState({
    details: "",
    location: "",
  });
  const FundTypes = responseData?.FundType?.data;

  useEffect(() => {
    fetchFundType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    const reqObj = {
      authId: user?.id,
      details: fundData?.details,
      location: fundData?.location,
      type: SelectedFundType?.id,
    };
    // console.log("REQ", reqObj);
    await saveFundDetails(reqObj);
    if (responseData?.statusCode === "200") {
      toast({
        title: `Added successfully!`,
        status: "success",
        isClosable: true,
        position: "top-right",
      });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  return (
    <Center mt="20px" display="flex" flexDir="column">
      <Text mb="20px" fontSize="22px">
        Complete the Below Steps!
      </Text>
      <Tabs
        variant="enclosed-colored"
        colorScheme="blue"
        align="center"
        w={{ base: "full", md: "500px" }}
        index={TabIndex}
        onChange={(index) => setTabIndex(index)}
      >
        <TabList mb="1em">
          <Tab _selected={{ background: "cyan.300", boxShadow: "none" }}>
            Step 1
          </Tab>
          <Tab _selected={{ background: "blue.300", boxShadow: "none" }}>
            Step 2
          </Tab>
          <Tab _selected={{ background: "teal.300", boxShadow: "none" }}>
            Step 3
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel
            display="flex"
            flexDir="column"
            alignItems="center"
            gap="20px"
          >
            <Text fontSize="18px">
              Please select a category to proceed further!
            </Text>
            <Menu>
              <MenuButton
                px={4}
                py={2}
                w="300px"
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
              >
                {SelectedFundType?.type} <ChevronDownIcon />
              </MenuButton>
              <MenuList w="300px">
                {FundTypes?.map((fundType: any) => {
                  return (
                    <MenuItem
                      key={fundType?.id}
                      onClick={() => setSelectedFundType(fundType)}
                    >
                      {fundType?.type}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              onClick={(e) => {
                e.preventDefault();
                if (TabIndex < 2 && SelectedFundType?.id !== null)
                  setTabIndex(TabIndex + 1);
              }}
            >
              Next
            </Button>
          </TabPanel>
          <TabPanel>
            <FormControl>
              <FormLabel fontSize="18px" htmlFor="country" textAlign="center">
                Explain Your Purpose (or) Idea
              </FormLabel>
              <Textarea
                placeholder="Type here"
                size="md"
                colorScheme="teal"
                value={fundData?.details}
                onChange={(e) =>
                  setfundData({ ...fundData, details: e.target.value })
                }
              />
            </FormControl>
            <Button
              mt="20px"
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              onClick={(e) => {
                e.preventDefault();
                if (TabIndex < 2 && fundData?.details !== "")
                  setTabIndex(TabIndex + 1);
              }}
            >
              Next
            </Button>
          </TabPanel>
          <TabPanel>
            <FormControl>
              <FormLabel htmlFor="country">Country</FormLabel>
              <Select
                id="country"
                placeholder="Select country"
                onChange={(e) =>
                  setfundData({ ...fundData, location: e.target.value })
                }
              >
                <option>India</option>
              </Select>
            </FormControl>
            <Alert status="success" mt="20px">
              <AlertIcon />
              <Center w="full">
                Don&#39;t worry about the typo&#39;s!
                <br /> You can edit it whenever you want.😎
              </Center>
            </Alert>
            <Button
              mt="20px"
              rightIcon={<CheckCircleIcon />}
              colorScheme="teal"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default RaisePageComponent;
