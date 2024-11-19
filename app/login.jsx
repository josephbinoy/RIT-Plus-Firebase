import { Alert, ActivityIndicator, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { router } from 'expo-router';

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: 'teal',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});

export default function Login() {
  const [usn, setUsn] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);
    try {
      console.log('signing in');
      console.log(usn, dob);
      
      await signInWithEmailAndPassword(auth, usn+'@msrit.edu', dob);
      setLoading(false);
      router.replace('/(tabs)')
    } catch (error) {
      setLoading(false); 
      Alert.alert('Error', error.message);  
    }
    setDob('');
    setUsn('');
  }

  return(
    <SafeAreaView style = {{flex:1}}>
        <ScrollView>
            <Text>please enter usn and dob</Text>
            <TextInput 
              placeholder='USN' 
              onChangeText={setUsn} 
              value={usn} 
            />
            <TextInput 
              placeholder='Password' 
              onChangeText={setDob} 
              value={dob} 
            />
          <TouchableOpacity onPress={signIn} style={buttonStyles.button}>
            {loading ? <ActivityIndicator animating={loading}/>:<Text>Login</Text>}
          </TouchableOpacity>
        </ScrollView>         
    </SafeAreaView>
  )}
