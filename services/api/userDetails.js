import axios from "../axios";

export const getUserProfile = async ({ queryKey }) => {
	const [_key, username] = queryKey;

	if (username) {
		const { data } = await axios.get(
			`users/${username}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`
		);
		return data;
	}

	return [];
};

export const getUserPhotosAndCollection = async ({ queryKey }) => {
	const [_key, username, field, page] = queryKey;

	if ((username, field, page)) {
		const { data } = await axios.get(
			`users/${username}/${field}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}&per_page=10&page=${page}`
		);
		return data;
	}

	return [];
};
