import { Avatar, Box, Center, Image, Text } from "@chakra-ui/react";
import { Divider } from "@supabase/ui";
import { FunctionComponent } from "react";

interface FundCardProps {
  fundData: any;
}

const FundCard: FunctionComponent<FundCardProps> = ({ fundData }) => {
  const { details, user, fundType, cover_image } = fundData;
  const colorSchemes: any = {
    "Software/Application/Project": "blue.300",
    "Medical/Health": "red.300",
    "Photography/Video": "purple.300",
    "Travel/Blog": "cyan.300",
  };
  return (
    <Center
      border={"1px solid"}
      shadow="md"
      w="500px"
      display="flex"
      flexDir="column"
      borderRadius="md"
    >
      {cover_image && (
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${cover_image}`}
          alt="cover"
          className="object-contain h-[150px]"
        />
      )}
      <Box
        bg={colorSchemes[fundType?.type]}
        w="full"
        p="10px"
        className={cover_image ? "" : "rounded-t-md"}
      >
        {details}
      </Box>
      <Divider />
      <Box w="full" display="flex" alignItems="center" p="10px">
        <Avatar src={user?.avatar_url} name={user?.username} />
        <div className="font-semibold text-md ml-2">{user?.username}</div>
      </Box>
    </Center>
  );
};

export default FundCard;
