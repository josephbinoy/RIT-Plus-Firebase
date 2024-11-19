import { SafeAreaView } from "react-native-safe-area-context";

  export default function Index() {
    console.log('rendered landing');
    return (
        <SafeAreaView style = {{flex:1, backgroundColor: '#24222a'}}>
        </SafeAreaView>
      );
}