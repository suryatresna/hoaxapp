import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  viewButton: {
    flex: 0, flexDirection: 'row', justifyContent: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  loading: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 20,
    padding: 15
  },
  calculation: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 20,
    padding: 15
  },
  headTitle: {
    fontSize: 32,
    alignSelf: 'center',
    margin: 20,
    padding: 15
  }
})
