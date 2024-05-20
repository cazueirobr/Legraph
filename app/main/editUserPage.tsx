import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'


import EditHeader from '../../components/Headers/EditHeader'
import Inputs from '../../components/forms/Inputs'
import Buttons from '../../components/forms/Buttons'
import useAuth from '../../firebase/hooks/useAuth'

export default function Register() {

  const { user, login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickName] = useState('blabla#23');

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  console.log(email);

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
