import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	params: {
		api_key: '7a2645927b5c0f2fbd062f63300d654b',
		language: 'pt-BR',
	},
});
