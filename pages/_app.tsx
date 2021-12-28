import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, Center, ChakraProvider } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import supabase from "../utils/supabaseClient";
import NavbarWrapper from "../components/navbar";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const AppWrap = () => {
    const { user } = Auth.useUser();
    const [auth, setauth] = useState(true);
    const signOut = () => {
      supabase.auth.signOut();
      setauth(true);
    };
    useEffect(() => {
      console.log(user);
      if (user) {
        setauth(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    return (
      <>
        {!auth && user ? (
          <ChakraProvider>
            <NavbarWrapper signOut={signOut}>
              <Component {...pageProps} />
            </NavbarWrapper>
          </ChakraProvider>
        ) : (
          <>
            {auth && !user ? (
              <Center className="min-h-full">
                <Box>
                  <Auth
                    supabaseClient={supabase}
                    providers={["google"]}
                    socialColors={true}
                  />
                </Box>
              </Center>
            ) : null}
          </>
        )}
      </>
    );
  };
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <AppWrap />
    </Auth.UserContextProvider>
  );
}

export default MyApp;
