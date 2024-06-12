import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { AntDesign } from '@expo/vector-icons';
import { toggleHeaderVisibility } from '../globalState/headerSlice';
import { useDispatch } from 'react-redux';
import CommentsModal_C from './CommentsModal _C';

const BlogCard = ({ image_url, blog_title, blog_tag, blog_description, author_name, author_last_name, time }) => {
    const [showMore, setShowMore] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <View style={styles.card} className="px-4 pt-4 border-2 border-gray-400/10 z-50">
            <Image source={{ uri: image_url }} style={styles.image} resizeMode="cover" />
            <View className="space-y-2">
                <Text style={styles.title}>{blog_title}</Text>
                <View  className="w2esc  flex-row flex-wrap items-center justify-start space-y-2 ">
                    {blog_tag.map((tag, index) => (
                        <Text key={index} style={styles.tag} className="px-2 mr-2 py-[5px] rounded-[5px]">{tag}</Text>
                    ))}
                </View>
                <Text style={styles.description}>
                    {showMore ? blog_description : `${blog_description.slice(0, 120)}...`}
                </Text>

                <View className=" flex-row justify-between items-center">
                    <TouchableOpacity onPress={toggleShowMore} >
                        <View>
                            <Text style={styles.showMoreText} className="">
                                {showMore ? 'Leer menos' : 'Leer más'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', }} className=" text-sm ">
                            {author_name} {author_last_name}
                        </Text>
                        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', }} className=" text-[12px]">
                            {time}
                        </Text>
                    </View>
                </View>
                <View className=" w-full flex-row justify-between py-2 ">
                    <View className="flex-row  space-x-[4px]">
                        <View className=" bg-[#080099] h-[28px] w-[28px] items-center justify-center rounded-full"><EvilIcons name="comment" size={24} color="white" style={styles.icon} /></View>
                        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', }} className=" mt-[3px]">6</Text>
                    </View>
                    <View className="flex-row space-x-[4px]">
                        <View className=" bg-[#ff226e] h-[28px] w-[28px] items-center justify-center rounded-full"><EvilIcons name="like" size={24} color="white" style={styles.icon} /></View>
                        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', }} className=" mt-[3px]">10</Text>
                    </View>
                </View>

                <View className="border-t-[1px] border-gray-400/20 py-4  space-y-2  " >
                    <View className="flex-row space-x-[6px] justify-between">
                        <TouchableOpacity className=" bg-[#ff226e] py-2 px-4 rounded-md border-[1px] border-black/10">
                            <View className=" flex-row space-x-[2px] items-center justify-center">
                                <AntDesign name="like2" size={20} color="white" />
                                <Text style={{ fontFamily: 'PlusJakartaSans-Bold', }} className=" text-[14px] text-white">Mola</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className=" bg-gray-500/10 py-2 px-2 rounded-md border-[1px] border-black/10  flex-1"
                            onPress={() => setModalVisible(true)}
                        >
                            <View className=" flex-row space-x-[2px] items-center justify-center">
                                <EvilIcons name="comment" size={24} color="black" />
                                <Text style={{ fontFamily: 'PlusJakartaSans-Bold', }} className=" text-[14px]">Comentar</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className=" bg-gray-500/10 py-2 px-2 rounded-md border-[1px] border-black/10  ">
                            <View className=" flex-row space-x-[2px] items-center justify-center">
                                <AntDesign name="save" size={20} color="black" />
                                <Text style={{ fontFamily: 'PlusJakartaSans-Bold', }} className=" text-[14px]">Guardar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity >
                            <LinearGradient
                                colors={['#060097', '#8204ff', '#c10fff']}
                                start={{ x: 0.2, y: 0.6 }}
                                end={{ x: 1.5, y: 0 }}
                                className=" items-center py-2 rounded-md"
                            >
                                <View >

                                    <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold' }} className="text-white text-base mb-[3px]">Leer articulo</Text>

                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <CommentsModal_C
                visible={modalVisible}
                onClose={() => setModalVisible(false)}

            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontFamily: 'PlusJakartaSans-Bold',
    },
 
    tag: {
        backgroundColor: '#8504FF',
        color: '#fff',
        fontFamily: 'PlusJakartaSans-SemiBold',
        fontSize: 13,
    },
    description: {
        fontSize: 16,
        color: '#666',
    },
    showMoreText: {
        color: 'blue',
        fontSize: 16,
    },
    icon: {
        marginBottom: 5,
    }
});


export default BlogCard;
