"use client";
import type { FC } from "react";
import scss from "./Footer.module.scss";

export const Footer: FC = () => {
	return (
		<footer className={scss.Footer}>
			<div className="container">
				<div className={scss.content}>Footer</div>
			</div>
		</footer>
	);
};
