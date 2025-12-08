import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LoginStore {
	name: string;
	email: string;
	password: string;
	isLoggedIn: boolean;
	login: () => void;
	setName: (name: string) => void;
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
}

export const useLoginStore = create<LoginStore>()(
	persist(
		(set) => ({
			name: "",
			email: "",
			password: "",
			isLoggedIn: false,
			login: () => set({ isLoggedIn: true }),
			setName: (name: string) => set({ name }),
			setEmail: (email: string) => set({ email }),
			setPassword: (password: string) => set({ password }),
		}),
		{
			name: "login-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
