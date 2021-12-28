import { Auth } from "@supabase/ui";
import { FunctionComponent } from "react";

interface AdminpageProps {}

const Adminpage: FunctionComponent<AdminpageProps> = () => {
  const { user } = Auth.useUser();
  return <h1>Hello Admin page {user?.email}</h1>;
};

export default Adminpage;
