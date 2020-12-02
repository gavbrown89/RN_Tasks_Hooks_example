import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    Dimensions,
    Alert
} from 'react-native';
import {
    withNavigationFocus,
} from 'react-navigation';
import {
    Card,
    Input,
    Button,
} from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import LogoWhite from '../assets/images/logo-white.png';
const FormData = require('form-data');

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: null,
        }
    }

    /** 
     * Check local storage for saved credentials
    */
    async componentDidMount() {
        const returnEmail = function() {
            return new Promise(function(resolve) {
                resolve(AsyncStorage.getItem('email'))
            });
        }
        const returnPassword = function() {
            return new Promise(function(resolve) {
                resolve(AsyncStorage.getItem('password'))
            });
        }
        const getCredentials = async () => {
            const [resultEmail, resultPassword] = await Promise.all([
                returnEmail(),
                returnPassword()
            ]);
            this.setState({
                email: (resultEmail),
                password: (resultPassword)
            });
        }; getCredentials();
    }

    formSubmit = () => {
        const devURL= '<DEV API URL>';
        const myData = new FormData();
        myData.append('email', this.state.email);
        myData.append('password', this.state.password);
        axios({
            url: devURL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/form-data',
            },
            data: myData,
        })
        .then(response => response.data)
        .then((data) => {
            console.log(data);
            this.setState({
                accessToken: data.access_token,
            });
            // Check user role permissions, set task API
            if (data.role == 'subuser') {
                this.setState({ url: '<SUBUSER TASKS URL>' });
            } else if (data.role == 'admin') {
                this.setState({ url: '<ADMIN TASKS URL>' });
            }
            // Navigate to Dashboard with params
            this.props.navigation.navigate('Dashboard', {
                id: data.id,
                name: data.name,
                email: data.email,
                accessToken: data.access_token,
                role: data.role,
                taskUrl: this.state.url,
            });
            // Store users credentails in local storage
            AsyncStorage.setItem('email', this.state.email);
            AsyncStorage.setItem('password', this.state.password);
        })
        .catch(function (error) {
            if (error.response) {
                Alert.alert('Please check your credentials and have a valid subscription');
                console.log('Credentials:', error.response);
              // The request was made and the server responded with a status code
              console.log('data', error.response.data);
              console.log('Status', error.response.status);
              console.log('Headers', error.response.headers);
            } else if ('Error request', error.request) {
                Alert.alert('Network request failed, please try again later')
              // The request was made but no response was received
              console.log('request', error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
              Alert.alert('Something went wrong, please try again later');
            }
            console.log('Error config', error.config);            
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <View style={styles.header}>
                    <Image source={LogoWhite} style={styles.logo} />
                    <Text style={styles.h1}>Collaborate Teams</Text>
                    <Text style={styles.p}>Login to your account</Text>
                </View>
                <View style={styles.loginContainer}>
                    <Card style={styles.card}>
                        <Card.Title>Login</Card.Title>
                        <Card.Divider />
                        <Input 
                            placeholder="Email"
                            inputStyle={{ fontSize: 12, }}
                            autoCapitalize='none'
                            onChangeText = {email => this.setState({ email })}
                            value = {this.state.email}
                        />
                        <Input 
                            placeholder="Password"
                            inputStyle={{ fontSize: 12, }}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            onChangeText = {password => this.setState({ password })}
                            value = {this.state.password}
                        />
                        <Button 
                            title="Login"
                            buttonStyle={{ backgroundColor: '#796eff', }}
                            onPress= {this.formSubmit}
                        />
                    </Card>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#796eff',
        height: Dimensions.get('window').height / 2,
        justifyContent: 'center',
    },
    logo: {
        alignSelf: 'center',
        width: 50, 
        height: 50,
    },
    h1: {
        textAlign: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 25,
        paddingTop: 10,
    },
    p: {
        textAlign: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
    card: {
        flex: 1,
    },
    loginContainer: {
        position: 'absolute',
        top: '37%',
        width: '100%',
    }, 
});

export default withNavigationFocus(SignIn);