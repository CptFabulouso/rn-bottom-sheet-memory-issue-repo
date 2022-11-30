import React, {useCallback, useEffect} from 'react';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {View, Button, StyleSheet, Image, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const picture = require('./picture.jpeg');

import {BottomSheetModalProvider, BottomSheetModal} from '@gorhom/bottom-sheet';

const Stack = createNativeStackNavigator();

const getImages = () => new Array(200).fill(picture);

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.screen}>
      <Button
        title="go to modal screen"
        onPress={() => {
          navigation.navigate('SecondScreen');
        }}
      />
    </View>
  );
};

const snapPoints = ['85%'];
const SecondScreen = () => {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const [index, setIndex] = React.useState(-1);

  useEffect(() => {
    const ref = bottomSheetModalRef.current;
    // mount the modal so contents are pre-rendered before opening
    ref?.present();
    return () => {
      // this does not unmount the modal as is stated here https://gorhom.github.io/react-native-bottom-sheet/modal/methods#dismiss
      ref?.dismiss();
    };
  }, []);

  const handlePresentModalPress = React.useCallback(() => {
    setIndex(0);
  }, []);

  const handleIndexChange = useCallback((newIndex: number) => {
    setIndex(newIndex);
    // even if we called dismiss here, it does not unmount the modal
    // if(index === -1){
    //   bottomSheetModalRef.current?.dismiss();
    // }
  }, []);

  return (
    <View style={styles.screen}>
      <Button title="show modal" onPress={handlePresentModalPress} />
      <BottomSheetModal
        stackBehavior="push"
        ref={bottomSheetModalRef}
        index={index}
        snapPoints={snapPoints}
        onChange={handleIndexChange}
        enableContentPanningGesture={false}
        enableDismissOnClose={false}>
        <ModalContent data={getImages()} />
      </BottomSheetModal>
    </View>
  );
};

const ModalContent = ({data}: any) => {
  useEffect(() => {
    console.log('ModalContent mounted');
    return () => {
      console.log('ModalContent unmounted');
    };
  }, []);

  return (
    <View style={styles.modal}>
      <ScrollView>
        {data.map((image: any, index: number) => (
          <Image key={index} source={image} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SecondScreen" component={SecondScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    aspectRatio: 536 / 354,
  },
});

export default App;
