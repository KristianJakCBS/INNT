import {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location'

export default function RengøringsMedarbejderScreen({ params }) {
    const user = params.user
    const userData = params.userData;
    const handleLogOut = params.handleLogOut;

    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Location loading...');
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
    const [addressFound, setAddressFound] = useState(false);

    useEffect(()=>{
        checkIfLocationEnabled();
        getCurrentLocation();
    },[]);

    const handleScan = () => {
        if (addressFound) {
            Alert.alert('Chip scanned at location: ' + displayCurrentAddress);
        } else {
            Alert.alert('Address not found yet, please try again in a moment.');
        }
    };

    const checkIfLocationEnabled= async ()=>{
        let enabled = await Location.hasServicesEnabledAsync();
        if(!enabled){
            Alert.alert('Location not enabled', 'Please enable your Location', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        } else {
            setLocationServicesEnabled(enabled);
        }
    }

    const getCurrentLocation= async ()=>{
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
            Alert.alert('Permission denied', 'Allow the app to use the location services', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        }

        const {coords} = await Location.getCurrentPositionAsync();
        if(coords){
            const {latitude,longitude} = coords;
            let response = await Location.reverseGeocodeAsync({ latitude, longitude });
            for(let item of response){
                let address = `${item.name} ${item.city} ${item.postalCode}`;
                setDisplayCurrentAddress(address);
                setAddressFound(true);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rengøringsmedarbejder-Screen</Text>
            <View style={styles.userInfo}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{userData.displayName}</Text>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{userData.email}</Text>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.label}>Medarbejder Type:</Text>
                <Text style={styles.value}>{userData.userType}</Text>
            </View>
            <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
                <Text style={styles.scanButtonText}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogOut}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    userInfo: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
    },
    value: {
        fontSize: 18,
        fontWeight: '400',
        color: '#777',
        marginLeft: 10,
    },
    button: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    scanButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#28a745',
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 20,
        alignSelf: 'center',
    },
    scanButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
