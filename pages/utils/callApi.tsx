import React from "react";
import axios from "axios";

type DataProps = {
	method: string;
	url: string;
	body?: any;
};

type Options = {
	method: string;
	header: any;
	body?: any;
	params?: any;
};

export const CallApi = async (data: DataProps) => {
	let options: Options = {
		method: data.method,
		header: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	};

	if (!!data.body && data.method === "POST") {
		options.body = data.body.stringify();
	}

	const response = await fetch(data.url, options)
		.then((res) => res)
		.catch((e) => console.log(e));
	return response;
};
