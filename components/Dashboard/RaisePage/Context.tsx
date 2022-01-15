import React, { useState } from "react";
// import fetchToken from "../../../utils/getToken";
import supabase from "../../../utils/supabaseClient";
interface IContextProps {
  responseData: any;
  fetchDetails: () => void;
  fetchFundType: () => void;
  saveFundDetails: (data: any) => void;
}

interface responseObj {
  data: any;
  statusCode: any;
}
interface responseArray {
  data: any[];
  statusCode: any;
}
interface response {
  Details: responseObj;
  FundType: responseArray;
  statusCode: any;
}

export const RaisePageContext = React.createContext({} as IContextProps);

function useRaisePageInfo() {
  const [responseData, setResponseData] = useState<response>({
    Details: { data: {}, statusCode: "" },
    FundType: { data: [], statusCode: "" },
    statusCode: "",
  });

  async function fetchDetails() {
    const res = {};
    let temp = responseData;
    temp.Details.data = res;
    setResponseData(() => {
      return { ...temp };
    });
  }

  async function fetchFundType() {
    const { data, error } = await supabase.from("fund_type").select("type,id");
    let temp = responseData;
    temp.FundType.data = data ?? [];
    if (!error)
      setResponseData(() => {
        return { ...temp };
      });
  }
  async function saveFundDetails(reqData: any) {
    const { authId, details, location, type } = reqData;
    let errorRes = null;
    let temp = responseData;
    if (authId !== null) {
      const { data, error } = await supabase.from("fundraisers").insert({
        type: type,
        details: details,
        profile_id: authId,
      });
      if (error) errorRes = error;
      // console.log(data, error, "if1");
    }

    if (authId !== null) {
      const { data, error } = await supabase.from("profiles").upsert({
        id: authId,
        location: location,
      });
      if (error) errorRes = error;
      console.log(data, error, "if2");
    }

    if (!errorRes) {
      temp.statusCode = "200";
      setResponseData(() => {
        return { ...temp };
      });
    }
  }

  return {
    responseData,
    fetchDetails,
    saveFundDetails,
    fetchFundType,
  };
}

function RaisePageProvider(props: any) {
  const responseData = useRaisePageInfo();
  return (
    <RaisePageContext.Provider value={responseData}>
      {props.children}
    </RaisePageContext.Provider>
  );
}
RaisePageProvider.context = RaisePageContext;
export default RaisePageProvider;
