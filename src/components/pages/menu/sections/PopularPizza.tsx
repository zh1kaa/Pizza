"use client";
import { useEffect, useState, type FC } from "react";
import scss from "./PopularPizza.module.scss";
import { api } from "@/api";
import { useFilterPizzaStore } from "@/stores/useFilterPizzaStore";

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

export const PopularPizza: FC = () => {
	const [pizzaPopular, setPizzaPopular] = useState<PizzaType[]>([]);
	const getPopularPizza = async () => {
		const response = await api.get(`/pizza_popular?category[]=${filter}`);
		setPizzaPopular(response.data);
	};
	const { filter } = useFilterPizzaStore();
	useEffect(() => {
		getPopularPizza();
	}, [filter]);

	return (
		<section className={scss.PopularPizza}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.pizza_list}>
						{pizzaPopular.map((item) => (
							<div key={item.id} className={scss.types_of_pizza}>
								<img className={scss.img_pizza} src={item.image} alt="" />
								<h1 className={scss.title}>{item.name}</h1>
								<p className={scss.description}>{item.description}</p>
								<div className={scss.pizza_box}>
									<div className={scss.size_pizza}>
										{item.sizes.map((item, index) => (
											<button key={index}>{item}</button>
										))}
									</div>
									<button className={scss.ingridients}>+ ingridients</button>
									<div className={scss.pizza_selection}>
										<span className={scss.price}>
											{item.price} {item.currency}
										</span>
										<div className={scss.quantity}>
											<button className={scss.quantity_button}>+</button>
											<span className={scss.quantity_number}>0</span>
											<button className={scss.quantity_button}>-</button>
										</div>
									</div>
									<button className={scss.order_now}>order now</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
