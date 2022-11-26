import React from 'react';
import Header from '../components/Header';
import { View, Text, StyleSheet } from 'react-native';
import { api } from '../../API/tmdbApi';
import Footer from '../components/Footer';

const Home = () => {
	const [filmes, setFilmes] = React.useState();

	React.useEffect(() => {
		async function loadFilmes() {
			const response = await api.get('movie/now_playing', {
				params: {
					page: 1,
				},
			});
			setFilmes(response.data.results.slice(0, 10));
		}

		loadFilmes();
	}, []);

	return (
		<View style={styles.container}>
			<Header pagina={'home'} />
			{filmes &&
				filmes.map((filme) => {
					return (
						<View
							style={styles.filmeContainer}
							id={filme.id}>
							<Text style={styles.texto}>{filme.title}</Text>
						</View>
					);
				})}
			<Footer />
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 100,
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: '#222',
		alignItems: 'center',
		justifyContent: 'center',
	},
	filmeContainer: {
		flex: 1,
		height: 100,
	},
	texto: {
		fontSize: 16,
		color: '#fff',
		fontWeight: 'bold',
		padding: 5,
	},
});
