"use client";
import {  type FC } from "react";
import scss from "./IndState.module.scss";

export const IndState: FC = () => {
	return (
		<section className={scss.IndState}>
			<div className="container">
				<div className={scss.content}></div>
			</div>
		</section>
	);
};
