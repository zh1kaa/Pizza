"use client";
import { useEffect, useState, type FC } from "react";
import scss from "./DefaultPizza.module.scss";
import { api } from "@/api";
import { useBasketStore } from "@/stores/useBasketStore";

// Описание одной пиццы из API
interface PizzaType {
	id: number;
	name: string;
	description: string;
	price: number;
	currency: string;
	sizes: Array<number>; // Доступные размеры (например [25, 30, 35])
	quantity: number;
	image: string;
	category: Array<string>;
}

export const DefaultPizza: FC = () => {
	// Список всех пицц, полученных с сервера
	const [pizzaList, setPizzaList] = useState<PizzaType[]>([]);

	// Количество для каждой пиццы (ключ = id пиццы, значение = количество)
	const [quantities, setQuantities] = useState<{ [pizzaId: number]: number }>(
		{}
	);

	// Выбранный размер для каждой пиццы (ключ = id пиццы, значение = индекс размера)
	const [selectedSizes, setSelectedSizes] = useState<{
		[pizzaId: number]: number;
	}>({});

	// Функция добавления товара в корзину (из zustand store)
	const addToBasket = useBasketStore((state) => state.addItem);

	// Загрузка списка пицц с сервера
	const loadPizzas = async () => {
		const response = await api.get("/pizza_default");
		setPizzaList(response.data);
	};

	// Загружаем пиццы при первой загрузке компонента
	useEffect(() => {
		loadPizzas();
	}, []);

	// Увеличить количество пиццы на 1
	const increaseQuantity = (pizzaId: number) => {
		setQuantities((prev) => ({
			...prev,
			[pizzaId]: (prev[pizzaId] || 0) + 1,
		}));
	};

	// Уменьшить количество пиццы на 1 (минимум 0)
	const decreaseQuantity = (pizzaId: number) => {
		setQuantities((prev) => ({
			...prev,
			[pizzaId]: Math.max(0, (prev[pizzaId] || 0) - 1),
		}));
	};

	// Выбрать размер пиццы (сохраняем индекс выбранного размера)
	const selectSize = (pizzaId: number, sizeIndex: number) => {
		setSelectedSizes((prev) => ({
			...prev,
			[pizzaId]: sizeIndex,
		}));
	};

	// Добавить пиццу в корзину
	const handleAddToBasket = (pizza: PizzaType) => {
		// Получаем индекс выбранного размера (если не выбрано, берем 0)
		const sizeIndex = selectedSizes[pizza.id] ?? 0;
		// Получаем сам размер из массива
		const selectedSize = pizza.sizes[sizeIndex];
		// Получаем количество (если не указано, берем 1)
		const quantity = quantities[pizza.id] || 1;

		// Добавляем в корзину
		addToBasket({
			id: pizza.id,
			name: pizza.name,
			description: pizza.description,
			price: pizza.price,
			currency: pizza.currency,
			sizes: selectedSize, // Конкретный размер (число, например 30)
			quantity: quantity, // Количество штук
			image: pizza.image,
			category: pizza.category,
		});
	};

	return (
		<section className={scss.DefaultPizza}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.pizza_list}>
						{pizzaList.map((pizza) => {
							// Текущее количество этой пиццы
							const currentQuantity = quantities[pizza.id] || 0;
							// Индекс выбранного размера (по умолчанию 0)
							const currentSizeIndex = selectedSizes[pizza.id] ?? 0;

							return (
								<div key={pizza.id} className={scss.types_of_pizza}>
									<img
										className={scss.img_pizza}
										src={pizza.image}
										alt={pizza.name}
									/>
									<h1 className={scss.title}>{pizza.name}</h1>
									<p className={scss.description}>{pizza.description}</p>

									<div className={scss.pizza_box}>
										{/* Выбор размера пиццы */}
										<div className={scss.size_pizza}>
											{pizza.sizes.map((size, index) => (
												<button
													key={index}
													onClick={() => selectSize(pizza.id, index)}
													className={`${scss.size_button} ${
														currentSizeIndex === index ? scss.active : ""
													}`}>
													{size}
												</button>
											))}
										</div>

										<button className={scss.ingridients}>+ ingredients</button>

										{/* Блок с ценой и количеством */}
										<div className={scss.pizza_selection}>
											<span className={scss.price}>
												{pizza.price} {pizza.currency}
											</span>

											{/* Счетчик количества */}
											<div className={scss.quantity}>
												<button
													className={scss.quantity_button}
													onClick={() => increaseQuantity(pizza.id)}>
													+
												</button>
												<span className={scss.quantity_number}>
													{currentQuantity}
												</span>
												<button
													className={scss.quantity_button}
													onClick={() => decreaseQuantity(pizza.id)}>
													-
												</button>
											</div>
										</div>

										{/* Кнопка "Заказать" */}
										<button
											className={scss.order_now}
											onClick={() => handleAddToBasket(pizza)}>
											order now
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};
