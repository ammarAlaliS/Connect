import { View, Text } from 'react-native'
import React from 'react'

const ServiceSection = ({title}) => {
    return (
      <View>
        <Text
            className=" text-3xl  text-red-500"  
        > 
        {title}
        </Text>
      </View>
    );
  };
  

export default ServiceSection