import React, { useState } from "react";
import fetchToken from "../../../utils/getToken";
import supabase from "../../../utils/supabaseClient";
interface IContextProps {
  responseData: any;
  fetchDetails: () => void;
}

interface IResponseProps {
  FundsData: any[];
}

export const HomePageContext = React.createContext({} as IContextProps);

function useHomePagesInfo() {
  const [responseData, setResponseData] = useState<IResponseProps>({
    FundsData: [],
  });

  async function fetchDetails() {
    const { data, error } = await supabase
      .from("fundraisers")
      .select(
        "details,id,fundType:fund_type(type),user:profiles(location,email,username,avatar_url)"
      );
    let temp = responseData;
    temp.FundsData = data ?? [];
    if (!error)
      setResponseData(() => {
        return { ...temp };
      });
  }

  return {
    responseData,
    fetchDetails,
  };
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
