import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import FavsProvider from './src/contexts/FavsContext';
import Home from './src/pages/HomePage';

export default function App() {
	return (
		<NavigationContainer>
			<FavsProvider>
				<StatusBar style="auto" />
				<Home />
			</FavsProvider>
		</NavigationContainer>
	);
}
