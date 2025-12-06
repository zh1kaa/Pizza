"use client";
import type { FC } from "react";
import scss from "./Log_in.module.scss";
import { useLoginStore } from "@/stores/useLoginStore";

export const Log_in: FC = () => {
	const {
		name,
		email,
		password,
		isLoggedIn,
		login,
		setName,
		setEmail,
		setPassword,
	} = useLoginStore();

	return (
		<section className={scss.Log_in}>
			<div className="container">
				<div className={scss.content}>
					<input
						value={name}
						onChange={(item) => setName(item.target.value)}
						type="text"
					/>
					<input
						value={email}
						onChange={(item) => setEmail(item.target.value)}
						type="text"
					/>
					<input
						value={password}
						onChange={(item) => setPassword(item.target.value)}
						type="text"
					/>
					<button onClick={login}>log in</button>
				</div>
			</div>
		</section>
	);
};
