import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Inputs from "../components/forms/Inputs";
import LoginHeader from "../components/Headers/LoginHeader";
import { Link, useRouter } from "expo-router";
import Buttons from "../components/forms/Buttons";
import { useState } from "react";
import useAuth from "../firebase/hooks/useAuth";




export default function Page() {
  
  const { user, login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const handlePress = 
    async () => {
      try {
        await login(email, password);
        router.push("main/mainPage");
      } catch (error: any) {
        Alert.alert("Login error", error.toString());
      }
    }

  return (
    <View>
      <ScrollView>
      <View style={styles.header}>
        <LoginHeader></LoginHeader>
      </View>
        <Inputs backgroundColor="#C9A46C" title="E-mail" value={email} onChangeText={setEmail}></Inputs>
        <Inputs backgroundColor="#C9A46C" title="Senha" password={true} value={password} onChangeText={setPassword}></Inputs>
        <Buttons backgroundColor="#FE7392" title="Entrar" onPress={handlePress}></Buttons>

        <Text style={styles.text}>Não tem uma conta?<Link style={styles.linkText} href="/register">Clique aqui!</Link> </Text>
      </ScrollView>
      </View>

  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    textAlign: 'center', 
  },
  linkText: {
    color: 'blue',
  },
  header: {
    marginBottom: 100,
  }
})