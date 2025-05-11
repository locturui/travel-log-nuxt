import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import { defineStore } from "pinia";

import type { auth } from "~/lib/auth";

const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref <Awaited<ReturnType<typeof authClient.useSession>> | null> (null);
  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }

  const user = computed(() => session.value?.data?.user);

  const loading = computed(() => {
    return session.value?.isPending;
  });

  async function signIn() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      fetchOptions: {
        headers,
      },
    });
  }

  async function signOut() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);

    await authClient.signOut({
      fetchOptions: { headers },
    });

    navigateTo("/");
  }

  return {
    loading,
    signIn,
    signOut,
    user,
    init,
  };
});
