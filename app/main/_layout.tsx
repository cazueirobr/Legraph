import { Tabs } from 'expo-router';

export default function Layout() {
  return <Tabs >
     <Tabs.Screen name="mainPage" options={{headerShown: false}}></Tabs.Screen>
     <Tabs.Screen name="editUserPage" options={{headerShown: false}}></Tabs.Screen>
  </Tabs>;
}