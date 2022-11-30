import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FavsContext } from '../contexts/FavsContext';

const MyList = () => {
	const { favoritos } = React.useContext(FavsContext);

	if (favoritos.length > 0) {
		return (
			<View style={styles.container}>
				<Header pagina={'minha lista'} />
				<ScrollView
					scrollEnabled={true}
					vertical={true}
					style={styles.filmeContainer}>
					{favoritos.map((filme) => {
						return (
							<ImageBackground
								id={filme.id}
								style={styles.imagemFilme}
								source={{ uri: `https://image.tmdb.org/t/p/original${filme.poster_path}` }}>
								<Image />
							</ImageBackground>
						);
					})}
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
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: '#222',
		alignItems: 'center',
		justifyContent: 'center',
	},
	myListContainer: {
		width: '100%',
		height: 420,
	},
	filmeContainer: {
		flex: 1,
		width: '100%',
		flexWrap: 'wrap',
	},
	imagemFilme: {
		width: 150,
		height: 200,
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
