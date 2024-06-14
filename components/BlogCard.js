import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import axios from 'axios';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { AntDesign } from '@expo/vector-icons';
import CommentsModal_C from './CommentsModal _C';


const API_BASE_URL = 'https://obbaramarket-backend-1.onrender.com/api/ObbaraMarket';
const socket = io(API_BASE_URL, {
    transports: ['websocket'],
});

const BlogCard = ({ image_url, blog_title, blog_tag, blog_description, author_name, author_last_name, time, blogId }) => {
    const [likes, setLikes] = useState();
    const [showMore, setShowMore] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [likeSubcribe, setLikeSubcribe] = useState()
    const global_user = useSelector((state) => state.user.global_user);
    const token = global_user?.token;

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };


    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/like/check/${blogId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLikeSubcribe(response.data.hasLiked);
        } catch (error) {
            console.error('Error al realizar la solicitud GET:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [blogId, token]);

    useEffect(() => {
        const getTotalLikes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/blogs/${blogId}/likes`);
                setLikes(response.data.totalLikes);
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };

        getTotalLikes();

        socket.on('likePost', ({ blogId: updatedBlogId }) => {
            if (updatedBlogId === blogId) {
                getTotalLikes();
            }
        });

        return () => {
            socket.off('likePost');
        };
    }, [blogId]);

    const handleLikePost = async () => {
        const originalLikes = likes;
        const originalLikeSubcribe = likeSubcribe;
        
        // Optimistically update the UI
        setLikes(prevLikes => likeSubcribe ? prevLikes - 1 : prevLikes + 1);
        setLikeSubcribe(!likeSubcribe);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/like/${blogId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            socket.emit('likePost', { blogId });
        } catch (error) {
            console.error('Error al realizar la solicitud POST:', error);

            // Rollback to original state if request fails
            setLikes(originalLikes);
            setLikeSubcribe(originalLikeSubcribe);
        }
    };
    return (
        <View style={styles.card} className="px-4 pt-4 border-2 border-gray-400/10 z-50">
            <Image source={{ uri: image_url }} style={styles.image} resizeMode="cover" />
            <View className="space-y-2">
                <Text style={styles.title}>{blog_title}</Text>
                <View className="w2esc  flex-row flex-wrap items-center justify-start space-y-2 ">
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
                        <View className=" bg-[#080099] h-[28px] w-[28px] items-center justify-center rounded-full">
                            <EvilIcons name="comment" size={24} color="white" style={styles.iconMessageContent} />
                        </View>
                        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', }} className=" mt-[3px]">0</Text>
                    </View>
                    <View className=" flex-row space-x-[4px]" >
                        <View
                            style={[likes === 0 ? styles.likeContentDisable : styles.likeContentActive]}
                            className="  h-[28px] w-[28px] items-center justify-center rounded-full">
                            <EvilIcons
                                name="like"
                                size={24}
                                style={[likes === 0 ? styles.iconLikeContentDisable : styles.iconLikeContentActive]}
                            />
                        </View>
                        <Text
                            style={{ fontFamily: 'PlusJakartaSans-Bold' }}
                            className="mt-[3px] ">{likes}
                        </Text>

                    </View>
                </View>

                <View className="border-t-[1px] border-gray-400/20 py-4  space-y-2  " >
                    <View className="flex-row space-x-[6px] justify-between">
                        <TouchableOpacity
                            className="  py-2 px-4 rounded-md border-[1px] border-black/10"
                            onPress={handleLikePost}
                            style={[likeSubcribe ? styles.molaButtonActive : styles.molaButtonDisable]}
                        >

                            <View className=" flex-row space-x-[2px] items-center justify-center">
                                <EvilIcons
                                    name="like"
                                    size={24}
                                    style={[likeSubcribe ? styles.molaIconActive : styles.molaIconDisable]}
                                />
                                <Text
                                    style={[likeSubcribe ? styles.molaIconActive : styles.molaIconDisable]}
                                    className=" text-[14px] text-white">Mola</Text>
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

    likeContentActive: {
        backgroundColor: '#ff226e'

    },
    likeContentDisable: {
        backgroundColor: 'rgba(107, 114, 128, 0.3)',
    },

    iconLikeContentActive: {
        marginBottom: 5,
        color: '#fff'
    },
    iconLikeContentDisable: {
        marginBottom: 5,
        color: '#000'
    },
    iconMessageContent: {
        marginBottom: 5,
    },
    molaButtonDisable: {
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
    },
    molaButtonActive: {
        backgroundColor: '#ff226e',
    },
    molaIconActive: {
        color: '#fff',
        marginBottom: 3,
        fontFamily: 'PlusJakartaSans-Bold',
    },
    molaIconDisable: {
        color: '#000',
        marginBottom: 3,
        fontFamily: 'PlusJakartaSans-Bold',
    },


});


export default BlogCard;