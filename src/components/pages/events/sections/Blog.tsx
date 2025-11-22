"use client";
import type { FC } from "react";
// import { useBasketStore } from "@/stores/useBasketStore";
import scss from "./Blog.module.scss";

export const Blog: FC = () => {
	// console.log(data);

	return (
		<section className={scss.Blog}>
			<div className="container">
				<div className={scss.content}></div>
			</div>
		</section>
	);
};
