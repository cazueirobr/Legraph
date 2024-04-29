import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRouter } from 'expo-router';

interface SendButtonProps {
  backgroundColor: string;
  title: string;
  linkTo: string;
}

export default function Button({ backgroundColor, title, linkTo }: SendButtonProps) {
  const styles = StyleSheet.create({
    container: {
      marginTop: 60,
      flex: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: backgroundColor, // Cor de fundo do botão
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

  const router = useRouter();

  const handlePress = () => {
    router.push(linkTo);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
