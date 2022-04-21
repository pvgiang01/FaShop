import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import a from '../../../assets/splash/1.json'
const Splash = (props) => {
  const { navigation } = props
  return (
    <View style={{ flex: 1, backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center' }}>
      <LottieView source={a}
        autoPlay loop={false}
        speed={0.5}
        onAnimationFinish={() =>navigation.navigate('Login')}
        style={{ height: 350, width: 350 }} />
        <View style={{alignItems:'center'}}>
          <Text style={{color:'white',fontSize:35,fontWeight:'bold'}}>Wellcome To FaShop</Text>
          <Text style={{color:'white',fontSize:20}}>Where you can find the right items for you</Text>

        </View>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})