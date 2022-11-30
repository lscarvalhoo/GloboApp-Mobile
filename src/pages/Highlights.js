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
import { Feather, Ionicons } from '@expo/vector-icons';
import { api } from '../../API/tmdbApi';

let detalhesAtivo = false;

const Highlights = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [detalhes, setDetalhes] = React.useState(false);
	let indicacoes;

	async function buscaIndicacoes() {
		recomendados = await api.get(`movie/${route.params.filme.id}/similar`);

		console.log(recomendados);

		indicacoes = await recomendados.data;
	}

	function abriHighlights(filme) {
		navigation.navigate('Highlights', { filme: filme });
	}

	function voltaPagina() {
		navigation.goBack();
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
					<Text style={styles.titulo}>{route.params.filme.title}</Text>
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
						<TouchableOpacity style={styles.buttonAddLista}>
							<Ionicons
								name="add-circle-outline"
								size={24}
								color="white"
							/>
							<Text style={styles.textButton}>Minha Lista</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.verMais}>
						<TouchableOpacity onPress={() => setDetalhes(false)}>
							<Text style={styles.textoVerMais}>ASSISTA TAMBÉM</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setDetalhes(true)}>
							<Text style={styles.textoDetalhes}>DETALHES</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
			{detalhes ? (
				<View></View>
			) : (
				<View>
					{indicacoes &&
						indicacoes.map((filme) => {
							return (
								<TouchableOpacity onPress={() => abriHighlights(filme)}>
									<ImageBackground
										id={filme.id}
										style={styles.imagemFilme}
										source={{
											uri: `https://image.tmdb.org/t/p/original${filme.poster_path}`,
										}}></ImageBackground>
								</TouchableOpacity>
							);
						})}
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
	textoVerMais: {
		marginRight: 50,
		marginBottom: 10,
		fontSize: 18,
		fontWeight: '600',
		color: detalhesAtivo ? '#dcdcdc' : '#fff',
	},
	textoDetalhes: {
		marginRight: 50,
		marginBottom: 10,
		fontSize: 18,
		fontWeight: '600',
		color: detalhesAtivo ? '#fff' : '#dcdcdc',
	},
});

export default Highlights;
