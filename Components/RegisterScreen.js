import React, {Component} from 'react';
import { StyleSheet, TextInput, Text, View, Button, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import logo from './images/logo.png';
import { connect } from 'react-redux';
import {submitNewUserInformation} from './helperFunctions/Login';
import {updateUserObject, updateIsUserLoggedIn} from '../actions';

class RegisterScreenDumb extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', username: '', avatar: '' };
      }

    registerUser() {
        let {navigation, dispatch} = this.props;
        let {email, password, username, avatar} = this.state;
        submitNewUserInformation(email, password, username, avatar)
        .then(res => dispatch(updateUserObject(res)))
        .then(dispatch(updateIsUserLoggedIn()))
        .then(this.setState({email: '', password: '', username: ''}))
        .then(navigation.navigate('Home'))
    }

    render() {

        const styles = StyleSheet.create({
            container: {
              flex: 1,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            },
            button: {
                width: 200,
                height: 50,
                backgroundColor: '#077C4A',
                alignItems: 'center',
                justifyContent: 'center',
            },
             field: {
               height: 40, 
               width: 300,
               marginBottom: 20,
               borderColor: 'gray', 
               borderWidth: 1,
               borderRadius: 5,
               paddingLeft: 10,
               backgroundColor: '#F0FBF0'
        
             },
             register: {
                 flexDirection: 'row',
                 alignItems: 'center',
                 justifyContent: 'center',
                 width: 200,
                 height: 50,
             },
             logo: {
                 marginBottom: 40,
             },
             font: {
                fontSize: 15,
            },
            label: {
                width: 300,
                textAlign: 'left',
            }
        })

        return <View style={styles.container}>
        <Image 
        source={logo}
        style={styles.logo}
        />
        <Text style={styles.label}>Create a username</Text>
        <TextInput 
            style={styles.field}
            placeholder='username'
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}/>
        <Text style={styles.label}>Enter your email</Text>
        <TextInput 
            style={styles.field}
            placeholder='email@planted.com'
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}/>
        <Text style={styles.label}>Create a password</Text>
        <TextInput
            style={styles.field}
            placeholder='Password123'
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
        />
        <Text style={styles.label}>Link to Avatar</Text>
        <TextInput
            style={styles.field}
            placeholder='Image URL'
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
        />
        <View style={styles.register}>
            <Text style={styles.font}>Already Registered?</Text>
            <Button 
            title="Sign In Here"
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
        />
        </View>
        <View style={styles.button}>
            <Button
            style={styles.register}
            title="Submit"
            color="white"
            onPress={() => this.registerUser()}
            />
        </View>
        </View>
}
}


let mapDispatchToProps = (dispatch) => {
    return { dispatch: dispatch };
}

let RegisterScreen = connect(
    null,
    mapDispatchToProps
)(RegisterScreenDumb);

export default RegisterScreen;