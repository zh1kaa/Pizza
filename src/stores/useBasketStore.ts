import { create } from "zustand";

interface BasketItem {
	id: number;
	name: string;
	description: string;
	price: number;
	currency: string;
	sizes: number;
	quantity: number;
	image: string;
	category: Array<string>;
}
interface BasketStore {
	data: BasketItem[];
	addItem: (item: BasketItem) => void;
}
export const useBasketStore = create<BasketStore>((set) => ({
	data: [],
	addItem: (
		item: BasketItem // <-- указываем тип BasketItem
	) =>
		set((state) => {
			const existingIndex = state.data.findIndex(
				(i) => i.id === item.id && i.sizes === item.sizes
			);
			if (existingIndex !== -1) {
				const newData = [...state.data];
				newData[existingIndex].quantity += item.quantity;
				return { data: newData };
			}
			return { data: [...state.data, item] };
		}),
}));
//

// interface BasketItem {
// 	id: number;
// 	name: string;
// 	description: string;
// 	price: number;
// 	currency: string;
// 	size: number;
// 	quantity: number;
// 	image: string;
// }

// interface BasketItem {
// 	id: number;
// 	name: string;
// 	description: string;
// 	price: number;
// 	currency: string;
// 	sizes: Array<number>;
// 	defaultSize: number;
// 	image: string;
// 	category: Array<string>;
// }
