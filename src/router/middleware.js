import { isAuthenticated } from "@/services/auth";

const defaultAuthRedirect = { name: "login" };

export const beforeEach = (to, from, next) => {
  const auth = to.meta.auth;
  if (!auth) return next();
  const authRequired = auth === true || auth.required === true || false;
  if (!authRequired) return next();

  const redirect = () => {
    if (typeof auth.redirect === "function") return auth.redirect({ from, to });
    const fromRoute = from.name ? from : null;
    return auth.redirect || fromRoute || defaultAuthRedirect;
  };

  if (!isAuthenticated()) {
    const route = redirect();
    // add a hint where to redirect after login (a query param)
    const redirectAfterLoginTo = to && to.fullPath;
    console.log(redirectAfterLoginTo);
    if (redirectAfterLoginTo) {
      console.log(route);
      route.query.redirect = redirectAfterLoginTo;
    }
    return next(route);
  }
  // otherwise move forward
  next();
};

export const redirectIfAuthenticated = (redirect = "/") => (to, from, next) => {
  if (isAuthenticated()) return next(redirect);
  next();
};
