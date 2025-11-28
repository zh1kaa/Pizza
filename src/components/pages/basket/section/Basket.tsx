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
							<div className={scss.left}>
								{" "}
								<img
									src={item.image}
									alt={item.name}
									width={"100px"}
									className={scss.img_pizza}
								/>
							</div>
							<div className={scss.right}>
								<h1 className={scss.title}>{item.name}</h1>
								<h2>{item.sizes}</h2>
								<h1>{item.quantity}</h1>
							</div>
							<div className={scss.price}>
								<h1>{item.price}</h1>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
