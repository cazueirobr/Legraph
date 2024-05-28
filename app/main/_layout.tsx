import { Tabs } from 'expo-router';
import { Icon } from 'react-native-elements';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="mainPage"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="font-awesome" color={color} size={size} />
          ),
          tabBarLabel: "Home",
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="editUserPage"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" type="font-awesome" color={color} size={size} />
          ),
          tabBarLabel: "Editar usuário",
          unmountOnBlur: true,
        }}
      />
    </Tabs>
  );
}
