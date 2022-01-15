import { FunctionComponent, useContext, useEffect } from "react";
import { Auth } from "@supabase/ui";
// import { AdminPageContext } from "./Context";

interface AdminPageComponentProps {}

const AdminPageComponent: FunctionComponent<AdminPageComponentProps> = () => {
  const { user } = Auth.useUser();
  // const { responseData } = useContext(AdminPageContext);

  return <h2>{"404 not found"}</h2>;
};

export default AdminPageComponent;
