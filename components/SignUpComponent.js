import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, push } from "firebase/database"; 

export default function SignUpComponent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('')
    const [isCompleted, setCompleted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const auth = getAuth();

    const userTypes = [
        {key: '1', value: 'Rengøringsmedarbejder'},
        {key: '2', value: 'Kontrollør'},
        {key: '3', value: 'Indkøbsansvarlig'},
        {key: '4', value: 'Admin'}
    ]

    const db = getDatabase();
    const initialState = {
        email: '',
        userType: '',
        displayName: ''
    };

    const [userTypeData, setUserTypeData] = useState(initialState);

    const handleSubmit = async () => {
        const lowerCaseEmail = email.toLowerCase();
        await createUserWithEmailAndPassword(auth, lowerCaseEmail, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const usersRef = ref(db, "/Users/");
                const userTypeData = {
                    email: lowerCaseEmail,
                    userType,
                    displayName: name
                };

                return push(usersRef, userTypeData)
                    .then(() => {
                        Alert.alert("Saved");
                        setUserTypeData(initialState);
                    })
                    .catch((error) => {
                        console.error(`Error: ${error.message}`);
                    })
                    .then(() => {
                        return updateProfile(user, {
                            displayName: name,
                        });
                    });
            })
            .then(() => {
                console.log("user created!");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sign up</Text>
            <TextInput
                style={styles.input}
                placeholder="name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            <View style={styles.pickerContainer}>
                <SelectList
                    setSelected={(val) => setUserType(val)}
                    data={userTypes}
                    save="value"
                    placeholder='Select user type'
                    dropdownStyles={styles.dropdown}
                    search={false} 
                    animation={{ duration: 10 }}
                />
            </View>
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                Create user
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 10,
        zIndex: 1, // Ensure the container has a base zIndex
    },
    header: {
        fontSize: 24,
    },
    error: {
        color: 'red',
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
    },
    pickerContainer: {
        width: 200,
        height: 50, // Fixed height for the container
        zIndex: 3, // Ensure the picker container has a higher zIndex
    },
    selectList: {
        width: 200,
    },
    dropdown: {
        position: 'absolute',
        top: 35, // Position the dropdown below the picker container
        width: 200,
        zIndex: 4, // Ensure the dropdown has the highest zIndex
        backgroundColor: 'white'
    },
});
