import { Image, Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, getDoc, collection, collectionGroup, onSnapshot, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from '../../firebaseConfig';

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

export default function Home() {
  console.log('rendered tabs home');
  
  const user = auth.currentUser;
  const [info, setInfo] = useState('');
  const [posts, setPosts] = useState([]);

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileRef = ref(storage, `posts/${user.uid}-${Date.now()}`);
    await uploadBytes(fileRef, blob);
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await getDownloadURL(fileRef);
  }

  const uploadPost = async () => {
    try {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
      const uploadUrl = await uploadImageAsync(pickerResult.assets[0].uri);
      const userRef = doc(db, "users", user.uid);
      const postsCollectionRef = collection(userRef, 'posts');
      await addDoc(postsCollectionRef, {
        title: 'upload_test_image_picker',
        image_url: uploadUrl,
      });
      console.log('Post uploaded successfully');
    } catch (error) {
      alert("Upload failed, sorry :(");
      console.error('Error uploading post: ', error);
    }
  }

  useEffect(() => {
    async function getContent(){
      try {
        const userRef = doc(db, "users", user.uid);
        const userInfo = await getDoc(userRef)
        if (userInfo.exists()) {
          const data= userInfo.data();
          const lname = data.lname;
          const fname = data.fname;
          setInfo(fname +' '+lname);
          userDetails = data;
        } else {
          console.log("No such document!");
        }
        const postsQuery = collectionGroup(db, 'posts');
        onSnapshot(postsQuery, (snapshot) => {
          setPosts(snapshot.docs.map(doc => doc.data()));
        });
      } catch (error) {
        console.error("Error getting document:", error);
      }
    }
    if (auth.currentUser)
      getContent();      
  }, [auth]);

  return(
    <SafeAreaView style = {{flex:1}}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <TouchableOpacity onPress={uploadPost} style = {buttonStyles.button}>
            <Text>Upload Post</Text>
          </TouchableOpacity>
          <Text>
              {info}
            </Text>
            {posts.map((post, idx) => 
              <View key ={idx}>
                <Text style = {{marginHorizontal: 'auto'}}>{post.title} </Text>
                <Image source={{ uri: post.image_url }} style={{ width: 300, height: 300, marginHorizontal: 'auto' }} ></Image>
              </View>
            )}
        </ScrollView>       
    </SafeAreaView>
  )}
