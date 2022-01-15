import { FunctionComponent, useContext, useEffect } from "react";
import { Auth } from "@supabase/ui";
import { HomePageContext } from "./Context";
import FundCard from "./FundCard";
import { Center, SimpleGrid } from "@chakra-ui/react";

interface HomePageComponentProps {}

const HomePageComponent: FunctionComponent<HomePageComponentProps> = () => {
  const { responseData, fetchDetails } = useContext(HomePageContext);
  const { FundsData } = responseData;
  useEffect(() => {
    fetchDetails();
  }, []);
  // console.log("RES", FundsData);
  const { user } = Auth.useUser();
  return (
    <Center
      display="flex"
      flexDir="row"
      justifyContent="space-around"
      flexWrap="wrap"
      gap="20px"
      my="50px"
      px={{ base: "10px", md: "50px" }}
    >
      {FundsData?.map((fundData: any) => {
        return <FundCard key={fundData?.id} fundData={fundData} />;
      })}
    </Center>
  );
};

export default HomePageComponent;
