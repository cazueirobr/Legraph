import { View, Text } from 'react-native'
import React from 'react'
import RegisterHeader from '../components/Headers/RegisterHeader'
import Inputs from '../components/forms/Inputs'
import Buttons from '../components/forms/Buttons'

export default function register() {
  return (
    <View>
        <RegisterHeader></RegisterHeader>
        <Inputs backgroundColor='#A22C09' title='e-mail'></Inputs>
        <Inputs backgroundColor='#A22C09' title='senha'></Inputs>
        <Inputs backgroundColor='#A22C09'></Inputs>
        <Inputs backgroundColor='#A22C09' title='Nickname#TAG'></Inputs>
        <Buttons BackgroundColor='#7379FE' title='CADASTRAR'></Buttons>

    </View>
  )
}