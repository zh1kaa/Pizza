"use client";
import type { FC } from "react";
import scss from "./Header.module.scss";
import Link from "next/link";
import order from "@/assets/order.png";
import { usePathname } from "next/navigation";
import { useWindowSize } from "react-use";
import { Hamburger } from "lucide-react";

const links = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "Menu",
		href: "/menu",
	},
	{
		name: "Events",
		href: "/events",
	},
	{
		name: "About Us",
		href: "/about-us",
	},
];

export const Header: FC = () => {
	const pathname = usePathname();
	console.log(pathname);

	const { width } = useWindowSize();
	// console.log(width);

	const isDesktop = width > 980;

	return (
		<header className={scss.Header}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.left}>
						<Link className={scss.link_to_home} href="/">
							pizzashop
						</Link>
					</div>
					{isDesktop ? (
						<div className={scss.middle}>
							{links.map((item, index) => {
								return (
									<Link
										key={index}
										href={item.href}
										className={
											pathname === item.href
												? ` ${scss.link} ${scss.active}`
												: `${scss.link}`
										}>
										{item.name}
									</Link>
								);
							})}
						</div>
					) : null}
					<div className={scss.right}>
						{isDesktop ? (
							<button className={scss.log_in}>Log in</button>
						) : (
							<button>
								<Hamburger />
							</button>
						)}
						<img src={order.src} alt="Order" />
					</div>
				</div>
			</div>
		</header>
	);
};
// {isDesktop && (
// 						<div className={scss.middle}>
// 							{links.map((item, index) => (
// 								<Link
// 									key={index}
// 									href={item.href}
// 									className={
// 										pathname === item.href
// 											? `${scss.link} ${scss.active}`
// 											: `${scss.link}`
// 									}>
// 									{item.name}
// 								</Link>
// 							))}
// 						</div>
// 					)}
