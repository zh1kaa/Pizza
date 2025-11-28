import type { FC } from "react";
import { DefaultPizza } from "./sections/DefaultPizza";
import { PopularPizza } from "./sections/PopularPizza";
import { PizzaButton } from "./sections/PizzaButton";

export const MenuPage: FC = () => {
	return (
		<>
			<PizzaButton />
			<DefaultPizza />
			<PopularPizza />
		</>
	);
};
