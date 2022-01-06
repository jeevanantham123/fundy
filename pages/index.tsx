import { FunctionComponent } from "react";
import HomePageComponent from "../components/Dashboard/HomePage";
import HomePageProvider from "../components/Dashboard/HomePage/Context";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <HomePageProvider>
      <HomePageComponent />
    </HomePageProvider>
  );
};

export default HomePage;
