import {Image, StyleSheet} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const SplashScreen = () => {
  const navigation = useNavigation();

  // console.log(user);

  const fetchUserFromStorage = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('user');
      const parsedUser = await JSON.parse(userInfo);
      if (parsedUser?.id) {
        const routePath =
          parsedUser?.role === 'lawyer'
            ? 'AttorneyBottomRoutes'
            : 'bottomroutes';

        console.log(parsedUser, 'parsedUser');
        (navigation as any)?.replace(routePath);
      } else {
        (navigation as any)?.replace('LoginScreen');
      }
    } catch (error) {
      console.log('Error fetching user from AsyncStorage:', error);
    }
  };

  setTimeout(() => {
    // navigation.replace(routePath);
    fetchUserFromStorage();
  }, 1000);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Animated.View
        style={styles.container}
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(1000)}>
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200, // Adjust width as needed
    height: 100, // Adjust height as needed
  },
});
