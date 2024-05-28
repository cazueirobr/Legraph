import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import api from '../../services/api';
import { Account, Partida } from '../../types/types';
import useAuth from '../../firebase/hooks/useAuth';
import useCollection from '../../firebase/hooks/useCollection';



interface UserData {
  account: Account;
  matchesId: string[];
}


const PartidaItem = ({ item }: { item: Partida }) => (
  <View style={[styles.container, { backgroundColor: item.vitoria ? '#B3C7F8' : '#F8B3B3' }]}>
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <Image source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${item.personagem}.png` }} style={styles.imagem} />
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
  const { user, logout, loading: authLoading } = useAuth();
  const { getById, update, loading: docLoading } = useCollection('Accounts');


  const [data, setData] = useState<UserData>();
  const [gamesData, setGamesData] = useState<Partida[]>([]);


  const fetchData = async () => {
    try {
      if (user && user.email) {
        const userData = await getById(user.email as string);
        if (userData && userData.nickName) {
          const parts = userData.nickName.split('#');
  
          const justNickname = parts[0];
          const tag = parts[1];

          const accountResponse = await api.instance.get(`/riot/account/v1/accounts/by-riot-id/${justNickname}/${tag}?api_key=${api.key}`);
          const account = accountResponse.data;
          const matchesIdResponse = await api.instance.get(`/lol/match/v5/matches/by-puuid/${account.puuid}/ids?start=0&count=10&api_key=${api.key}`);
          const matchesId = matchesIdResponse.data;
  
          const matchesDetailsPromises = matchesId.map(async (element: string) => {
            const matchDetailResponse = await api.instance.get(`/lol/match/v5/matches/${element}?api_key=${api.key}`);
            const matchDetail = matchDetailResponse.data;
            const participants = matchDetail.info.participants;
            const participantIndex = participants.findIndex((p: any) => p.puuid === account.puuid);
  
            if (participantIndex !== -1) {
              const participant = participants[participantIndex];
  
              const partida: Partida = {
                id: element,
                personagem: participant.championName,
                mortes: participant.deaths,
                abates: participant.kills,
                assistencias: participant.assists,
                cs: participant.totalMinionsKilled + participant.neutralMinionsKilled,
                kda: ((participant.kills + participant.assists) / participant.deaths).toFixed(1),
                ranqueada: matchDetail.info.gameMode,
                vitoria: participant.win,
              };
  
              return partida;
            }
            return null;
          });
  
          const matchesDetails = (await Promise.all(matchesDetailsPromises)).filter((match) => match !== null) as Partida[];
  
          setGamesData(matchesDetails);
          setData({
            account,
            matchesId,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [user]);
  
  if (!data) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={gamesData}
      renderItem={({ item }) => <PartidaItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default GamesScoreBoard;
