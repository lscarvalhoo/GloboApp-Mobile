import React from 'react';
import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { FavsContext } from '../contexts/FavsContext';
import { api } from '../../API/tmdbApi';

const Highlights = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [detalhes, setDetalhes] = React.useState(true);
	const [ehFavorito, setEhFavorito] = React.useState(false);
	const [filmesRelacionados, setFilmesRelacionados] = React.useState();
	const [generosFilme, setGeneros] = React.useState();
	const { adicionaFilmeFavorito, removeFilmeFavorito, verificaFilme } =
		React.useContext(FavsContext);

	React.useEffect(() => {
		async function preencheDados() {
			await buscaGeneroFilme();
			const verificacao = await verificaFilme(route.params.filme.id);

			if (verificacao !== undefined) {
				setEhFavorito(true);
			} else {
				setEhFavorito(false);
			}
		}

		preencheDados();
	}, [route.params.filme]);

	function voltaPagina() {
		navigation.goBack();
	}

	async function carregarAssistaTambem() {
		if (route.params.tipo === 'Series') {
			const response = await api.get('tv/popular', {
				params: {
					page: 1,
				},
			});
			setFilmesRelacionados(response.data.results.slice(0, 15));
		} else {
			const response = await api.get('movie/now_playing', {
				params: {
					page: 1,
				},
			});
			setFilmesRelacionados(response.data.results.slice(0, 10));
		}

		setDetalhes(false);
	}

	async function adicionaFavorito(filme) {
		await adicionaFilmeFavorito(filme);
		setEhFavorito(true);
	}

	async function removeFavorito(filme) {
		await removeFilmeFavorito(filme);
		setEhFavorito(false);
	}

	function abriHighlights(filmeId) {
		const filme = filmesRelacionados.find((f) => f.id === filmeId);

		navigation.navigate('Highlights', { filme: filme, tipo: route.params.tipo });
	}

	async function buscaGeneroFilme() {
		if (route.params.tipo === 'Series') {
			const generos = await api.get('genre/tv/list');

			let listaGeneros = '';
			route.params.filme.genre_ids.forEach((genero) => {
				const aux = generos.data.genres.filter((g) => {
					return g.id === genero;
				});

				listaGeneros += `${aux[0].name}, `;
				setGeneros(listaGeneros);
			});
		} else {
			const generos = await api.get('genre/movie/list');
			let listaGeneros = '';
			route.params.filme.genre_ids.forEach((genero) => {
				const aux = generos.data.genres.filter((g) => {
					return g.id === genero;
				});

				listaGeneros += `${aux[0].name}, `;
				setGeneros(listaGeneros);
			});
		}
	}

	return (
		<ScrollView
			style={styles.container}
			scrollEnabled={true}
			vertical={true}>
			<ImageBackground
				resizeMode="cover"
				blurRadius={15}
				style={styles.imgFundo}
				source={{
					uri: `https://image.tmdb.org/t/p/original${route.params.filme.poster_path}`,
				}}>
				<TouchableOpacity onPress={voltaPagina}>
					<Feather
						style={styles.button}
						name="arrow-left"
						size={44}
						color="white"
					/>
				</TouchableOpacity>
				<View style={styles.dadosFilme}>
					<ImageBackground
						style={styles.imgPoster}
						resizeMode="contain"
						source={{
							uri: `https://image.tmdb.org/t/p/original${route.params.filme.poster_path}`,
						}}></ImageBackground>
					<Text style={styles.titulo}>
						{route.params.tipo === 'Series' ? route.params.filme.name : route.params.filme.title}
					</Text>
					<Text style={styles.subtitulo}>{route.params.filme.overview}</Text>
					<View style={styles.divButtons}>
						<TouchableOpacity style={styles.buttonAssista}>
							<Ionicons
								name="play-sharp"
								size={24}
								color="white"
							/>
							<Text style={styles.textButton}>Assistir</Text>
						</TouchableOpacity>
						{!ehFavorito ? (
							<TouchableOpacity
								onPress={() => adicionaFavorito(route.params.filme)}
								style={styles.buttonAddLista}>
								<Ionicons
									name="add-circle-outline"
									size={24}
									color="white"
								/>
								<Text style={styles.textButton}>Minha Lista</Text>
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								onPress={() => removeFavorito(route.params.filme)}
								style={styles.buttonAddLista}>
								<FontAwesome
									name="remove"
									size={24}
									color="white"
								/>
								<Text style={styles.textButton}>Remover</Text>
							</TouchableOpacity>
						)}
					</View>
					<View style={styles.verMais}>
						<TouchableOpacity onPress={() => carregarAssistaTambem()}>
							<Text
								style={{
									marginRight: 50,
									marginBottom: 10,
									fontSize: 18,
									fontWeight: '600',
									color: detalhes ? '#cecece' : '#fff',
									borderBottomColor: !detalhes ? 'white' : 'black',
									borderBottomWidth: !detalhes ? 2 : 0,
								}}>
								ASSISTA TAMBÉM
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setDetalhes(true)}>
							<Text
								style={{
									marginRight: 50,
									marginBottom: 10,
									fontSize: 18,
									fontWeight: '600',
									color: !detalhes ? '#cecece' : '#fff',
									borderBottomColor: detalhes ? 'white' : 'black',
									borderBottomWidth: detalhes ? 2 : 0,
								}}>
								DETALHES
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
			{!detalhes ? (
				<View>
					{filmesRelacionados !== undefined ? (
						<View style={styles.filmesRelacionados}>
							{filmesRelacionados.map((filme) => {
								return (
									<TouchableOpacity
										key={filme.id}
										onPress={() => abriHighlights(filme.id)}>
										<ImageBackground
											style={styles.imagemFilme}
											source={{
												uri: `https://image.tmdb.org/t/p/original${filme.poster_path}`,
											}}></ImageBackground>
									</TouchableOpacity>
								);
							})}
						</View>
					) : (
						<View></View>
					)}
				</View>
			) : (
				<View>
					<Text style={styles.tituloDetalhes}>Ficha técnica</Text>
					<Text style={styles.caracteristicas}>
						Titulo:{' '}
						{route.params.tipo === 'Series' ? route.params.filme.name : route.params.filme.title}
					</Text>
					<Text style={styles.caracteristicas}>
						Ano de lançamento:{' '}
						{route.params.tipo === 'Series'
							? route.params.filme.first_air_date.slice(0, 4)
							: route.params.filme.release_date.slice(0, 4)}
					</Text>
					<Text style={styles.caracteristicas}>Generos: {generosFilme}</Text>
				</View>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: '#333',
	},
	imgFundo: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 500,
	},
	dadosFilme: {
		flex: 1,
		alignItems: 'center',
		width: '90%',
	},
	imgPoster: {
		width: '100%',
		height: 150,
	},
	titulo: {
		fontSize: 27,
		fontWeight: 'bold',
		color: 'white',
		marginTop: 10,
	},
	subtitulo: {
		marginTop: 10,
		fontSize: 16,
		maxHeight: 100,
		overflow: 'scroll',
		color: 'white',
	},
	button: {
		padding: 6,
		marginRight: '80%',
	},
	divButtons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		height: 100,
		marginTop: 10,
	},
	buttonAssista: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,.8)',
		alignItems: 'center',
		borderRadius: 6,
		height: 50,
	},
	buttonAddLista: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,.8)',
		alignItems: 'center',
		borderRadius: 6,
		height: 50,
		marginLeft: 6,
	},
	textButton: {
		fontWeight: 'bold',
		fontSize: 18,
		padding: 4,
		color: 'white',
	},
	verMais: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
	},
	filmesRelacionados: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	imagemFilme: {
		width: 120,
		height: 150,
		margin: 4,
	},
	tituloDetalhes: {
		marginLeft: 10,
		padding: 10,
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
	},
	caracteristicas: {
		padding: 6,
		marginLeft: 20,
		fontSize: 16,
		color: 'white',
		fontWeight: '600',
	},
});

export default Highlights;
