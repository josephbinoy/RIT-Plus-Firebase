import { Text, View, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig'

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

export default function Profile() {
  return(
    <SafeAreaView style = {{flex:1, backgroundColor: '#24222a'}}>
        <ScrollView showsVerticalScrollIndicator={true}>
            <View>
              <Text>Bye</Text>
              <TouchableOpacity 
                onPress={async ()=>
                {
                  try {
                    await signOut(auth);
                    console.log('signout successful');
                  } catch (e){
                    console.log(e);
                  } 
                  }
                }
                style={buttonStyles.button}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>            
    </SafeAreaView>
  )}
