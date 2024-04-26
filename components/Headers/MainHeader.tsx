import { View, Text, StyleSheet, Dimensions, Image} from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MainHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.logo}>
          <Image style={styles.icon} source={require("../../assets/headerImages/icon.png")} />
          <View style={styles.textContainer}>

            <Text style={styles.nickname}>nick name</Text>
            <Text style={styles.ranking}>Ranking atual</Text>

            <Text style={styles.stats}>50 V / 50 D</Text>
          </View>
          <Image style={styles.otherIcon} source={require("../../assets/headerImages/diamond_icon.png")} />
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
