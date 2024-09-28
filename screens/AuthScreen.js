import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpComponent from '../components/SignUpComponent';
import LogInComponent from '../components/LogInComponent';

const Tab = createBottomTabNavigator();

export default function AuthScreen() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name = "Log ind" component={LogInComponent}/>
            <Tab.Screen name = "Sign up" component={SignUpComponent}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  componentsBox: {
    width: '90%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  }
});