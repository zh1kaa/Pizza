import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FilterPizzaType {
	filter: string;

	setFilter: (value: string) => void;
}

export const useFilterPizzaStore = create<FilterPizzaType>()(
	persist(
		(set) => ({
			filter: "Show All",

			setFilter: (value) => {
				set({ filter: value });
			},
		}),
		{
			name: "filtered-pizza",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
