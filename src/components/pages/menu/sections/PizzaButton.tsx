"use client";
import { useEffect, useState, type FC } from "react";
import scss from "./PizzaButton.module.scss";
import { api } from "@/api";

interface PizzaButtonType {
	id: number;
	name: string;
}
export const PizzaButton: FC = () => {
	const [pizzaButton, setPizzaButton] = useState<PizzaButtonType[]>([]);
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
						<button key={item.id} className={scss.pizza_button}>
							{item.name}
						</button>
					))}
				</div>
			</div>
		</section>
	);
};
