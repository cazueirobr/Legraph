import { View, Text, StyleSheet, Dimensions, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../../firebase/hooks/useAuth';
import useCollection from '../../firebase/hooks/useCollection';
import api from '../../services/api';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface SummonerRanked {
  wins: number;
  losses: number;
  tier: string;
}

export default function MainHeader() {
    const { user, logout, loading: authLoading } = useAuth();
    const { getById, update, loading: docLoading } = useCollection('Accounts');

    const [nickName, setNickName] = useState("")

    const [data, setData] = useState<SummonerRanked>();


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

              console.log(tag)
      
              const accountResponse = await api.instance.get(`/riot/account/v1/accounts/by-riot-id/${justNickname}/${tag}?api_key=${api.key}`);
              const account = accountResponse.data;
              console.log(accountResponse)

              const summonerResponse = await api.brasil.get(`/lol/summoner/v4/summoners/by-puuid/${account.puuid}?api_key=${api.key}`);
              const summoner = summonerResponse.data;

              const leagueRankedResponse = await api.brasil.get(`/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${api.key}`);
              const leagueRanked = leagueRankedResponse.data;

              const summonerRankedObject: SummonerRanked = {
                wins: leagueRanked[0].wins,
                losses: leagueRanked[0].losses,
                tier: leagueRanked[0].tier,
              };


              setData(summonerRankedObject);
            }
          }
        } catch (error) {
          console.error("Main header: ", error);
        }
      };
      
    
      useEffect(() => {
        fetchData();
      }, [user]);
      
      if (!data) return <Text>Loading...</Text>;



    return (
      <View style={styles.header}>
        <View style={styles.logo}>
          <Image style={styles.icon} source={require("../../assets/headerImages/icon.png")} />
          <View style={styles.textContainer}>

            <Text style={styles.nickname}>{nickName}</Text>
            <Text style={styles.ranking}>Ranking atual</Text>

            <Text style={styles.stats}>{data.wins} V / {data.losses} D</Text>
          </View>
          <Image style={styles.otherIcon} source={{ uri: `https://opgg-static.akamaized.net/images/medals_new/${data.tier.toLowerCase()}.png` }} />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 0,
    },
    logo: {
        width: windowWidth,
        height: 200,

        
        backgroundColor: '#23353E',
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    icon: {
        margin: 30,
        width: 100,
        height: 100
    },
    textContainer: {
        marginLeft: 10 
    },
    nickname: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 5 
    },
    ranking: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5
    },
    stats: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5 
    },
    otherIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 10,
        width: 50,
        height: 50
    }
})
