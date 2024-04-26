import React, { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

interface Partida {
    id: string;
    personagem: any; 
    mortes: number;
    abates: number;
    assistencias: number;
    cs: number;
    kda: string;
    ranqueada: string;
    vitoria: boolean;
  }

const partidaData = [
  { id: '1', personagem: require('../../assets/headerImages/personagem1.jpg'), mortes: 5, abates: 10, assistencias: 8, cs: 200, kda: '10/5/8', ranqueada: 'Solo', vitoria: true },
  { id: '2', personagem: require('../../assets/headerImages/personagem2.jpg'), mortes: 3, abates: 12, assistencias: 6, cs: 240, kda: '12/3/6', ranqueada: 'Duo', vitoria: false },
  { id: '3', personagem: require('../../assets/headerImages/personagem2.jpg'), mortes: 3, abates: 12, assistencias: 6, cs: 240, kda: '12/3/6', ranqueada: 'Duo', vitoria: false },
  { id: '4', personagem: require('../../assets/headerImages/personagem2.jpg'), mortes: 3, abates: 12, assistencias: 6, cs: 240, kda: '12/3/6', ranqueada: 'Duo', vitoria: false },
  { id: '5', personagem: require('../../assets/headerImages/personagem2.jpg'), mortes: 3, abates: 12, assistencias: 6, cs: 240, kda: '12/3/6', ranqueada: 'Duo', vitoria: false },
  { id: '6', personagem: require('../../assets/headerImages/personagem2.jpg'), mortes: 3, abates: 12, assistencias: 6, cs: 240, kda: '12/3/6', ranqueada: 'Duo', vitoria: false },
  { id: '7', personagem: require('../../assets/headerImages/personagem2.jpg'), mortes: 3, abates: 12, assistencias: 6, cs: 240, kda: '12/3/6', ranqueada: 'Duo', vitoria: false },
  { id: '8', personagem: require('../../assets/headerImages/personagem2.jpg'), mortes: 3, abates: 12, assistencias: 6, cs: 240, kda: '12/3/6', ranqueada: 'Duo', vitoria: false },
];


const PartidaItem = ({ item }: { item: Partida }) => (
  <View style={[styles.container, { backgroundColor: item.vitoria ? '#B3C7F8' : '#F8B3B3' }]}>
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <Image source={item.personagem} style={styles.imagem} />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.abates}/{item.mortes}/{item.assistencias}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Vitória: {item.vitoria ? 'Sim' : 'Não'}</Text>
        </View>
        <Text style={{ marginBottom: 5 }}>KDA: {item.kda}</Text>
        <Text>CS: {item.cs}</Text>
      </View>
    </View>

    <View style={styles.bottomContainer}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Ranqueada: {item.ranqueada}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  imagem: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 10,
    marginTop: 5,
  },
});

const GamesScoreBoard = () => {
  return (
    <FlatList
      data={partidaData}
      renderItem={({ item }) => <PartidaItem item={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default GamesScoreBoard;