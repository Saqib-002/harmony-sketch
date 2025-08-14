import { create } from "zustand";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import type { AuthState } from "../types";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  signup: async (email: string, password: string) => {
    try {
      setPersistence(auth, browserLocalPersistence)
        .then(async () => {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          set({ user: userCredential.user, error: null });
        })
        .catch((error) => {
          set({ error: error.message });
        });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message });
      }
    }
  },
  login: async (email: string, password: string) => {
    try {
      setPersistence(auth, browserLocalPersistence)
        .then(async () => {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          set({ user: userCredential.user, error: null });
        })
        .catch((error) => {
          set({ error: error.message });
        });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message });
      }
    }
  },
  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },
  initAuth: () => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      onAuthStateChanged(auth, (user) => {
        set({ user, loading: false });
      });
    });
  },
}));
