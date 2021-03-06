import React, {Component} from 'react';
import { StyleSheet, TextInput, Text, View, Button, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import logo from './images/logo_planted.png';
import { connect } from 'react-redux';
import {submitUserLoginInformation, setTokenToAsyncStorage} from './helperFunctions/Login';
import {updateToken, updateIsUserLoggedIn} from '../actions';
import FadeIn from './animations/FadeIn';


class LoginScreenDumb extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '', 
            password: '',
            failedToLogin: false,
        };
      }
    
    // testing mode/ delete after
    // componentDidMount() {
    //     let {navigation, dispatch} = this.props;
    //     let userEmail = 'test1@gmail.com';
    //     let userPassword = '1111';
    //     submitUserLoginInformation(userEmail, userPassword)
    //         .then(async (res) => {
    //             console.log(res)
    //             if (res.status === 200) {
    //                 res = await res.text();
    //                 setTokenToAsyncStorage(res)
    //                 dispatch(updateToken(res));
    //                 dispatch(updateIsUserLoggedIn());
    //                 navigation.navigate('Profile');
    //             }
    //         })
    // }

    loginUser () {
        let {navigation, dispatch} = this.props;
        let {email, password} = this.state;
        let userEmail = (email.trim()).toLowerCase();
        let userPassword = password.trim();
        submitUserLoginInformation(userEmail, userPassword)
        .then(async (res) => {
            if (res.status === 200) {
                res = await res.text();
                setTokenToAsyncStorage(res)
                dispatch(updateToken(res));
                dispatch(updateIsUserLoggedIn());
                this.setState({email: '', password: ''});
                navigation.navigate('Profile');
            } else {
                this.setState({email: '', password: '', failedToLogin: true});
            }
        })
    }

    render() {

        let {navigation} = this.props;

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
                backgroundColor: '#5c720d',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
            },
             field: {
               height: 40, 
               width: 300,
               marginBottom: 20,
               borderColor: 'gray', 
               borderWidth: 1,
               borderRadius: 5,
               paddingLeft: 10,
               backgroundColor: '#f1f9d2'
        
             },
             register: {
                 flexDirection: 'row',
                 alignItems: 'center',
                 justifyContent: 'center',
                 width: 200,
                 height: 50,
             },
             buttonFont: {
                color: 'white',
                fontSize: 20,
                justifyContent: 'center',
                alignItems: 'center',
             },
             logo: {
                marginBottom: 20,
                width: 300,
                height: 150,
                resizeMode: 'contain'
             },
             font: {
                fontSize: 15,
            },
            label: {
                width: 300,
                textAlign: 'left',
            }
        })

        return ( 
            <View style={styles.container}>
                <FadeIn time={2000}>
                    <Image 
                    source={logo}
                    style={styles.logo}
                    />
                </FadeIn>
                <Text style={styles.label}>Email:</Text>
                <TextInput 
                    style={styles.field}
                    placeholder='email@planted.com'
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}/>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.field}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                />
                {this.state.failedToLogin && 
                    <Text style={{color: 'red', margin: 0, padding: 0 }}>
                        Failed to login. Try again
                    </Text>
                }
                <View style={styles.register}>
                    <Text style={styles.font}>Not Registered?</Text>
                    <Button 
                    title="Create an account"
                    style={styles.button}
                    onPress={() => navigation.navigate('Register')}
                />
                </View>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => this.loginUser()}
                >   
                    <Text style={styles.buttonFont}>Log In</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


let mapDispatchToProps = (dispatch) => {
    return { dispatch: dispatch };
}

let LoginScreen = connect(
    null,
    mapDispatchToProps
)(LoginScreenDumb);

export default LoginScreen;