import { useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { RadioCanada_400Regular, RadioCanada_500Medium } from '@expo-google-fonts/radio-canada';

const useLoadFonts = () => {
    const [fontsLoaded] = useFonts({
        'Radio_Canada': RadioCanada_400Regular,   
        'Radio_Canada_Medium': RadioCanada_500Medium
      });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    return { fontsLoaded, onLayoutRootView };
}

export default useLoadFonts;