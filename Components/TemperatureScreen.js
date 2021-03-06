import React, {Component} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import {TemperatureDisplay} from './DataDisplay';
import Chart from './Chart';
import getDataArr from './helperFunctions/getDataArr';

class TemperatureScreenComponent extends Component {
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
      dataContainer: {
        alignSelf: 'stretch',
        
      }
    });

    let DisplayDataOnScreen = () => {
      let key = 0;
      if (plantData === null || plantData === undefined) {
        return <View><Text>Loading...</Text></View>
      } else {
        return <FlatList 
              style={styles.dataContainer}
              data={plantData}
              keyExtractor={(item) => item.dataid.toString()}              
              renderItem={({item}) => <TemperatureDisplay data={item} />}
              />
      }
    };

    console.log('temp *****', plantData)

    return <View style={styles.container}>
      <Text style={styles.font}>Current Readings</Text>
      <Chart data={getDataArr(plantData, 'temp').reverse()}/>
      <DisplayDataOnScreen />
      </View>
  }
}

let mapStateToProps = (state) => {
  return {token: state.token,
          plantData: state.plantData}
};

let TemperatureScreen = connect(mapStateToProps)(TemperatureScreenComponent);

export default TemperatureScreen;