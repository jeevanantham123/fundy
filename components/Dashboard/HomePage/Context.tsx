import React, { useState } from "react";
import fetchToken from "../../../utils/getToken";
import supabase from "../../../utils/supabaseClient";
interface IContextProps {
  responseData: any;
  fetchDetails: () => void;
}
export const HomePageContext = React.createContext({} as IContextProps);

function useHomePagesInfo() {
  const [responseData, setResponseData] = useState({
    Details: { data: {}, statusCode: "" },
  });

  async function fetchDetails() {
    const res = await getDetails();
    let temp = responseData;
    temp.Details.data = res;
    setResponseData(() => {
      return { ...temp };
    });
  }

  return {
    responseData,
    fetchDetails,
  };
}
export async function getDetails() {
  const token = fetchToken();
  const { data, error } = await supabase.auth.api.getUser(token);
  return { data };
}

function HomePageProvider(props: any) {
  const responseData = useHomePagesInfo();
  return (
    <HomePageContext.Provider value={responseData}>
      {props.children}
    </HomePageContext.Provider>
  );
}
HomePageProvider.context = HomePageContext;
export default HomePageProvider;
