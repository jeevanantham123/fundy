import { FunctionComponent } from "react";
import UserPageComponent from "../../../components/Dashboard/UserPage";
import UserPageProvider from "../../../components/Dashboard/UserPage/Context";

interface UserPageProps {}

const UserPage: FunctionComponent<UserPageProps> = () => {
  return (
    <UserPageProvider>
      <UserPageComponent />
    </UserPageProvider>
  );
};

export default UserPage;
