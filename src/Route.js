import React from 'react';
import MyList from './pages/MyList';
import Home from './pages/HomePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Highlights from './pages/Highlights';

const Stack = createNativeStackNavigator();

const Route = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				options={{ headerShown: false }}
				component={Home}
			/>
			<Stack.Screen
				name="MyList"
				options={{ headerShown: false }}
				component={MyList}
			/>
			<Stack.Screen
				name="Highlights"
				options={{ headerShown: false }}
				component={Highlights}
			/>
		</Stack.Navigator>
	);
};

export default Route;
