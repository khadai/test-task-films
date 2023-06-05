import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowList from './pages/ShowList';
import ShowDetails from './pages/ShowDetails';
import { Provider } from 'react-redux';
import store from './redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="ShowList">
                    <Stack.Screen name="ShowList" component={ShowList} />
                    {/* @ts-ignore*/}
                    <Stack.Screen name="ShowDetails" component={ShowDetails} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
