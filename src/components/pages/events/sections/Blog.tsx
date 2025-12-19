"use client";
import type { FC } from "react";
import scss from "./Blog.module.scss";
import Image from "next/image";
import blogImage from "@/assets/blog.png";
import cook from "@/assets/cook.png";
export const Blog: FC = () => {
	return (
		<section className={scss.Blog}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.block}>
						<Image className={scss.Image} src={cook} alt="blogImage" />
						<h1 className={scss.description}>HOW WE COOKING</h1>
					</div>
					<div className={scss.block}>
						<Image className={scss.Image} src={blogImage} alt="blogImage" />
						<h1 className={scss.description}>OUR BLOG</h1>
					</div>
					<div className={scss.titleBlock}>
						<h1 className={scss.title}> Events</h1>
						<p className={scss.text}>
							There are regular events in our pizzeria that will allow you to
							eat delicious food for a lower price!
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
