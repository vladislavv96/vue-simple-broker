import Vue from "vue";

const state = new Vue({
  data: {
    isAuthenticated: !!localStorage.getItem("accessToken"),
  },
});

export function login({ accessToken }) {
  localStorage.setItem("accessToken", accessToken);
  state.isAuthenticated = true;
}

export function isAuthenticated() {
  return state.isAuthenticated;
}

export function logOut(refresh = true) {
  if (refresh) window.location.reload(false);
  localStorage.removeItem("accessToken");
  state.isAuthenticated = false;
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}
