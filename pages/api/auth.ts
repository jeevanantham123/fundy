import supabaseClient from "../../utils/supabaseClient";

export default function handler(req: any, res: any) {
  supabaseClient.auth.api.setAuthCookie(req, res);
}
