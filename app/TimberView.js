import {action, observable} from 'mobx';
import {inject, observer, Provider} from 'mobx-react/native'
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import RootStore from "./store/RootStore";

@inject("store") @observer
class TimerView extends Component {

    statStore;

    constructor(props) {
        super(props);
        this.statStore = props.store.stateStore;
    }

    render() {
        return (
            <View
                style={{flex: 1, flexDirection: "column-reverse", justifyContent: "flex-start", alignItems: "center"}}>
                <View style={{flexDirection: 'row'}}>
                    {CustomButton(() => this.statStore.resetTimer(), "Reset")}
                    {CustomButton(() => this.statStore.suspendTimer(), "Suspend")}
                    {CustomButton(() => this.statStore.startTimer(), "Start")}
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: "center",
                    alignItems: "flex-end",
                    marginBottom: 120
                }}>
                    <Text style={{fontSize: 120}}>{round2(this.statStore.timer / 10, 0)}</Text>
                    <Text style={{fontSize: 40, marginBottom: 20}}>.{round2(this.statStore.timer % 10, 1)}0</Text>
                </View>
            </View>
        );
    }
}

const CustomButton = (onPress, title) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={{
                margin: 10, borderRadius: 10,
                backgroundColor: "green", color: "white", fontSize: 20,
                paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
};

export default class TimberView extends Component {
    render() {
        return <Provider store={new RootStore()}><TimerView/></Provider>
    }
}

function round2(number, fractionDigits) {
    return Math.round(number * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits);
}