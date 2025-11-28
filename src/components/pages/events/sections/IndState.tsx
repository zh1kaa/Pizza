"use client";
import { useEffect, useState, type FC } from "react";
import scss from "./IndState.module.scss";
import { api } from "@/api";
import { useBasketStore } from "@/stores/useBasketStore";

interface PizzaType {
	id: number;
	name: string;
	description: string;
	price: number;
	currency: string;
	sizes: [number]; // Доступные размеры (например [25, 30, 35])
	image: string;
	category: [string];

	// количество
	quantity: number;
}

export const IndState: FC = () => {
	const loadPizzas = async () => {
		const response = await api.get(`/pizza_default`);
		setPizzaList(response.data);
	};

	useEffect(() => {
		loadPizzas();
	}, []);

	const [pizzaList, setPizzaList] = useState<PizzaType[]>([]);
	const addToBasket = useBasketStore((state) => state.addItem);
	const [quantities, setQuantities] = useState<{ [pizzaId: number]: number }>(
		{}
	);
	const [selectedSizes, setSelectedSizes] = useState<{
		[pizzaId: number]: number;
	}>({});

	const increaseQuantity = (pizzaId: number) => {
		setQuantities((prev) => ({
			...prev,
			[pizzaId]: (prev[pizzaId] || 0) + 1,
		}));
	};

	const decreaseQuantity = (pizzaId: number) => {
		setQuantities((prev) => ({
			...prev,
			[pizzaId]: (prev[pizzaId] || 0) - 1,
		}));
	};

	const selectSize = (item: PizzaType, sizeIndex: number) => {
		setSelectedSizes((prev) => ({
			...prev,
			[item.id]: item.sizes[sizeIndex],
		}));
	};

	const handleAddToBasket = (item: PizzaType) => {
		const updateSizes: PizzaType = {
			...item,
			sizes: [selectedSizes[item.id]],
			quantity: quantities[item.id],
		};

		addToBasket(updateSizes);
	};

	return (
		<section className={scss.IndState}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.Pizza_type}>
						{pizzaList.map((item) => (
							<div key={item.id}>
								<h1>{item.name}</h1>
								<div>
									<button onClick={() => increaseQuantity(item.id)}>+</button>
									<span>{quantities[item.id] || 0}</span>
									<button onClick={() => decreaseQuantity(item.id)}>-</button>
								</div>
								<div className={scss.size_button}>
									{item.sizes.map((size, index) => (
										<button key={index} onClick={() => selectSize(item, index)}>
											{size}
										</button>
									))}
								</div>
								<button onClick={() => handleAddToBasket(item)}>order</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
