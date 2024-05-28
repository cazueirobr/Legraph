import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import useAuth from '../../firebase/hooks/useAuth';
import useCollection from '../../firebase/hooks/useCollection';
import api from '../../services/api';


interface MainChampion{
  photo: any;
  winRate: number;
  kda: number;
  maestria: string;
}

const ChampionElement = ({ champion }: {champion : MainChampion}) => {
  const { user, logout, loading: authLoading } = useAuth();
  const { getById, update, loading: docLoading } = useCollection('Accounts');

  const [nickName, setNickName] = useState("")

  const [data, setData] = useState<any>(); //Vou deixar como any de proposito, pois ainda estou trabalhando nessa parte


  const fetchData = async () => {
      try {
        console.log(user)
        if (user && user.email) {
          const userData = await getById(user.email as string);
          
          if (userData && userData.nickName) {
              setNickName(userData.nickName)
              
            const parts = userData.nickName.split('#');
    

            const justNickname = parts[0];
            const tag = parts[1];
    
            const accountResponse = await api.instance.get(`/riot/account/v1/accounts/by-riot-id/${justNickname}/${tag}?api_key=${api.key}`);
            const account = accountResponse.data;
            console.log(account.puuid)

            const summonerResponse = await api.brasil.get(`/lol/summoner/v4/summoners/by-puuid/${account.puuid}?api_key=${api.key}`);
            const summoner = summonerResponse.data;

            const championMasteriesResponse = await api.brasil.get(`/lol/champion-mastery/v4/champion-masteries/by-puuid/${account.puuid}/top?count=1&api_key=${api.key}`);
            
            const championMasteries = championMasteriesResponse.data;

            const mainChampion = championMasteries[0]

            console.log(mainChampion)




            setData({
              mainChampion
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
    <View style={styles.container}>
      <Text style={styles.mainChampion}>Main Champion</Text>
      <View style={styles.championInfo}>
        <View style={styles.photoContainer}>
          <Image source={champion.photo} style={styles.championPhoto} />
        </View>
        <View style={styles.stats}>
          <View style={styles.statRow}>
            <Text>Taxa de vitória: {champion.winRate}%</Text>
          </View>
          <View style={styles.statRow}>
            <Text>Taxa de KDA: {champion.kda}</Text>
          </View>
        </View>
        <Text style={styles.maestria}>Maestria total: {data.mainChampion.championLevel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  mainChampion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  championInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  championPhoto: {
    width: 80, 
    height: 80, 
    resizeMode: 'contain', 
  },
  stats: {
    flex: 1,
  },
  statRow: {
    marginBottom: 5,
  },
  maestria: {
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
  },
});

export default ChampionElement;
