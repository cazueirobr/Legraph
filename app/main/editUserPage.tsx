import { View, Text, ScrollView } from 'react-native'
import React from 'react'


import EditHeader from '../../components/Headers/EditHeader'
import Inputs from '../../components/forms/Inputs'
import Buttons from '../../components/forms/Buttons'

export default function register() {
  return (
    <View>
      <ScrollView>
        <EditHeader></EditHeader>
        <Inputs backgroundColor='#77889E' title='e-mail'></Inputs>
        <Inputs backgroundColor='#77889E' title='senha'></Inputs>
        <Inputs backgroundColor='#77889E'></Inputs>
        <Inputs backgroundColor='#77889E' title='Nickname#TAG'></Inputs>
        <Buttons backgroundColor='#7FDBE0' title='Atualizar' linkTo='mainPage'></Buttons>
      </ScrollView>
    </View>
  )
}