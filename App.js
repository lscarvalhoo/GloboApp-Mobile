import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import FavsProvider, { FavsContext } from './src/contexts/FavsContext';
import Route from './src/Route';

export default function App() {
	return (
		<NavigationContainer>
			<FavsProvider>
				<StatusBar style="auto" />
				<Route />
			</FavsProvider>
		</NavigationContainer>
	);
}
