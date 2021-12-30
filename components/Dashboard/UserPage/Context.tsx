import React, { useState } from "react";
import fetchToken from "../../../utils/getToken";
import supabase from "../../../utils/supabaseClient";
interface IContextProps {
  responseData: any;
  fetchUserDetails: () => void;
}
export const UserPageContext = React.createContext({} as IContextProps);

function useUserPagesInfo() {
  const [responseData, setResponseData] = useState({
    userDetails: { data: {} },
    statusCode: "",
  });

  async function fetchUserDetails() {
    const res = await getUserDetails();
    let temp = responseData;
    temp.userDetails.data = res;
    setResponseData(() => {
      return { ...temp };
    });
  }

  return {
    responseData,
    fetchUserDetails,
  };
}
export async function getUserDetails() {
  const token = fetchToken();
  const { data, error } = await supabase.auth.api.getUser(token);
  return { data };
}

function UserPageProvider(props: any) {
  const responseData = useUserPagesInfo();
  return (
    <UserPageContext.Provider value={responseData}>
      {props.children}
    </UserPageContext.Provider>
  );
}
UserPageProvider.context = UserPageContext;
export default UserPageProvider;
