import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const Footer = () => {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button}>
				<Text style={styles.textoButton}>Inicio</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button}>
				<Text style={styles.textoButton}>Minha Lista</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Footer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: '#000',
		width: '100%',
		height: 70,
	},
	button: {
		flex: 1,
		flexDirection: 'column',
		padding: 10,
	},
	textoButton: {
		color: '#fff',
		textAlign: 'center',
	},
});
