import { View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

import EditHeader from '../../components/Headers/EditHeader';
import Inputs from '../../components/forms/Inputs';
import Buttons from '../../components/forms/Buttons';
import useAuth from '../../firebase/hooks/useAuth';
import useCollection from '../../firebase/hooks/useCollection'; // Certifique-se de importar o hook

export default function EditUser() {
  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickName] = useState('');

  const { getById, loading: docLoading } = useCollection('Accounts');

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
      (async () => {
        const userData = await getById(email);
        if (userData && userData.nickName) {
          setNickName(userData.nickName);
        }
      })();
    }
  }, [user]);

  if (authLoading || docLoading) {
    return <Text>Loading...</Text>;
  }

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
          linkTo='mainPage'
        />
      </ScrollView>
    </View>
  );
}
