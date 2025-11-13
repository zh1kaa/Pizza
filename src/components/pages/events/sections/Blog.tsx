"use client";
import type { FC } from "react";
import scss from "./Blog.module.scss";

export const Blog: FC = () => {
	return (
		<section className={scss.Blog}>
			<div className="container">
				<div className={scss.content}>Blog</div>
			</div>
		</section>
	);
};
