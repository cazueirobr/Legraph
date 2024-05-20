import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import useLoadFonts from '../../googleFonts/hooks/useLoadFonts';
import { SplashScreen } from 'expo-router';

interface inputProps{
    backgroundColor : string
    title ?: string,
    password ?: boolean,
    value: string,
    onChangeText: (text:string) => void, 
}
SplashScreen.preventAutoHideAsync();

export default function Inputs({backgroundColor, title, password, value, onChangeText} : inputProps) {

  const { fontsLoaded, onLayoutRootView } = useLoadFonts();

  if(!fontsLoaded)
    return null;
  return (
    <View onLayout={onLayoutRootView}>
      <Text style={styles.titleInput}>{title}</Text>  
      <TextInput style={[styles.input, {backgroundColor: backgroundColor}]}  secureTextEntry={password} value={value} onChangeText={onChangeText}></TextInput>
    </View>
  )


}

const styles = StyleSheet.create({
  input: {
    height: 60,
    marginLeft: 12,
    marginTop: 5,
    borderRadius: 20,
    padding: 10,
    width: 350
  },
  titleInput: {
      fontFamily: 'Radio_Canada',
      fontWeight: 'bold',
      marginLeft: 25,
      marginTop: 15,
    },
});