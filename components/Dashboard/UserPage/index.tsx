import { FunctionComponent, useContext, useEffect } from "react";
import { Auth } from "@supabase/ui";
import { UserPageContext } from "./Context";

interface UserPageComponentProps {}

const UserPageComponent: FunctionComponent<UserPageComponentProps> = () => {
  const { user } = Auth.useUser();
  const { responseData, fetchUserDetails } = useContext(UserPageContext);
  const { userDetails } = responseData;
  useEffect(() => {
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("@@@", userDetails?.data);
  return <h2>{user?.email}</h2>;
};

export default UserPageComponent;
