import { defu } from "defu";

type MiddlewareOptions =
  | false
  | {
      /**
       * Only apply auth middleware to guest or user
       */
      only?: "guest" | "user";
      /**
       * Redirect authenticated user to this route
       */
      redirectUserTo?: string;
      /**
       * Redirect guest to this route
       */
      redirectGuestTo?: string;
    };

declare module "#app" {
  interface PageMeta {
    auth?: MiddlewareOptions;
  }
}

declare module "vue-router" {
  interface RouteMeta {
    auth?: MiddlewareOptions;
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  // If auth is disabled, skip middleware
  if (to.meta?.auth === false) {
    return;
  }
  const { loggedIn, user, fetchSession } = useAuth();
  const redirectOptions = useRuntimeConfig().public.auth as MiddlewareOptions;

  const { only, redirectUserTo, redirectGuestTo } = defu(
    to.meta?.auth,
    redirectOptions
  );

  await fetchSession();

  // If guest mode, redirect if authenticated
  if (only === "guest" && loggedIn.value) {
    // Avoid infinite redirect
    if (to.path === redirectUserTo) {
      return;
    }
    return navigateTo(redirectUserTo);
  }

  if (only === "guest") {
    if (loggedIn.value) {
      // Guest-only routes: redirect authenticated users to specified path
      // Avoid infinite redirect
      if (to.path === redirectUserTo) {
        return;
      }
      return navigateTo(redirectUserTo);
    } else {
      // Allow guest access to this route
      return;
    }
  }
  // If not authenticated, redirect to home
  if (!loggedIn.value) {
    // Avoid infinite redirect
    if (to.path === redirectGuestTo) {
      return;
    }
    return navigateTo(`${redirectGuestTo}?redirect=${to.fullPath}`);
  }
});
