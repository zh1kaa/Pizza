"use client";
import { useEffect, useState, type FC } from "react";
import scss from "./DefaultPizza.module.scss";
import { api } from "@/api";
import { useBasketStore } from "@/stores/useBasketStore";
import { useFilterPizzaStore } from "@/stores/useFilterPizzaStore";

// Описание одной пиццы из API
interface PizzaType {
	id: number;
	name: string;
	description: string;
	price: number;
	currency: string;
	sizes: [number]; // Доступные размеры (например [25, 30, 35])
	quantity: number;
	image: string;
	category: [string];
}

export const DefaultPizza: FC = () => {
	const { filter } = useFilterPizzaStore();

	const addToBasket = useBasketStore((state) => state.addItem);

	const [pizzaList, setPizzaList] = useState<PizzaType[]>([]);

	const [quantities, setQuantities] = useState<{ [pizzaId: number]: number }>(
		{}
	);

	const [selectedSizes, setSelectedSizes] = useState<{
		[pizzaId: number]: number;
	}>({});

	const [pricePizza, setPricePizza] = useState<{ [pizzaId: number]: number }>(
		{}
	);
	console.log(pricePizza);

	const loadPizzas = async () => {
		const response = await api.get(`/pizza_default?category[]=${filter}`);
		setPizzaList(response.data);
	};

	useEffect(() => {
		loadPizzas();
	}, [filter]);

	const increaseQuantity = (pizzaId: number, pizzaPrice: number) => {
		const newData = (quantities[pizzaId] || 1) + 1;
		setQuantities((prev) => ({
			...prev,
			[pizzaId]: newData,
		}));
		setPricePizza((prev) => ({
			...prev,
			[pizzaId]: pizzaPrice * newData,
		}));
	};

	const decreaseQuantity = (pizzaId: number, pizzaPrice: number) => {
		const newData = Math.max(0, (quantities[pizzaId] || 1) - 1);
		setQuantities((prev) => ({
			...prev,
			[pizzaId]: newData,
		}));
		setPricePizza((prev) => ({
			...prev,
			[pizzaId]: pizzaPrice * newData,
		}));
	};

	// const decreaseQuantity = (pizzaId: number, pizzaPrice: number) => {
	// 	const newQuantity = Math.max(0, (quantities[pizzaId] || 1) - 1);
	// 	setQuantities((prev) => ({
	// 		...prev,
	// 		[pizzaId]: newQuantity,
	// 	}));
	// 	setPricePizza((prev) => ({
	// 		...prev,
	// 		[pizzaId]: pizzaPrice * newQuantity,
	// 	}));
	// };

	const selectSize = (pizza: PizzaType, sizeIndex: number) => {
		setSelectedSizes((prev) => ({
			...prev,
			[pizza.id]: pizza.sizes[sizeIndex],
		}));
	};

	const handleAddToBasket = (item: PizzaType) => {
		const updateSizes: PizzaType = {
			...item,
			sizes: [selectedSizes[item.id] || item.sizes[0]],
			quantity: quantities[item.id] || 1,
			price: pricePizza[item.id] || item.price,
		};
		console.log(item.price);

		addToBasket(updateSizes);
	};

	return (
		<section className={scss.DefaultPizza}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.pizza_list}>
						{pizzaList.map((pizza) => (
							<div key={pizza.id} className={scss.types_of_pizza}>
								<img
									className={scss.img_pizza}
									src={pizza.image}
									alt={pizza.name}
								/>
								<h1 className={scss.title}>{pizza.name}</h1>
								<p className={scss.description}>{pizza.description}</p>

								<div className={scss.pizza_box}>
									<div className={scss.size_pizza}>
										{pizza.sizes.map((size, index) => (
											<button
												key={index}
												onClick={() => selectSize(pizza, index)}
												className={`${scss.size_button} `}>
												{size}
											</button>
										))}
									</div>
									<button className={scss.ingridients}>+ ingredients</button>
									<div className={scss.pizza_selection}>
										<span className={scss.price}>
											{pizza.price} {pizza.currency}
										</span>

										<div className={scss.quantity}>
											<button
												className={scss.quantity_button}
												onClick={() => {
													increaseQuantity(pizza.id, pizza.price);
												}}>
												+
											</button>
											<span className={scss.quantity_number}>
												{quantities[pizza.id] || 1}
											</span>
											<button
												className={scss.quantity_button}
												onClick={() => {
													decreaseQuantity(pizza.id, pizza.price);
												}}>
												-
											</button>
										</div>
									</div>

									<button
										className={scss.order_now}
										onClick={() => handleAddToBasket(pizza)}>
										order now
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
