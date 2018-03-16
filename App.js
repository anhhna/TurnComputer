import React, { Component } from 'react';
import {
  StyleSheet,
    View,
    Text,
    Switch
} from 'react-native';

import * as firebase from 'firebase';
import Toast from 'react-native-easy-toast'

export default class App extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {trueSwitchIsOn: false, turnValue: ""};
    }

    setError = (message) => {
        this.refs.toast.show(message);
    }

    componentDidMount() {
        var config = {
            apiKey: "AIzaSyAry5OB6i7oG25ApkkrIabalkfjalekj",
            authDomain: "yourappname.firebaseapp.com",
            databaseURL: "https://yourappname.firebaseio.com",
            projectId: "yourprojectid",
            storageBucket: "yourappname.appspot.com",
            messagingSenderId: "838833886032"
        };

        let setE = this.setError;
        firebase.initializeApp(config);
        firebase.auth().signInWithEmailAndPassword("youremail", "yourpassword")
            .catch(function(error) {
                setE(error.message);
            });

        this.getTurnValue();
    }

    turnOnComputer = () => {
        let turnPath = "/";
        let setE = this.setError;

        firebase.database().ref(turnPath).set({
            turn: 'on'
        }).catch(function (error) {
            setE(error.message);
        });

        this.setState({trueSwitchIsOn: false});
    }

    getTurnValue = () => {
        let turnPath = "/turn";
        let updateT = this.updateTurn;

        var turnRef = firebase.database().ref(turnPath);
        turnRef.on('value', function(snapshot) {
            updateT(snapshot.val());
        });
    }

    updateTurn = (val) => {
        this.setState({turnValue: val});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.turn}>
                    <Text style={{fontSize: 30}}>Turn Computer</Text>
                    <View style={styles.viewSpace}/>
                    <Switch
                        style={{ transform: [{ scaleX: 3 }, { scaleY: 3 }] }}
                        onValueChange={(value) => {
                            this.setState({trueSwitchIsOn: value});
                            this.turnOnComputer();
                        }}
                        value={this.state.trueSwitchIsOn} />
                    <View style={styles.viewSpace}/>
                    <Text style={styles.turnText}>{this.state.turnValue}</Text>
                </View>
                <Toast ref="toast"
                       style={styles.toast}
                       opacity={0.8}
                       fadeOutDuration={2000}/>
            </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    turn: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    toast: {
        backgroundColor:'red'
    },
    viewSpace: {
        height: 50
    },
    turnText: {
        fontSize: 25,
        color:'blue'
    }
});
