import { View, Text, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

import EditHeader from '../../components/Headers/EditHeader';
import Inputs from '../../components/forms/Inputs';
import Buttons from '../../components/forms/Buttons';
import useAuth from '../../firebase/hooks/useAuth';
import useCollection from '../../firebase/hooks/useCollection';
import { useRouter } from 'expo-router';
import { updateEmail, updatePassword, User } from 'firebase/auth';

export default function EditUser() {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [nickname, setNickName] = useState<string>('');

  const { getById, update, loading: docLoading } = useCollection('Accounts');

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
      (async () => {
        try {
          const userData = await getById(user.email as string);
          if (userData && userData.nickName) {
            setNickName(userData.nickName);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      })();
    }
  }, [user]);

  const handleUpdate = async () => {
    if (password1 !== password2) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      if (password1 && password1.length >= 6) {
        await updatePassword(user as User, password1);
      }

      if (email !== user?.email) {
        await updateEmail(user as User, email);
      }

      const updatedData = { nickName: nickname };
      await update(user?.email as string, updatedData);

      Alert.alert('Sucesso', 'Informações do usuário atualizadas');
    } catch (error) {
      console.error('Falha ao atualizar usuário:', error);
      Alert.alert('Erro', 'Falha ao atualizar as informações do usuário');
    }
  };

  if (authLoading || docLoading) {
    return <Text>loading...</Text>;
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Falha ao fazer logout:', error);
    }
  };

  return (
    <View>
      <ScrollView>
        <EditHeader />
        <Inputs
          backgroundColor='#77889E'
          title='E-mail'
          value={email}
          onChangeText={setEmail}
        />
        <Inputs
          backgroundColor='#77889E'
          title='Senha'
          value={password1}
          onChangeText={setPassword1}
          password={true}
        />
        <Inputs
          backgroundColor='#77889E'
          title='Confirme a senha'
          value={password2}
          onChangeText={setPassword2}
          password={true}
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
          onPress={handleUpdate}
        />
        <Buttons
          backgroundColor='#7FDBE0'
          title='Logout'
          onPress={handleLogout}
        />
      </ScrollView>
    </View>
  );
}
