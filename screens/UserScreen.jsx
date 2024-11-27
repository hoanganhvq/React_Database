import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, TextInput, ActivityIndicator, TouchableOpacity , Alert} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { findUserById, deleteUserOut, update } from '../handleAPI/viewAPI';
const UserScreen = ({ navigation, route }) => {

    const { id } = route.params;
    const[name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        setLoading(true);
        try{
            const respone = await findUserById(id);
            setUser(respone);
            console.log(respone);
        } catch(error){
            console.error(error);
            
        } finally{
            setLoading(false);
        }
    }
    const deleteUser = async ()=>{
        setLoading(true);
        try{
            const respone = await deleteUserOut(id);
            Alert.alert("User deleted successfully");
            navigation.goBack();
        } catch(error){
            console.error(error);
            Alert.alert("Failed to delete user");
        } finally{
            setLoading(false);
        }
    }

    const updateUser = async () => {
    
        setLoading(true);
      try{
        const respone = await update(id, name, email, phone);
        Alert.alert("User updated successfully");
        navigation.goBack();
      }catch(error){
        console.log(error);
      } finally{
        setLoading(false);
      }
    };
    
    useEffect(() => {
        fetchUser();
        console.log("user", user);
    }, [])
    
    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#006BFF" />
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
             <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder={user?.name} 
                    onChangeText={(text)=>setName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder={user?.email} 
                    onChangeText={(text)=>setEmail(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone:</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder={user?.phone} 
                    onChangeText={(text)=>setPhone(text)}
                />
            </View>

            <TouchableOpacity style={styles.updateButton} onPress={()=>{updateUser()}}>
                <Text style={styles.updateText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={()=>{deleteUser()}}>
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default UserScreen;


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
    },
    deleteButton:{
        width:140,
        backgroundColor: '#FF0000',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignSelf:'center',
    },
    deleteText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});