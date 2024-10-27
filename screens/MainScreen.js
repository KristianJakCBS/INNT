import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { getDatabase, ref, get } from "firebase/database"; 
import RengøringsMedarbejderScreen from "./RengøringsMedarbejder"
import KontrollørScreen from "./Kontrollør"
import IndkøbsansvarligScreen from './Indkøbsansvarlig';
import AdminScreen from './AdminScreen';

export default function MainScreen() {
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);
    let auth = getAuth();

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            Alert.alert("Logged out", "You have been logged out successfully.");
            console.log("logged out successfully")
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    useEffect(() => {
        auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const db = getDatabase();
                const usersRef = ref(db, "Users");
                const snapshot = await get(usersRef);
                if (snapshot.exists()) {
                    const usersData = snapshot.val();
                    const foundUser = Object.values(usersData).find(u => u.email === user.email);
                    if (foundUser) {
                        setUserData(foundUser);
                    } else {
                        Alert.alert("No user found with the given mail")
                        handleLogOut()
                    }
                } else {
                    console.log("No data available.");
                }
            }
        });

        return () => unsubscribe();
    }, [auth]);

    if (user && userData) {
        console.log(user);
        
        if (userData.userType === 'Kontrollør') {
            return (
                <KontrollørScreen params={{ user, userData, handleLogOut }} />
            );
        } else if (userData.userType === 'Rengøringsmedarbejder') {
            return (
                <RengøringsMedarbejderScreen params={{ user, userData, handleLogOut }} />
            );
        } else if (userData.userType === 'Indkøbsansvarlig') {
            return (
                <IndkøbsansvarligScreen params={{ user, userData, handleLogOut }} />
            );
        } else if (userData.userType === 'Admin') {
            return (
                <AdminScreen params = {{ user, userData, handleLogOut }}/>
            );
        } else {
            return (
                <View style={styles.overlay}>
                    <Text style={styles.header}>Unknown user type</Text>
                    <Button onPress={handleLogOut}> Log ud</Button>
                </View>
            );
        };
    };
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20, // Added padding on the sides
    },
    headerContainer: {
        marginTop: 100,
        marginBottom: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    infoContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        width: '80%',
        alignItems: 'center',
    },
    logOutButton: {
        width: '100%',
    }
});