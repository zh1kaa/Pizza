"use client";
import { useEffect, useState, type FC } from "react";
import scss from "./PizzaButton.module.scss";
import { api } from "@/api";
import { useFilterPizzaStore } from "@/stores/useFilterPizzaStore";

interface PizzaButtonType {
	id: number;
	name: string;
}

export const PizzaButton: FC = () => {
	const [pizzaButton, setPizzaButton] = useState<PizzaButtonType[]>([]);
	const [activeButton, setActiveButton] = useState<number | null>(1);

	const { setFilter } = useFilterPizzaStore();

	const getPizzaButton = async () => {
		const response = await api.get("/pizza_filter");
		setPizzaButton(response.data);
	};

	useEffect(() => {
		getPizzaButton();
	}, []);

	return (
		<section className={scss.PizzaButton}>
			<div className="container">
				<div className={scss.content}>
					{pizzaButton.map((item) => (
						<button
							key={item.id}
							onClick={() => {
								setActiveButton(item.id);
								setFilter(item.name);
							}}
							className={`${scss.pizza_button} ${
								activeButton === item.id ? scss.active : ""
							}`}>
							{item.name}
						</button>
					))}
				</div>
			</div>
		</section>
	);
};
