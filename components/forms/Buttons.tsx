import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'

interface sendButtonProps{
    BackgroundColor : string,
    title : string
}

export default function Buttons({BackgroundColor, title}: sendButtonProps) {
    const styles = StyleSheet.create({
        container: {
          marginTop: 60,
          flex: 0,
          justifyContent: 'center',
          alignItems: 'center',
        },
        button: {
          backgroundColor: BackgroundColor, // Cor de fundo do botão
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderRadius: 5,
          width: '30%',
          height: 60
        },
        buttonText: {
          fontFamily: 'Radio Canada',
          fontWeight: 'bold',
          textAlign: 'center',
          textAlignVertical: 'center',
          color: 'black', // Cor do texto do botão
          fontSize: 13,
        },
      });
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => console.log("Botão pressionado")}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

