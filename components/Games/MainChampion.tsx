import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


interface MainChampion{
  photo: any;
  winRate: number;
  kda: number;
  maestria: string;
}

const ChampionElement = ({ champion }: {champion : MainChampion}) => {
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
        <Text style={styles.maestria}>Maestria total: {champion.maestria}</Text>
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
