import type { FC } from "react";
import { DefaultPizza } from "./sections/DefaultPizza";
import { PopularPizza } from "./sections/PopularPizza";
import { Pi } from "lucide-react";
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
