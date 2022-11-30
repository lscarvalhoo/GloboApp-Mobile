import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
	const navigate = useNavigation();

	function abriHome() {
		navigate.navigate('Home');
	}

	function abriMyList() {
		navigate.navigate('MyList');
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={abriHome}
				style={styles.button}>
				<Entypo
					name="home"
					size={25}
					color="white"
				/>
				<Text style={styles.textoButton}>Inicio</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={abriMyList}>
				<AntDesign
					name="star"
					size={24}
					color="white"
				/>
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
		justifyContent: 'center',
		backgroundColor: '#000',
		width: '100%',
		height: '40%',
	},
	button: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textoButton: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 16,
		fontWeight: '500',
		paddingTop: 6,
	},
});
