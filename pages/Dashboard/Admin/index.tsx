import { FunctionComponent } from "react";
import AdminPageComponent from "../../../components/Dashboard/AdminPage";
import AdminPageProvider from "../../../components/Dashboard/AdminPage/Context";

interface AdminPageProps {}

const AdminPage: FunctionComponent<AdminPageProps> = () => {
  return (
    <AdminPageProvider>
      <AdminPageComponent />
    </AdminPageProvider>
  );
};

export default AdminPage;
