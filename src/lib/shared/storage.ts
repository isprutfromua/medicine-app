import { browser } from '$app/environment';

interface Storage {
	getItem<T>(key: string, defaultValue: T): T;
	setItem<T>(key: string, value: T): void;
}

class LocalStorage implements Storage {
	private static instance: LocalStorage;

	private constructor() {}

	static getInstance() {
		if (!LocalStorage.instance) {
			LocalStorage.instance = new LocalStorage();
		}
		return LocalStorage.instance;
	}

	getItem<T>(key: string, defaultValue: T) {
		const value = browser ? localStorage.getItem(key) : null;
		try {
			return value ? (JSON.parse(value) as T) : defaultValue;
		} catch (error) {
			return defaultValue;
		}
	}

	setItem<T>(key: string, value: T) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}

// Initialize storage as a global object
export const storage = LocalStorage.getInstance();
