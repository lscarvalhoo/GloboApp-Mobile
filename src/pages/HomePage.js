import React from 'react';
import Header from '../components/Header';
import { View, StyleSheet, ScrollView } from 'react-native';
import Footer from '../components/Footer';
import CarrosselFilmes from '../components/CarrosselFilme';

const Home = () => {
	return (
		<View style={styles.container}>
			<Header pagina={'home'} />
			<ScrollView style={styles.filmeContainer}>
				<CarrosselFilmes tipoLista={'Filmes'} />
				<CarrosselFilmes tipoLista={'Series'} />
			</ScrollView>
			<Footer />
		</View>
	);
};

export default Home;

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
	filmeContainer: {
		flexDirection: 'column',
		height: 420,
	},
	texto: {
		padding: 5,
		fontSize: 16,
		color: '#fff',
		fontWeight: 'bold',
	},
});
