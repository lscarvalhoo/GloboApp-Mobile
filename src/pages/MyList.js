import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FavsContext } from '../contexts/FavsContext';
import { useNavigation } from '@react-navigation/native';

const MyList = () => {
	const { favoritos } = React.useContext(FavsContext);
	const navigation = useNavigation();

	function abriHighlights(filmeId) {
		const filme = favoritos.find((f) => f.id === filmeId);

		if (filme.release_date === undefined) {
			navigation.navigate('Highlights', { filme: filme, tipo: 'Series' });
		} else {
			navigation.navigate('Highlights', { filme: filme, tipo: 'Filmes' });
		}
	}

	if (favoritos.length > 0) {
		return (
			<View style={styles.container}>
				<Header pagina={'minha lista'} />
				<ScrollView>
					<ScrollView style={styles.filmeContainer}>
						{favoritos.map((filme) => {
							return (
								<TouchableOpacity
									key={filme.id}
									onPress={() => abriHighlights(filme.id)}>
									<ImageBackground
										style={styles.imagemFilme}
										resizeMode={'contain'}
										source={{
											uri: `https://image.tmdb.org/t/p/original${filme.poster_path}`,
										}}></ImageBackground>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</ScrollView>
				<Footer />
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<Header pagina={'minha lista'} />
				<View style={styles.containerSemFavoritos}>
					<Text style={styles.SemFavorito}>Ainda não há favoritos salvos</Text>
				</View>
				<Footer />
			</View>
		);
	}
};

export default MyList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: '#222',
		alignItems: 'center',
		justifyContent: 'center',
	},
	filmeContainer: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: 490,
		flexWrap: 'wrap',
		overflow: 'scroll',
	},
	imagemFilme: {
		width: 250,
		height: 390,
		margin: 5,
	},
	containerSemFavoritos: {
		display: 'flex',
		justifyContent: 'center',
		width: '50%',
		height: 520,
	},
	SemFavorito: {
		fontWeight: '600',
		fontSize: 24,
		textAlign: 'center',
		color: 'white',
	},
});
