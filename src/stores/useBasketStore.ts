import { useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Описание одного товара в корзине
interface BasketItem {
	id: number;
	name: string;
	description: string;
	price: number;
	currency: string;
	sizes: [number]; // Доступные размеры (например [25, 30, 35])
	image: string;
	category: Array<string>;

	// количество
	quantity: number;
}

interface BasketStore {
	data: BasketItem[];
	addItem: (item: BasketItem) => void; // Функция для добавления товара
}

export const useBasketStore = create<BasketStore>()(
	persist(
		(set) => ({
			data: [],
			addItem: (item) =>
				set((state) => {
					// Ищем, есть ли уже такая пицца с таким же размером
					const existingItemIndex = state.data.findIndex(
						(existingItem) =>
							existingItem.id === item.id &&
							existingItem.sizes[0] === item.sizes[0]
					);
					// Если нашли - увеличиваем количество существующего товара
					if (existingItemIndex !== -1) {
						const updatedData = [...state.data]; // Копируем массив
						updatedData[existingItemIndex].quantity += item.quantity; // Добавляем количество
						updatedData[existingItemIndex].price += item.price; // Обновляем цену
						return { data: updatedData }; // Возвращаем обновленное состояние
					}
					// Если не нашли - добавляем новый товар в конец массива
					return { data: [...state.data, item] };
				}),
		}),
		{
			name: "basket-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
