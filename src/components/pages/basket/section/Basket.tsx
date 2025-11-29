"use client";
import type { FC } from "react";
import scss from "./Basket.module.scss";
import { useBasketStore } from "@/stores/useBasketStore";

export const Basket: FC = () => {
	const data = useBasketStore((state) => state.data);
	return (
		<section className={scss.Basket}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.pizza_list}>
						{data.map((item) => (
							<div className={scss.selected_pizza} key={item.id}>
								<div className={scss.left}>
									{" "}
									<img
										className={scss.img_pizza}
										src={item.image}
										alt=""
										width="150"
										height="150"
									/>
								</div>
								<div className={scss.right}>
									<h1 className={scss.title}>{item.name}</h1>
									<p className={scss.size_pizza}>{item.sizes}: размер пиццы</p>
									<h2 className={scss.quantity_pizza}>
										{item.quantity}: количество пиццы
									</h2>
									<span className={scss.price_pizza}>
										{item.price} {item.currency}: итоговая цена
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
