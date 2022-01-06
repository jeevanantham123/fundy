import { FunctionComponent, useContext, useEffect } from "react";
import { Auth } from "@supabase/ui";
// import { HomePageContext } from "./Context";

interface HomePageComponentProps {}

const HomePageComponent: FunctionComponent<HomePageComponentProps> = () => {
  const { user } = Auth.useUser();
  // const { responseData } = useContext(HomePageContext);
  return <h2>{user?.email}</h2>;
};

export default HomePageComponent;
