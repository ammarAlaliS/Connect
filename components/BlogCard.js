import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const BlogCard = ({ image_url, blog_title, blog_tag, blog_description }) => {
    const [showMore, setShowMore] = React.useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <View style={styles.card} className="p-4 border-2 border-gray-400/10 z-50">
            <Image source={{ uri: image_url }} style={styles.image} resizeMode="cover" />
            <View className="space-y-2">
                <Text style={styles.title}>{blog_title}</Text>
                <View style={styles.tags} className="space-x-2">
                    {blog_tag.map((tag, index) => (
                        <Text key={index} style={styles.tag} className="px-2 py-[5px] rounded-[5px]">{tag}</Text>
                    ))}
                </View>
                <Text style={styles.description}>
                    {showMore ? blog_description : `${blog_description.slice(0, 120)}...`}
                </Text>
                <TouchableOpacity onPress={toggleShowMore}>
                    <Text style={styles.showMoreText}>
                        {showMore ? 'Leer menos' : 'Leer más'}
                    </Text>
                </TouchableOpacity>
            </View>
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
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
});

export default BlogCard;
