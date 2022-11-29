import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { api } from '../../API/tmdbApi';

export const CarrosselFilmes = ({ tipoLista }) => {
	const [filmes, setFilmes] = React.useState();

	React.useEffect(() => {
		async function carregaFilmes() {
			const response = await api.get('movie/now_playing', {
				params: {
					page: 1,
				},
			});
			setFilmes(response.data.results.slice(0, 10));
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
								<ImageBackground
									id={filme.id}
									style={styles.imagemFilme}
									source={{ uri: `https://image.tmdb.org/t/p/original${filme.poster_path}` }}>
									<Image />
								</ImageBackground>
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
