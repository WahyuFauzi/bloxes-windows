export default class FrontEndHelper {
	getUserData() {
		return new Promise((resolve, reject) => {
			window.api.init();
			window.api.setUser((event, value) =>
				value === null ? reject() : resolve(value)
			);
		});
	}
}
