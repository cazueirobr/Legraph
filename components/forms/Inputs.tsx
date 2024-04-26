import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

interface inputProps{
    backgroundColor : string
    title ?: string,
    password ?: boolean
}

export default function Inputs({backgroundColor, title, password} : inputProps) {
    const styles = StyleSheet.create({
        input: {
          height: 60,
          marginLeft: 12,
          marginTop: 5,
          borderRadius: 20,
          padding: 10,
          backgroundColor: backgroundColor,
          width: 350
        },
        titleInput: {
            fontFamily: 'Radio Canada',
            fontWeight: 'bold',
            marginLeft: 25,
            marginTop: 15,
          },
      });


  return (
    <View>
      <Text style={styles.titleInput}>{title}</Text>  
      <TextInput style={styles.input} secureTextEntry={password}></TextInput>
    </View>
  )


}