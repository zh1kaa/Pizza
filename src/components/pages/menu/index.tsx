import type { FC } from "react";
import { DefaultPizza } from "./sections/DefaultPizza";
import { PizzaButton } from "./sections/PizzaButton";
import { PopularPizza } from "./sections/PopularPizza";

export const MenuPage: FC = () => {
	return (
		<>
			<PizzaButton />
			<DefaultPizza />
			<PopularPizza />
		</>
	);
};
