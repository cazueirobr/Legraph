import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;

export default function LoginHeader() {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require("../../assets/headerImages/loginHeader.jpg")}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        flex: 0,

    },
    logo: {
        width: windowWidth,
        height: 200,
    }
})