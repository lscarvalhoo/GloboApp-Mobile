import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { api } from '../../API/tmdbApi';

export const FavsContext = React.createContext({});

const FavsProvider = ({ children }) => {
	const [favoritos, setFavoritos] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		async function iniciaFavoritos() {
			const filmes = await AsyncStorage.getItem('@favs');

			if (filmes !== null && filmes !== undefined) {
				const filmesJson = await JSON.parse(filmes);
				setFavoritos(filmesJson);
			}
		}

		iniciaFavoritos();
	}, []);

	async function adicionaFilmeFavorito(filme) {
		if (!filme) return;
		else favoritos.push(filme);

		setFavoritos(favoritos);

		await AsyncStorage.setItem('@favs', JSON.stringify(favoritos));
	}

	async function removeFilmeFavorito(filme) {
		if (!filme) return;
		else {
			const favoritosAtualizado = favoritos.filter((f) => f.id !== filme.id);
			setFavoritos(favoritosAtualizado);
		}

		await AsyncStorage.setItem('@favs', JSON.stringify(favoritos));
	}

	return (
		<FavsContext.Provider
			value={{
				adicionaFilmeFavorito,
				removeFilmeFavorito,
				favoritos,
				loading,
				setLoading,
			}}>
			{children}
		</FavsContext.Provider>
	);
};

export default FavsProvider;
