import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { SplashScreen, useNavigation, useRouter } from 'expo-router';
import useLoadFonts from '../../googleFonts/hooks/useLoadFonts';

interface SendButtonProps {
  backgroundColor: string;
  title: string;
  onPress: () => void
}

SplashScreen.preventAutoHideAsync();



export default function Button({ backgroundColor, title, onPress }: SendButtonProps) {

  const { fontsLoaded, onLayoutRootView } = useLoadFonts();

  if(!fontsLoaded)
    return null;
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <TouchableOpacity style={[styles.button, {backgroundColor: backgroundColor}]} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {

    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    width: '30%',
    height: 60
  },
  buttonText: {
    fontFamily: 'Radio_Canada_Medium',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    fontSize: 13,
  },
});