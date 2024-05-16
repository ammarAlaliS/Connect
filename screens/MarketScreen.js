import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { addUser } from '../globalState/userSlice';

const MarketScreen = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/1")
        .then((response)=> response.json())
        .then((data) => dispatch(addUser(data)))
    }, []) 

    return (
        <View>
            <Header />
        </View>
    );
}

export default MarketScreen;
