import { triggerAsyncId } from "async_hooks";
import React, { useState, useEffect } from "react";
import { Context } from "vm";
// import DataStore from '../stores/DataStore';
import { CallApi } from "../utils/callApi";

export const Exchange = (props: any) => {
	const [data, setData] = useState();

	useEffect(() => {
		getData();
	}, [data]);

	const getData = async () => {
		console.log("props", props);
		try {
			const orderCurrency = "ALL";
			const paymentCurrency = "KRW";
			const data = {
				method: "GET",
				url: `https://api.bithumb.com/public/ticker/${orderCurrency}_${paymentCurrency}`,
			};

			const response: any = await CallApi(data);
			const responseJson: any = await response.json();
			if (response.status === 200) {
				console.log("RESPONSEJSON", responseJson);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return <div>거래소 데이터 뷰</div>;
};

// export const getServerSideProps: GetServerSideProps = async (
// 	context: Context
// ) => {
// 	try {
// 		const data = {
// 			method: "GET",
// 			url: "https://api.upbit.com/v1/ticker?markets=KRW-BTC",
// 		};

// 		const response = CallApi(data);
// 		const responseJson = response.json();
// 	} catch (e) {
// 		console.log(e);
// 	}
// };
