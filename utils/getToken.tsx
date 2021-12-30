export default function fetchToken() {
  const localStorageValue = localStorage.getItem("supabase.auth.token") ?? "";
  const { currentSession } = JSON.parse(localStorageValue);
  return currentSession.access_token;
}
