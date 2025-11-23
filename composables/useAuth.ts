import { useState, useNuxtApp } from "#app";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";

export const useAuth = () => {
  const { $auth } = useNuxtApp();

  const user = useState<User | null>("user", () => null);

  if (process.client) {
    onAuthStateChanged($auth, (u) => {
      user.value = u;
    });
  }

  const logout = async () => {
    await signOut($auth);
  };

  return { user, logout };
};
