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
					{data.map((item) => (
						<div key={item.id} className={scss.basket_box}>
							<img
								src={item.image}
								alt={item.name}
								width={"100px"}
								className={scss.img_pizza}
							/>
							<h1 className={scss.title}>{item.name}</h1>
							<p className={scss.description}>{item.quantity}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
