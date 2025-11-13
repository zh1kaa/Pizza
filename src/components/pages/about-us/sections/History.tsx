"use client";
import type { FC } from "react";
import scss from "./History.module.scss";

export const History: FC = () => {
	return (
		<section className={scss.History}>
			<div className="container">
				<div className={scss.content}>History</div>
			</div>
		</section>
	);
};
