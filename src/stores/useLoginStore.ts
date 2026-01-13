import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LoginStore {
	name: string;
	email: string;
	password: string;
	isLoggedIn: boolean;
	clean: () => void;
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
			clean: () =>
				set({ name: "", email: "", password: "", isLoggedIn: false }),
			setName: (name: string) => set({ name }),
			setEmail: (email: string) => set({ email }),
			setPassword: (password: string) => set({ password }),
			login: () => set({ isLoggedIn: true }),
		}),
		{
			name: "login-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
