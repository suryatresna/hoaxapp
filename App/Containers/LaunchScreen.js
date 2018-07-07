import React, { Component } from 'react'
import { ScrollView, Text, Image, View, Button } from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText}>
              Welcome to Hoax Detector
            </Text>
            <Button 
              title="Let's start"
              onPress={() => {
                navigate('PageCameraScreen')
              }}
            />
          </View>

        </ScrollView>
      </View>
    )
  }
}
