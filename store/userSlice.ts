import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, deleteCookie } from "../lib/cookies";
import { isTokenExpired } from "../lib/jwt";

export interface User {
  id?: string;
  _id?: string; // Both formats used by register and login backend payload
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  role: string;
  scope: string;
}

export interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hydrated: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
  hydrated: false,
};

// --- LocalStorage Zustand-Compatible Helper Methods ---
function saveToZustandStorage(state: UserState) {
  if (typeof window === 'undefined') return;
  try {
    const payload = {
      state: {
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        hydrated: state.hydrated,
      },
      version: 0
    };
    localStorage.setItem("user-storage", JSON.stringify(payload));
  } catch (e) {
    console.error("Failed to sync localStorage authentication state:", e);
  }
}

export function loadFromZustandStorage(): Partial<UserState> {
  if (typeof window === 'undefined') return {};
  try {
    const dataStr = localStorage.getItem("user-storage");
    if (dataStr) {
      const parsed = JSON.parse(dataStr);
      if (parsed && parsed.state) {
        const token = parsed.state.token;
        // Verify token validity on load
        if (token && isTokenExpired(token)) {
          // If expired, clear storage and cookies
          localStorage.removeItem("user-storage");
          deleteCookie("auth-token");
          return {
            user: null,
            token: null,
            isAuthenticated: false,
            hydrated: true,
          };
        }
        return {
          user: parsed.state.user,
          token: parsed.state.token,
          isAuthenticated: parsed.state.isAuthenticated ?? !!parsed.state.user,
          hydrated: true,
        };
      }
    }
  } catch (e) {
    console.error("Failed to read user-storage during store load:", e);
  }
  return { hydrated: true };
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; user: User }>) => {
      const { token, user } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.hydrated = true;

      // Sync to cookie with 15 days expiry (aligns with backend accessToken expiration)
      setCookie("auth-token", token, 15);
      
      // Sync to localStorage
      saveToZustandStorage(state);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.hydrated = true;

      // Clean cookie and localStorage
      deleteCookie("auth-token");
      if (typeof window !== 'undefined') {
        localStorage.removeItem("user-storage");
      }
    },
    hydrateAuth: (state) => {
      const loaded = loadFromZustandStorage();
      state.user = loaded.user ?? null;
      state.token = loaded.token ?? null;
      state.isAuthenticated = loaded.isAuthenticated ?? false;
      state.hydrated = true;
    }
  },
});

export const { setAuth, logout, hydrateAuth } = userSlice.actions;
export default userSlice.reducer;
