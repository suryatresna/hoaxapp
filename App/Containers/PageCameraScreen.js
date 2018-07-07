import React, { Component } from 'react'
import { 
  Text,
  TouchableOpacity,
  View 
} from 'react-native'
import { RNCamera } from 'react-native-camera';
import Spinner from 'react-native-loading-spinner-overlay';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PageCameraScreenStyle'

class PageCameraScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, forceUpOrientation: true};
      const data = await this.camera.takePictureAsync(options)
      this._sendImage({
        uri: data.uri, // your file path string
        name: 'test_hoax.jpg',
        type: 'image/jpg'
      }, data.base64)
      
    }
  };

  _sendImage = function(dataImage, base64) {

    var data = new FormData(); 
    data.append('upload', dataImage);
    this.setState({
      isLoading: true
    })

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
      const { navigate } = this.props.navigation;
      navigate('DetailPageScreen', {image: {...dataImage, base64}, isLoading: false, calculation: 1})
      this.setState({
        isLoading: false
      })
    });
  }

  _backHome = async function() {
    navigate('LaunchScreen')
  }

  render () {

    const { isLoading } = this.state;

    const spinnerArea = (
      <View style={{ flex: 1 }}>
        <Spinner 
          visible="true" 
          textContent={"Loading..."} 
          textStyle={{color: '#FFF'}} 
          overlayColor={"rgba(0,0,0,1)"}/>
      </View>
    );

    return (
      <View style={styles.container}>
        {isLoading ? spinnerArea : ''}
        <View style={styles.viewButton}>
          <TouchableOpacity
              style={styles.capture}
              onPress={this._backHome.bind(this)}

          >
              <Text style={styles.fontSize}> Back to Home </Text>
          </TouchableOpacity>
        </View>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={styles.viewButton}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}
        >
            <Text style={styles.fontSize}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}


export default PageCameraScreen
