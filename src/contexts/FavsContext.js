import React from 'react';
import { api } from '../../API/tmdbApi';

export const FavsContext = React.createContext({});

const FavsProvider = ({ children }) => {
	const [favoritos, setFavoritos] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		async function iniciaFavoritos() {
			const filmesId = window.localStorage.getItem('@favsId');

			if (filmesId !== null) {
				const ids = filmesId.slice('+');

				ids.forEach(async (id) => {
					const resp = await api.get(`${id}`);

					const data = resp.data.results;

					favoritos.push(data);
					setFavoritos(favoritos);
				});
			}
		}

		iniciaFavoritos();
	});

	function adicionaFilmeFavorito(filme) {
		if (!filme) return;
		else favoritos.push(filme);
		setFavoritos(favoritos);

		let ids = '';

		favoritos.forEach((fav) => {
			ids += `${fav.id}+`;
		});

		window.localStorage.setItem('@favsId', ids);
	}

	function removeFilmeFavorito(filme) {
		if (!filme) return;
		else {
			const favoritosAtualizado = favoritos.filter((f) => f.id !== filme.id);
			setFavoritos(favoritosAtualizado);
		}

		let ids = '';

		favoritos.forEach((fav) => {
			ids += `${fav.id}+`;
		});

		window.localStorage.setItem('@favsId', ids);
	}

	return (
		<FavsContext.Provider
			value={(adicionaFilmeFavorito, removeFilmeFavorito, favoritos, loading, setLoading)}>
			{children}
		</FavsContext.Provider>
	);
};

export default FavsProvider;
