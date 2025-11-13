"use client";
import type { FC } from "react";
import scss from "./Pizza.module.scss";
import Image from "next/image";
import lightning from "@/assets/lightning.png";
import pizza from "@/assets/pizza.png";
import right_line from "@/assets/right_line.png";

export const Pizza: FC = () => {
	return (
		<section className={scss.Pizza}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.left}>
						{" "}
						<div className={scss.title}>
							<span className={scss.up}>
								The Fastest{" "}
								<img
									className={scss.icon}
									src={right_line.src}
									alt="lightning"
								/>
							</span>
							<span className={scss.down}>
								Pizza{" "}
								<img
									className={scss.icon}
									src={lightning.src}
									alt="lightning"
								/>{" "}
								Delivery
							</span>
						</div>
						<div className={scss.description}>
							We will deliver juicy pizza for your family in 30 minutes, if the
							courier is late - <span>pizza is free!</span>
						</div>
					</div>
					<div className={scss.right}>
						<Image className={scss.image} src={pizza} alt="pizza" />
					</div>
				</div>
			</div>
		</section>
	);
};
