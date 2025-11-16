import type { FC } from "react";
import { DefaultPizza } from "./sections/DefaultPizza";
import { PopularPizza } from "./sections/PopularPizza";

export const MenuPage: FC = () => {
	return (
		<>
			<DefaultPizza />
			<PopularPizza />
		</>
	);
};
