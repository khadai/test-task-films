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
                    <Stack.Screen name="ShowList" component={ShowList} options={{ title: 'Show List' }} />
                    <Stack.Screen
                        name="ShowDetails"
                        //@ts-ignore
                        component={ShowDetails}
                        options={{ title: 'Show Details' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
