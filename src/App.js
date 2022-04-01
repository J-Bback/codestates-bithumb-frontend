import styles from "./App.css";
import React, { useState } from "react";

function App() {
	// const [tab, setTab] = useState("KRW");
	// const tabs = ["원화 마켓", "BTC 마켓"]; // KRW, BTC

	// const renderTabs = () => {
	// 	return tabs.map((v, i) => {
	// 		return (
	// 			<div key={i + "header"}>
	// 				<input
	// 					type="button"
	// 					id="header"
	// 					name="header"
	// 					onClick={(e) => moveTab(e)}
	// 					value={v}
	// 				/>
	// 			</div>
	// 		);
	// 	});
	// };

	// const moveTab = (e) => {
	// 	console.log(e);
	// };

	const renderChart = () => {
		return <div className={styles.header_chart}>KRW list 5개 맵돌리기</div>;
	};

	return (
		<div className={styles.App}>
			<header className={styles.header}>
				<div className={styles.header_title}>
					<p>{"마켓 변동률 TOP5"}</p>
				</div>
				{renderChart()}
			</header>
		</div>
	);
}

export default App;
