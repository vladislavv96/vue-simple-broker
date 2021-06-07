import Vue from "vue";

const state = new Vue({
  data: {
    isAuthenticated: !!localStorage.getItem("accessToken"),
  },
});

export function login({ accessToken, refreshToken }) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  state.isAuthenticated = true;
}

export function isAuthenticated() {
  return state.isAuthenticated;
}

export function logOut(refresh = true) {
  if (refresh) window.location.reload(false);
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  state.isAuthenticated = false;
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}
export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}
