import type { FC } from "react";
import { DefaultPizza } from "./sections/DefaultPizza";
import { PizzaButton } from "./sections/PizzaButton";

export const MenuPage: FC = () => {
	return (
		<>
			<PizzaButton />
			<DefaultPizza />
		</>
	);
};
