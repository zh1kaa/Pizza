"use client";
import type { FC } from "react";
import scss from "./Log_in.module.scss";
import { useLoginStore } from "@/stores/useLoginStore";
import { useRouter } from "next/navigation";

export const Log_in: FC = () => {
	const router = useRouter();

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

	const handleLogin = () => {
		login();
		router.push("/");
	};

	return (
		<section className={scss.Log_in}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.status}>
						<input
							className={scss.checkbox}
							value={name}
							onChange={(item) => setName(item.target.value)}
							placeholder="Введите имя"
							type="text"
						/>
						<input
							className={scss.checkbox}
							value={email}
							onChange={(item) => setEmail(item.target.value)}
							placeholder="Введите email"
							type="text"
						/>
						<input
							className={scss.checkbox}
							value={password}
							onChange={(item) => setPassword(item.target.value)}
							placeholder="Введите пароль"
							type="password"
						/>
						<button className={scss.sign_up} onClick={handleLogin}>
							log in
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};
