import Cookies from "js-cookie";

export function handleLogout() {
  Cookies.remove("loggedIn");
  localStorage.clear();
  window.location.href = "/";
}

export const session_Time_Logout = 1000 * 60 * 25;
