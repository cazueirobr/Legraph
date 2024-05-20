import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import RegisterHeader from '../components/Headers/RegisterHeader'
import Inputs from '../components/forms/Inputs'
import Buttons from '../components/forms/Buttons'
import useAuth from '../firebase/hooks/useAuth'
import useCollection from '../firebase/hooks/useCollection'
import { Account } from '../firebase/hooks/useDocument'
import { router } from 'expo-router'

export default function register() {

const { user, registerUser, loading } = useAuth();
const { data, create, remove, refreshData} = useCollection<Account>('Accounts');

  
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickName] = useState('');

  //          <Inputs backgroundColor='#A22C09' title='Nickname#TAG'></Inputs>
  const registerPress = async () => {
    if (password1 === password2) {
      try {
        await registerUser(email, password1);
        await create({nickName: nickname}, email);  // Passa o e-mail junto com o nickname.
        await refreshData();
        Alert.alert("Conta criada!")
        router.push("/");

      } catch (error: any) {
        Alert.alert("Login error", error.toString());
      }
    }
  }

  return (
    <View>
        <ScrollView>
          <RegisterHeader></RegisterHeader>
          <Inputs backgroundColor='#A22C09' title='e-mail' value={email} onChangeText={setEmail}></Inputs>
          <Inputs backgroundColor='#A22C09' title='senha' value={password1} onChangeText={setPassword1} password={true}></Inputs>
          <Inputs backgroundColor='#A22C09' title='Confirmar senha' value={password2} onChangeText={setPassword2} password={true}></Inputs>
          <Inputs backgroundColor='#A22C09' title='Nickname#TAG' value={nickname} onChangeText={setNickName}></Inputs>
          <Buttons backgroundColor='#7379FE' title='CADASTRAR' onPress={registerPress}></Buttons>
        </ScrollView>
    </View>
  )
}