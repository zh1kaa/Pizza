"use client";
import { useEffect, useState, type FC } from "react";
import scss from "./DefaultPizza.module.scss";
import { api } from "@/api";
import { log } from "console";
import pizzatype1 from "@/assets/pizzatype1.png";

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
	const [pizzaDefault, setPizzaDefault] = useState<PizzaType[]>([]);
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
					<div className={scss.all_button}>
						<button className={scss.pizza_button}>Show All</button>
						<button className={scss.pizza_button}>Meat</button>
						<button className={scss.pizza_button}>Vegetarian</button>
						<button className={scss.pizza_button}>Sea Products</button>
						<button className={scss.pizza_button}>Mushroom</button>
					</div>
					<div className={scss.pizza_list}>
						{pizzaDefault.map((item) => (
							<div key={item.id} className={scss.types_of_pizza}>
								<div className={scss.img_pizza}>
									{/* <img src={item.image} alt="" /> */}
									<img src={pizzatype1.src} alt="" />
								</div>
								<div className={scss.title}>{item.name}</div>
								<div className={scss.description}>{item.description}</div>
								<div className={scss.size_pizza}>{item.sizes.join(" ")}</div>
								<div className={scss.ingridients}>
									<button>+ ingridients</button>
								</div>
								<div className={scss.pizza_selection}>
									<div className={scss.price}>
										{item.price} {item.currency}
									</div>
									<div className={scss.quantity}>
										<button>+</button>
										<button>1</button>
										<button>-</button>
									</div>
								</div>
								<div className={scss.order_now}>
									<button>order now</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
