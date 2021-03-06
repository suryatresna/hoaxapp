import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { 
  ScrollView, 
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailPageScreenStyle'

class DetailPageScreen extends Component {
  static propTypes = {
    image: PropTypes.string
  }

  constructor(props) {
    super(props);
    const { isLoading, calculation } = props.navigation.state.params;
    this.state = {
      calculation: calculation ? calculation : 0,
      isLoading: isLoading ? isLoading : true
    }

  }

  _sendImage = function() {
    const { image } =  this.props.navigation.state.params;

    var data = new FormData(); 
    data.append('upload', {
      uri: image.uri, // your file path string
      name: 'test_hoax.jpg',
      type: 'image/jpg'
    });

    fetch("http://192.168.61.184:8080/upload",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      body: data
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(JSON.stringify(responseJson));
      this.setState({
        isLoading: false
      });
    });
  }

  _backHome = async function() {
    const {navigate} = this.props.navigation;
    navigate('LaunchScreen');
  }


  _calcRespond = function(data) {

    const { detail } = data;
    const { final_score } = detail;
    const scorePercent = final_score*100

    if (final_score >= 0.6) {
      return `FACT [${scorePercent}%]`
    }

    return `HOAX!! [${scorePercent}%]`
  }

  _listLink = function(data) {
    const { text_found } = data;

    if (Array.isArray(text_found)) {
      return text_found.map((obj) => {
        return (
          <Text>* [{obj.score}] {obj.link}</Text>
        )
      })
    }
  }


  render () {

    const { image, calculation, dataJson } =  this.props.navigation.state.params;
    const { isLoading } = this.state;
    const imageReady = {
      uri: image ? `data:image/jpg;base64,${image.base64}` : "../../Images/photo.jpg"
    };

    const imageComposition = {
      width: 375,
      height: 230
    }

    const calcResp = this._calcRespond(dataJson.data)
    const viewListResponse = this._listLink(dataJson.data)

    const viewResponse = isLoading && calculation == 0 ? (
      <Text style={styles.loading}>Loading....</Text>
    ) : <Text style={styles.calculation}>{calcResp}</Text>;


    console.log(JSON.stringify(this.props.navigation.state.params));
    console.log(`image: ${JSON.stringify(imageReady)}`);
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.viewButton}>
          <TouchableOpacity
              style={styles.capture}
              onPress={this._backHome.bind(this)}

          >
              <Text style={styles.fontSize}> Back to Home </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.capture}
              onPress={this._sendImage.bind(this)}
          >
              <Text style={styles.fontSize}> Refresh </Text>
          </TouchableOpacity>
        </View>
        <Image source={imageReady}
          style={imageComposition}/>
        <View>
          <Text style={styles.headTitle}>Hoax Calculation</Text>
          {viewResponse}
          <Text>Detail Information:</Text>
          {viewListResponse}
        </View>
      </ScrollView>
    )
  }
}

export default DetailPageScreen
