import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MainHeader from '../../components/Headers/MainHeader';
import GamesScoreBoard from '../../components/Games/GamesScoreBoard';
import ChampionElement from '../../components/Games/MainChampion';

export default function mainPage() {
  const mockChampion = {
    photo: require('../../assets/headerImages/Zed.jpg'),
    winRate: 51,
    kda: 2.4,
    maestria: '1.323.231',
  };

  return (
    <View style={styles.visu}>
      <ScrollView>
        <MainHeader />
        <ChampionElement champion={mockChampion} />
        <GamesScoreBoard />
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create(
  {
    visu:{
      flex: 1
    }
    
  }
)
