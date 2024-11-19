import { Tabs } from 'expo-router';


export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'index',
          headerShadowVisible: false,
          headerTitle: "index",
          headerTitleAlign: 'left'
        }}
        
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          headerShadowVisible: false,
          headerTitle: "profile",
          headerTitleAlign: 'left',
        }}
      />
    </Tabs>
  );
}
