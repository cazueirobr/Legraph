import { ScrollView, StyleSheet, Text, View } from "react-native";
import Inputs from "../components/forms/Inputs";
import LoginHeader from "../components/Headers/LoginHeader";
import { Link } from "expo-router";
import Buttons from "../components/forms/Buttons";


export default function Page() {
  return (
    <View>
      <ScrollView>
      <View style={styles.header}>
        <LoginHeader></LoginHeader>
      </View>
        <Inputs backgroundColor="#C9A46C" title="E-mail"></Inputs>
        <Inputs backgroundColor="#C9A46C" title="Senha" password={true}></Inputs>
        <Buttons backgroundColor="#FE7392" title="Entrar" linkTo="main/mainPage"></Buttons>

        <Text style={styles.text}>Não tem uma conta?<Link style={styles.linkText} href="/register">Clique aqui!</Link> </Text>
      </ScrollView>
      </View>

  );
}

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