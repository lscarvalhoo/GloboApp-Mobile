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
	const [detalhes, setDetalhes] = React.useState(false);
	const [ehFavorito, setEhFavorito] = React.useState(false);
	const [adicionado, setadicionado] = React.useState(false);
	const [filmesRelacionados, setFilmesFavoritos] = React.useState();
	const { adicionaFilmeFavorito, removeFilmeFavorito, verificaFilme } =
		React.useContext(FavsContext);

	// React.useEffect(() => {
	// 	const verificacao = verificaFilme(route.params.filme.id);
	// 	setEhFavorito(verificacao);
	// }, []);

	function voltaPagina() {
		navigation.goBack();
	}

	async function carregarAssistaTambem() {
		const response = await api.get(`movie/latest`);
		setFilmesFavoritos(response.data);
		setDetalhes(false);
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
						{ehFavorito ? (
							<TouchableOpacity
								onPress={() => adicionaFilmeFavorito(route.params.filme)}
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
								onPress={() => removeFilmeFavorito(route.params.filme)}
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
			<View>{filmesRelacionados ? <View></View> : <View></View>}</View>
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
});

export default Highlights;
