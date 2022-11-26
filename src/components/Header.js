import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ pagina }) => {
	return (
		<View style={styles.container}>
			{pagina === 'home' ? (
				<Text style={styles.textoTitulo}>globoplay</Text>
			) : (
				<Text style={styles.textoMinhaLista}>Minha Lista</Text>
			)}
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		height: 80,
		width: '100%',
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textoTitulo: {
		fontSize: 25,
		fontWeight: 'bold',
		color: 'white',
	},
	textoMinhaLista: {
		flex: 1,
		alignItems: 'flex-start',
		fontSize: 14,
		fontWeight: '600',
		color: 'white',
	},
});
