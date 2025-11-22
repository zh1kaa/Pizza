import { create } from "zustand";

// Описание одного товара в корзине
interface BasketItem {
	id: number; // ID пиццы
	name: string; // Название пиццы
	description: string; // Описание
	price: number; // Цена за одну штуку
	currency: string; // Валюта (например "₽")
	sizes: number; // Выбранный размер (число, например 30)
	quantity: number; // Количество штук
	image: string; // Ссылка на картинку
	category: Array<string>; // Категории пиццы (массив строк)
}

// Описание хранилища корзины
interface BasketStore {
	data: BasketItem[]; // Массив всех товаров в корзине
	addItem: (item: BasketItem) => void; // Функция для добавления товара
}

// Создаем глобальное хранилище с помощью zustand
export const useBasketStore = create<BasketStore>((set) => ({
	// Начальное состояние - пустая корзина
	data: [],

	// Функция для добавления товара в корзину
	addItem: (item: BasketItem) =>
		set((state) => {
			// Ищем, есть ли уже такая пицца с таким же размером
			const existingItemIndex = state.data.findIndex(
				(existingItem) =>
					existingItem.id === item.id && existingItem.sizes === item.sizes
			);

			// Если нашли - увеличиваем количество существующего товара
			if (existingItemIndex !== -1) {
				const updatedData = [...state.data]; // Копируем массив
				updatedData[existingItemIndex].quantity += item.quantity; // Добавляем количество
				return { data: updatedData }; // Возвращаем обновленное состояние
			}

			// Если не нашли - добавляем новый товар в конец массива
			return { data: [...state.data, item] };
		}),
}));
