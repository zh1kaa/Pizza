import { LayoutSite } from "@/components/layout/LayoutSite";
import { FC, ReactNode } from "react";

interface IlayoutProps {
	children: ReactNode;
}

const layout: FC<IlayoutProps> = ({ children }) => {
	return (
		<>
			<LayoutSite>{children}</LayoutSite>
		</>
	);
};

export default layout;
