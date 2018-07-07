import { StackNavigator } from 'react-navigation'
import DetailPageScreen from '../Containers/DetailPageScreen'
import PageCameraScreen from '../Containers/PageCameraScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  DetailPageScreen: { screen: DetailPageScreen },
  PageCameraScreen: { screen: PageCameraScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
