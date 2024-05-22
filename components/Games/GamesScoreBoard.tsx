import React, { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import api from '../../services/api';


const key = "";

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


  const [account, setAccount] = useState<{ puuid?: string }>({});
  const [matches, setMatches] = useState<string[]>([]);

  useEffect(() => {
    const fetchAccount = async () => {
      try {

        const response = await api.get(`/riot/account/v1/accounts/by-riot-id/cazueiro/BR1?api_key=${key}`);
        setAccount(response.data); } 
          catch (error) {
            console.error('Não peguei a conta', error);
      }
};
    fetchAccount();
  }, []);



  useEffect(() => {
    const getMatchesId = async (puuid: string) => {
      try {
        const response = await api.get(`/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${key}`);
        setMatches(response.data);
      } catch (error) {
        console.error('Não achou partida', error);
      }
    };
    if (account.puuid) {
      getMatchesId(account.puuid);    }
  }, [account.puuid]);

console.log("PUUID: ", account.puuid);
console.log("Matches: ", matches);


const [matchDetails, setMatchDetails] = useState<string[]>([]);

useEffect(() => {
  const getMatchDetails = async (matchId: string) => {
    try {
      const response = await api.get(`/lol/match/v5/matches/${matchId}?api_key=${key}`);
      setMatchDetails(response.data);
    } catch (error) {
      console.error('Você já sabe qual é a função que tá dando erro:', error);
    }
  };
  if(matches){
    getMatchDetails(matches[0])
  }
}, [matches]);


console.log("Match details grosso sem tratativa: ", matchDetails.metadata.participants)
console.log("Minhas estatisticas: ", matchDetails.info.participants[2])


  return (
    <FlatList
      data={partidaData}
      renderItem={({ item }) => <PartidaItem item={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default GamesScoreBoard;