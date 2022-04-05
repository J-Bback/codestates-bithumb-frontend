import { observable, action } from "mobx";

interface Loading {
	display: boolean;
}

export class LoadingStore {
	@observable display = false;
	constructor() {}

	@action on = () => {
		this.display = true;
	};

	@action off = () => {
		this.display = false;
	};

	@action loadingState = () => {
		return this.display;
	};
}
