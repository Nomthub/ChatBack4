import React, {Component} from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";

import {dialogflowConfig} from './env';
//import { QuickReplies } from "react-native-gifted-chat/lib/QuickReplies";

const botAvatar = require('./assets/images/logo1.png');

const chatBotHere = {
    _id : 2,
    name : 'BuildBot',
    avator : botAvatar
}

class App extends Component{
    state = {
        messages:[{_id: 1, text : 'Hello there!', createdAt : new Date(), user : chatBotHere}],
        id : 1,
        name : '',
    };

    componentDidMount(){
        Dialogflow_V2.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow_V2.LANG_ENGLISH_GB,
            dialogflowConfig.project_id
        );
    }

    handleGoogleResponse(result){
        let text = result.queryResult.fulfillmentMessages[0].text.text[0];

        this.sendBotResponse(text);
    }

    sendBotResponse(text){
        let msg;
        if(text == 'order'){
            msg = {
                _id : this.state.messages.length + 1,
                text : 'Would you like a treat as well?', 
                image : './assets/images/treat1.jpg',
                createdAt : new Date(),
                user : chatBotHere
            };
        }
        else if(test == 'show options'){
            msg = {
                _id : this.state.messages.length + 1,
                text : 'Please choose one of these options:', 
                createdAt : new Date(),
                user : chatBotHere,
                quickReplies : {
                    type : 'radio',
                    keepIt : true,
                    values : [
                        {title : 'Choc Chip biscuits', 
                        value : 'Choc Chip Biscuits (2)',
                        borColor : '#420587', 
                        backgColor : '#E4D4F7',
                        OptionData : {
                            _id : '1',
                            text: title,
                            createdAt : new Date(),
                            user : chatBotHere
                        }},
                        {title : 'Chocolate blondie', 
                        value : 'Chocolate Blondie (1)', 
                        borColor : '#420587', 
                        backgColor : '#E4D4F7',
                        OptionData : {
                            _id : '2',
                            text: title,
                            createdAt : new Date(),
                            user : chatBotHere
                        }},
                        {title : 'Short Bread', 
                        value : 'Short bread (2)', 
                        borColor : '#420587', 
                        backgColor : '#E4D4F7',
                        OptionData : {
                            _id : '3',
                            text: title,
                            createdAt : new Date(),
                            user : chatBotHere
                        }},
                    ],
                },
            };
        }
        else {
            msg = {
                _id : this.state.messages.length + 1,
                text, 
                createdAt : new Date(),
                user : chatBotHere
            };
        }

        this.setState((previousState) => ({
            messages : GiftedChat.append(previousState.messages, [msg])
        }));
    }

    onSend(messages = []){
        this.setState((previousState) => ({
            messages : GiftedChat.append(previousState.message, messages)
        }));

        let message = messages[0].text;

        Dialogflow_V2.requestQuery(
            message,
            (result) => this.handleGoogleResponse(result),
            (error) => console.log(error)
        );
    }

    onQuickReply(quickReply){
        this.setState((previousState) => ({
            messages : GiftedChat.append(previousState.message, quickReply)
        }));

        let message = quickReply[0].value;

        Dialogflow_V2.requestQuery(
            message,
            (result) => this.handleGoogleResponse(result),
            (error) => console.log(error)
        );
    }

    renderBubble = props => {
        return (
            <Bubble 
            {...props} textStyle={{color: 'white'}}
            wrapperStyle={{right : {backgroundColor : '#B8A846'}, left : {backgroundColor : '#E5E0C0'}}}
            />
        );
    }

    render(){
        return(
            <SafeAreaView>
                <View style = {{flex:1, backgroundColor: '#fff'}}>
                    <GiftedChat messages={this.state.messages}
                    onSend={(message) => this.onSend(message)}/>
                    onQuickReply = {(quickReply) => this.onQuickReply
                    (quickReply)}
                    renderBubble={this.renderBubble}
                    user = {{_id: 1}}
                    <Button
                        title="Choose"
                        style={{height : 35}}
                        onPress={() => this.onSend(item.OptionData)}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default App;