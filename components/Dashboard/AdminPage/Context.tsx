import React, { useState } from "react";
import fetchToken from "../../../utils/getToken";
import supabase from "../../../utils/supabaseClient";
interface IContextProps {
  responseData: any;
  fetchAdminDetails: () => void;
}
export const AdminPageContext = React.createContext({} as IContextProps);

function useAdminPagesInfo() {
  const [responseData, setResponseData] = useState({
    AdminDetails: { data: {}, statusCode: "" },
  });

  async function fetchAdminDetails() {
    const res = await getAdminDetails();
    let temp = responseData;
    temp.AdminDetails.data = res;
    setResponseData(() => {
      return { ...temp };
    });
  }

  return {
    responseData,
    fetchAdminDetails,
  };
}
export async function getAdminDetails() {
  const token = fetchToken();
  const { data, error } = await supabase.auth.api.getUser(token);
  return { data };
}

function AdminPageProvider(props: any) {
  const responseData = useAdminPagesInfo();
  return (
    <AdminPageContext.Provider value={responseData}>
      {props.children}
    </AdminPageContext.Provider>
  );
}
AdminPageProvider.context = AdminPageContext;
export default AdminPageProvider;
