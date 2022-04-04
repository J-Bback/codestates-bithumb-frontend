import React, { useState } from "react";
import styles from "./Nav.module.scss";

const Nav = () => {
	const items = [
		{ key: "lend", label: "Lend" },
		{ key: "stake", label: "Stake" },
		{ key: "farm", label: "Farm" },
	];
	const renderItems = () => {
		return (
			<div className={styles.itemWrap}>
				{items.map((v, i) => {
					return (
						<div key={"nav" + i} className={styles.item}>
							{v.label}
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<nav className={styles.nav}>
			<div>KDFarm</div>
			{renderItems()}
			<div>Wallet</div>
		</nav>
	);
};

export default Nav;
