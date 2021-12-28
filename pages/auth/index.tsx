import { Box, Center } from "@chakra-ui/react";
import { Auth, Typography, Button } from "@supabase/ui";
import supabase from "../../utils/supabaseClient";

const Container = (props: any) => {
  const { user } = Auth.useUser();
  if (user)
    return (
      <>
        <Typography.Text>Signed in: {user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    );
  return props.children;
};

export default function AuthBasic() {
  return (
    <Center className="min-h-full">
      <Box>
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Container supabaseClient={supabase}>
            <Auth
              supabaseClient={supabase}
              providers={["google"]}
              socialColors={true}
              view="sign_in"
            />
          </Container>
        </Auth.UserContextProvider>
      </Box>
    </Center>
  );
}
