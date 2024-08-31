import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Image,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogsAndAuthors, clearBlogs } from "../globalState/blogsSlice";
import BlogCard from "../components/BlogCard";

const statusBarHeight = StatusBar.currentHeight || 0;

const BlogScreen = ({ darkMode }) => {
  const [selectedClassification, setSelectedClassification] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const status = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.blogs.error);
  const globalUser = useSelector((state) => state.user.global_user);

  const { width } = useWindowDimensions();

  const listClassifications = [
    { id: 1, name: "Todos" },
    { id: 2, name: "Coches" },
    { id: 3, name: "Motocicletas" },
    { id: 4, name: "Variados" },
    { id: 5, name: "Noticias" },
  ];

  useEffect(() => {
    console.log("useEffect triggered");
    console.log("Global User: ", globalUser);
    console.log("Profile Image URL: ", globalUser?.profile_img_url);
    console.log("Status: ", status);
  
    if (globalUser && status === "idle") {
      console.log("Fetching blogs...");
      dispatch(fetchBlogsAndAuthors());
    }
  }, [dispatch, globalUser, status]);
  
  

  const refreshData = async () => {
    setLoading(true);
    try {
      await dispatch(fetchBlogsAndAuthors({ ignoreCache: true })).unwrap();
    } catch (error) {
      console.error("Error al refrescar los blogs:", error);
    }
    setLoading(false);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <View key={item._id} style={styles.blogCardContainer}>
        <BlogCard
          image_url={item.blog_image_url}
          blog_title={item.title}
          blog_tag={item.tags}
          blog_description={item.blog_description}
          author_name={
            item.author
              ? item.author.first_name || "Autor no disponible"
              : "Autor no disponible"
          }
          author_last_name={item.author ? item.author.last_name || "" : ""}
          time={new Date(item.createdAt).toLocaleDateString()}
          blogId={item._id}
          totalLikes={item.likes}
          sections={item.sections}
          darkMode={darkMode}
        />
      </View>
    ),
    [darkMode]
  );

  return (
    <View style={[styles.container, { backgroundColor: darkMode.background }]}>
      {status === "loading" ? (
        <View style={styles.loaderContainer}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/quickcar-storage/quickcar-removebg-preview%20(1).png",
            }}
            style={styles.loaderImage}
            resizeMode="contain"
          />
          <ActivityIndicator size="large" color={darkMode.text} />
        </View>
      ) : (
        <>
          <View
            style={[
              styles.stickyHeader,
              {
                backgroundColor: darkMode.background,
                borderColor: darkMode.borderBox,
                color: darkMode.text,
              },
            ]}
          >
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={listClassifications}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedClassification(item.id)}
                >
                  <Text
                    style={
                      item.id === selectedClassification
                        ? {
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            marginRight: 10,
                            borderRadius: 9999,
                            borderWidth: 1,
                            backgroundColor: darkMode.backgroundCardList,
                            borderColor: darkMode.borderBox,
                            color: darkMode.colorTextCardList,
                            fontSize: 14,
                          }
                        : {
                            backgroundColor: darkMode.backgroundDark,
                            borderColor: darkMode.borderBox,
                            color: darkMode.text,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            marginRight: 10,
                            borderRadius: 9999,
                            borderWidth: 1,
                            fontSize: 14,
                          }
                    }
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ zIndex: 100, justifyContent: "center", marginHorizontal: 5 }}
            />
          </View>

          {status === "failed" && (
            <Text style={{ color: darkMode.text }}>Error: {error}</Text>
          )}

          {status === "succeeded" && blogs.length === 0 && (
            <View style={styles.noBlogsContainer}>
              <Text style={{ color: darkMode.text }}>
                No hay blogs disponibles en este momento.
              </Text>
            </View>
          )}

          {status === "succeeded" && blogs.length > 0 && (
            <FlatList
              data={[...blogs].reverse()}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
              refreshing={loading}
              onRefresh={refreshData}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeader: {
    zIndex: 100,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  blogCardContainer: {
    marginBottom: 2,
    marginHorizontal: 2,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 200,
  },
  loaderImage: {
    width: 100,
    height: 100,
  },
  noBlogsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default BlogScreen;
