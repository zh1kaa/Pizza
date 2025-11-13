"use client";
import type { FC } from "react";
import scss from "./PopularPizza.module.scss";
import type_of_pizza from "@/assets/type_of_pizza.png";

export const PopularPizza: FC = () => {
	return (
		<section className={scss.PopularPizza}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.all_button}>
						<button className={scss.pizza_button}>Show All</button>
						<button className={scss.pizza_button}>Meat</button>
						<button className={scss.pizza_button}>Vegetarian</button>
						<button className={scss.pizza_button}>Sea Products</button>
						<button className={scss.pizza_button}>Mushroom</button>
					</div>
					<div className={scss.types_of_pizza}>
						<div className={scss.img_pizza}>
							<img src={type_of_pizza.src} alt="" />
						</div>
						<div className={scss.title}></div>
						<div className={scss.description}></div>
						<div className={scss.size_pizza}></div>
						<div className={scss.ingridients}></div>
						<div className={scss.pizza_selection}>
							<div className={scss.price}></div>
							<div className={scss.quantity}></div>
						</div>
						<div className={scss.order_now}></div>
					</div>
				</div>
			</div>
		</section>
	);
};
