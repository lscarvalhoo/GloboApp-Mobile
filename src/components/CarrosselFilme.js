import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	View,
	Image,
	Text,
	StyleSheet,
	ScrollView,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';
import { api } from '../../API/tmdbApi';

export const CarrosselFilmes = ({ tipoLista }) => {
	const [filmes, setFilmes] = React.useState();
	const navigation = useNavigation();

	function abriHighlights(filmeId) {
		const filme = filmes.find((f) => f.id === filmeId);

		navigation.navigate('Highlights', { filme: filme });
	}

	React.useEffect(() => {
		async function carregaFilmes() {
			if (tipoLista === 'Series') {
				const response = await api.get('tv/popular', {
					params: {
						page: 1,
					},
				});

				setFilmes(response.data.results.slice(0, 10));
			} else if (tipoLista === 'Filmes') {
				const response = await api.get('movie/now_playing', {
					params: {
						page: 1,
					},
				});

				setFilmes(response.data.results.slice(0, 10));
			}
		}

		carregaFilmes();
	}, []);

	return (
		<>
			<Text style={styles.textoTitulo}>{tipoLista}</Text>
			<View style={styles.container}>
				<ScrollView
					scrollEnabled={true}
					horizontal={true}
					style={styles.filmeContainer}>
					{filmes &&
						filmes.map((filme) => {
							return (
								<TouchableOpacity onPress={() => abriHighlights(filme.id)}>
									<ImageBackground
										id={filme.id}
										style={styles.imagemFilme}
										source={{
											uri: `https://image.tmdb.org/t/p/original${filme.poster_path}`,
										}}></ImageBackground>
								</TouchableOpacity>
							);
						})}
				</ScrollView>
			</View>
		</>
	);
};
export default CarrosselFilmes;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		margin: 10,
	},
	filmeContainer: {
		width: '100%',
	},
	textoTitulo: {
		fontSize: 18,
		padding: 6,
		fontWeight: 'bold',
		color: 'white',
	},
	imagemFilme: {
		width: 150,
		height: 200,
	},
});
