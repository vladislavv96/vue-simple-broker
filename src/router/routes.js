const meta = {
  login: {
    section: "login",
    layout: "LoginLayout",
  },
  account: {
    section: "account",
    layout: "AccountLayout",
    auth: true,
  },
};

const routes = [
  {
    name: "login",
    path: "/",
    component: () => import("@/pages/LoginPage"),
    meta: {
      ...meta.login,
    },
  },
  {
    name: "account",
    path: "/account",
    component: () => import("@/pages/AccountPage"),
    meta: {
      ...meta.account,
    },
  },
];

export default routes;
