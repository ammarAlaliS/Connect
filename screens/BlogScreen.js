import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs } from '../globalState/blogsSlice';

import BlogIcon from '../icons/BlogIcon';
import BlogCard from '../components/BlogCard';

const BlogScreen = () => {
    const [selectedClassification, setSelectedClassification] = useState(1);
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs.blogs);
    const status = useSelector((state) => state.blogs.status);
    const error = useSelector((state) => state.blogs.error);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    const listClassifications = [
        { id: 1, name: "Todos" },
        { id: 2, name: "Artículos de carros" },
        { id: 3, name: "Artículos de Motocicletas" },
        { id: 4, name: "Artículos variados" },
    ];

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                stickyHeaderIndices={[1]}
            >
                <View style={styles.headerContainer}>
                    <View style={styles.headerContent}>
                        <View style={styles.headerTitle}>
                            <Text style={styles.blogTitle}>Blog</Text>
                            <View style={styles.iconContainer}>
                                <BlogIcon width={36} height={36} />
                            </View>
                        </View>
                        <Text style={styles.headerDescription}>Filtra los blogs por categorías</Text>
                    </View>
                </View>

                <View style={styles.stickyHeader}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizontalScroll}
                    >
                        {listClassifications.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={item.id === selectedClassification ? styles.selectedItem : styles.item}
                                onPress={() => setSelectedClassification(item.id)}
                            >
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.content}>
                    {console.log(blogs)}
                    {status === 'loading' && <Text>Loading...</Text>}
                    {status === 'failed' && <Text>Error: {error}</Text>}
                    {status === 'succeeded' && (
                        <>
                            {blogs.map((blog) => (
                                <View key={blog._id}>
                                    <BlogCard
                                        image_url={blog.blog_image_url}
                                        blog_title={blog.title}
                                        blog_tag={blog.tags}
                                        blog_description={blog.blog_description}
                                        autor_name={blog.first_name}
                                        author_last_name={blog.last_name}
                                        time={new Date(blog.createdAt).toLocaleTimeString()}
                                    />
                                </View>
                            ))}
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerContent: {
        paddingVertical: 12,
    },
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    blogTitle: {
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: 24,
        lineHeight: 33,
    },
    iconContainer: {
        alignItems: 'center',
    },
    headerDescription: {
        fontFamily: 'PlusJakartaSans-SemiBold',
        fontSize: 18,
        lineHeight: 22,
        color: '#1F9386',
        textAlign: 'center',
        marginTop: 8,
    },
    stickyHeader: {
        backgroundColor: 'white',
        zIndex: 100,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    horizontalScroll: {
        width: '100%',
    },
    item: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    selectedItem: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#FFCD57',
    },
    content: {
        backgroundColor: '#F9F6FE',
        padding: 10,
    },
});

export default BlogScreen;
