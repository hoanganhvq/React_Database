import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, TextInput, ActivityIndicator, TouchableOpacity , Alert} from 'react-native'
import { addUser } from '../handleAPI/viewAPI';
import { SafeAreaView } from 'react-native-safe-area-context';
const AddUser = ({ navigation, route }) => {

    const[name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("");
    const addUserOut = async ()=>{
        try{
            const respone = await addUser(name, email, phone, password);
            Alert.alert("User added");
            navigation.goBack();
        } catch(error){
            Alert.alert("Error", "Failed to add user. Please try again later.");
        }
    }
    return (
        <SafeAreaView style={styles.container}>
             <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={(text)=>setName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={(text)=>setEmail(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone:</Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={(text)=>setPhone(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password:</Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={(text)=>setPassword(text)}
                />
            </View>

            <TouchableOpacity style={styles.updateButton} onPress={()=>{addUserOut()}}>
                <Text style={styles.updateText}>Add</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default AddUser;


const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    updateButton:{
        width:140,
        backgroundColor: '#006BFF',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignSelf:'center', 
    },
    updateText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});