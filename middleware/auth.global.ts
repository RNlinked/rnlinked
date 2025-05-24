// import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("auth.global.ts middleware", to, from);
  //   const { data: session } = await authClient.useSession(useFetch);
  //   if (!session.value) {
  //     if (to.path !== "/signin") {
  //       return navigateTo("/signin");
  //     }
  //   }
});
