import { StyleSheet, Text, View } from "react-native";
import Inputs from "../components/forms/Inputs";
import LoginHeader from "../components/Headers/LoginHeader";
import { Link } from "expo-router";
import Buttons from "../components/forms/Buttons";


export default function Page() {
  return (
    <View>
      <View style={styles.header}>
        <LoginHeader></LoginHeader>
      </View>
        <Inputs backgroundColor="#C9A46C" title="E-mail"></Inputs>
        <Inputs backgroundColor="#C9A46C" title="Senha" password={true}></Inputs>
        <Buttons BackgroundColor="#FE7392" title="Entrar"></Buttons>
        <Link href="main/mainPage">paginja principal</Link>
        <Text style={styles.text}>Não tem uma conta?<Link style={styles.linkText} href="/register">Clique aqui!</Link> </Text>
      </View>

  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    textAlign: 'center', // Centraliza horizontalmente
  },
  linkText: {
    color: 'blue',
  },
  header: {
    marginBottom: 100,
  }
})