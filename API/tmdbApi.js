import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	params: {
		api_key: '30254669061eca893b13eb9928cb1104',
		language: 'pt-BR',
	},
});
