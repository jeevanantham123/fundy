import { Auth } from "@supabase/ui";
import { FunctionComponent } from "react";

interface UserPageProps {}

const UserPage: FunctionComponent<UserPageProps> = () => {
  const { user } = Auth.useUser();
  return <h1>Hello User page {user?.email}</h1>;
};

export default UserPage;
