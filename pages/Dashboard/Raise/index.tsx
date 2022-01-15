import { FunctionComponent } from "react";
import RaisePageComponent from "../../../components/Dashboard/RaisePage";
import RaisePageProvider from "../../../components/Dashboard/RaisePage/Context";

interface RaisePageProps {}

const RaisePage: FunctionComponent<RaisePageProps> = () => {
  return (
    <RaisePageProvider>
      <RaisePageComponent />
    </RaisePageProvider>
  );
};

export default RaisePage;
