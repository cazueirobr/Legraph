import { View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

import EditHeader from '../../components/Headers/EditHeader';
import Inputs from '../../components/forms/Inputs';
import Buttons from '../../components/forms/Buttons';
import useAuth from '../../firebase/hooks/useAuth';
import useCollection from '../../firebase/hooks/useCollection';
import { useRouter } from 'expo-router';

export default function EditUser() {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickName] = useState('');

  const { getById, loading: docLoading } = useCollection('Accounts');

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
      (async () => {
        try {
          const userData = await getById(user.email);
          console.log('UserData:', userData);
          if (userData && userData.nickName) {
            setNickName(userData.nickName);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      })();
    }
  }, [user]);

  if (authLoading || docLoading) {
    return <Text>Loading...</Text>;
  }

  const handlePress = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <View>
      <ScrollView>
        <EditHeader />
        <Inputs
          backgroundColor='#77889E'
          title='e-mail'
          value={email}
          onChangeText={setEmail}
        />
        <Inputs
          backgroundColor='#77889E'
          title='senha'
          value={password1}
          onChangeText={setPassword1}
        />
        <Inputs
          backgroundColor='#77889E'
          value={password2}
          onChangeText={setPassword2}
        />
        <Inputs
          backgroundColor='#77889E'
          title='Nickname#TAG'
          value={nickname}
          onChangeText={setNickName}
        />
        <Buttons
          backgroundColor='#7FDBE0'
          title='Atualizar'
          onPress={handlePress}
        />
        <Buttons
          backgroundColor='#7FDBE0'
          title='logout'
          onPress={handlePress}
        />
      </ScrollView>
    </View>
  );
}
