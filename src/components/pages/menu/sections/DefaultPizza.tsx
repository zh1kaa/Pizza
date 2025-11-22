"use client";
import { useEffect, useState, type FC } from "react";
import scss from "./DefaultPizza.module.scss";
import { api } from "@/api";
import { useBasketStore } from "@/stores/useBasketStore";

interface PizzaType {
	id: number;
	name: string;
	description: string;
	price: number;
	currency: string;
	sizes: Array<number>;
	defaultSize: number;
	image: string;
	category: Array<string>;
}

export const DefaultPizza: FC = () => {
	const [counters, setCounters] = useState<{ [key: number]: number }>({});
	const [pizzaDefault, setPizzaDefault] = useState<PizzaType[]>([]);
	// const [activeButton, setActiveButton] = useState<[key: number] | null>(null);
	const [activeButtons, setActiveButtons] = useState<{ [key: number]: number }>(
		{}
	);
	const addItemEnd = useBasketStore((state) => state.addItem);

	const getDefaultPizza = async () => {
		const response = await api.get("/pizza_default");
		setPizzaDefault(response.data);
	};

	useEffect(() => {
		getDefaultPizza();
	}, []);

	return (
		<section className={scss.DefaultPizza}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.pizza_list}>
						{pizzaDefault.map((item) => (
							<div key={item.id} className={scss.types_of_pizza}>
								<img
									className={scss.img_pizza}
									src={item.image}
									alt={item.name}
								/>
								<h1 className={scss.title}>{item.name}</h1>
								<p className={scss.description}>{item.description}</p>
								<div className={scss.pizza_box}>
									<div className={scss.size_pizza}>
										{item.sizes.map((size, index) => (
											<button
												key={index}
												onClick={() =>
													setActiveButtons((prev) => ({
														...prev,
														[item.id]: index, // сохраняем выбранный размер для конкретной пиццы
													}))
												}
												className={` ${scss.size_button} ${
													activeButtons[item.id] === index ? scss.active : ""
												} `}>
												{size}
											</button>
										))}
									</div>
									<button className={scss.ingridients}>+ ingridients</button>
									<div className={scss.pizza_selection}>
										<span className={scss.price}>
											{item.price} {item.currency}
										</span>
										<div className={scss.quantity}>
											<button
												className={scss.quantity_button}
												onClick={() =>
													setCounters((prev) => ({
														...prev,
														[item.id]: (prev[item.id] || 0) + 1,
													}))
												}>
												+
											</button>
											<span className={scss.quantity_number}>
												{counters[item.id] || 0}
											</span>
											<button
												className={scss.quantity_button}
												onClick={() =>
													setCounters((prev) => ({
														...prev,
														[item.id]: Math.max(0, (prev[item.id] || 0) - 1),
													}))
												}>
												-
											</button>
										</div>
									</div>
									<button
										className={scss.order_now}
										onClick={() =>
											addItemEnd({
												id: item.id,
												name: item.name,
												description: item.description,
												price: item.price,
												currency: item.currency,
												size: item.sizes[Number(activeButtons) || 0], // если пользователь не выбрал размер, берём первый
												quantity: counters[item.id] || 1, // если количество не меняли, ставим 1
												image: item.image,
											})
										}>
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
