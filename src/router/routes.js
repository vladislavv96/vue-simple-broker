const meta = {
  login: {
    section: "login",
    layout: "LoginLayout",
    layoutClasses: ["login-layout"],
  },
  account: {
    section: "account",
    layout: "AccountLayout",
    layoutClasses: ["account-layout"],
  },
};

const routes = [
  {
    name: "Login",
    path: "/",
    component: () => import("@/pages/LoginPage"),
    meta: {
      ...meta.login,
    },
  },
  {
    name: "Account",
    path: "/account",
    component: () => import("@/pages/AccountPage"),
    meta: {
      ...meta.account,
    },
  },
];

export default routes;
