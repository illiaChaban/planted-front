import React, {Component} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import {HumidityDisplay} from './DataDisplay';

class HumidityScreenComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
        title="Profile"
        color="green"
        onPress={() => navigation.navigate('Profile')}
        />
      ),
    };
  }

  render() {

    let {navigation, plantData} = this.props;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    let DisplayDataOnScreen = () => {
      let key = 0;
      if (plantData === null || plantData === undefined) {
        return <View><Text>Loading...</Text></View>
      } else {
        return <FlatList style={styles.dataContainer}
              data={plantData}
              renderItem={({item}) => <HumidityDisplay data={item} />}
              />
      }
    };

    return <View style={styles.container}>
      <Text style={styles.font}>Current Readings</Text>
      <DisplayDataOnScreen />
      </View>
  }
}

let mapStateToProps = (state) => {
  return {token: state.token,
          plantData: state.plantData}
};

let HumidityScreen = connect(mapStateToProps)(HumidityScreenComponent);

export default HumidityScreen;