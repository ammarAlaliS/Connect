import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogsAndAuthors } from "../globalState/blogsSlice";
import BlogIcon from "../icons/BlogIcon";
import BlogCard from "../components/BlogCard";

const BlogScreen = ({ darkMode }) => {
  const [selectedClassification, setSelectedClassification] = useState(1);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const authorsById = useSelector((state) => state.blogs.authorsById);
  const status = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.blogs.error);
  const globalUser = useSelector((state) => state.user.global_user);

  useEffect(() => {
    if (globalUser && globalUser.profile_img_url && status === "idle") {
      dispatch(fetchBlogsAndAuthors());
    }
  }, [dispatch, globalUser, status]);

  const listClassifications = [
    { id: 1, name: "Todos" },
    { id: 2, name: "Coches" },
    { id: 3, name: "Motocicletas" },
    { id: 4, name: "Variados" },
    { id: 5, name: "Noticias" },
  ];

  return (
    <View
      style={[styles.container, { backgroundColor: darkMode.backgroundDark }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
      >
        <View
          style={{ backgroundColor: darkMode.background, color: darkMode.text }}
        ></View>

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
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {listClassifications.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedClassification(item.id)}
              >
                <Text
                  style={
                    item.id === selectedClassification
                      ? {
                          paddingHorizontal: 8,
                          paddingVertical: 5,
                          marginRight: 10,
                          borderRadius: 2,
                          borderWidth: 1,
                          backgroundColor: darkMode.backgroundCardList,
                          borderColor: darkMode.borderBoxCardList,
                          color: darkMode.colorTextCardList,
                        }
                      : {
                          backgroundColor: darkMode.backgroundDark,
                          borderColor: darkMode.borderBox,
                          color: darkMode.text,
                          paddingHorizontal: 8,
                          paddingVertical: 5,
                          marginRight: 10,
                          borderRadius: 2,
                          borderWidth: 1,
                          color: darkMode.text,
                        }
                  }
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View
          style={{ backgroundColor: darkMode.backgroundDark }}
          className=" px-[4px]"
        >
          {status === "loading" && (
            <View className=" flex-1">
              <Text
                className=" m-auto text-2xl"
                style={{ color: darkMode.text }}
              >
                Cargando blogs...
              </Text>
            </View>
          )}
          {status === "failed" && <Text  style={{ color: darkMode.text }}>Error: {error}</Text>}
          {status === "succeeded" && (
            <>
              {blogs.map((blog) => (
                <View key={blog._id} className="mb-[2px]">
                  <BlogCard
                    image_url={blog.blog_image_url}
                    blog_title={blog.title}
                    blog_tag={blog.tags}
                    blog_description={blog.blog_description}
                    author_name={
                      blog.author
                        ? authorsById[blog.author.id]?.first_name ||
                          "Autor no disponible"
                        : "Autor no disponible"
                    }
                    author_last_name={
                      blog.author
                        ? authorsById[blog.author.id]?.last_name || ""
                        : ""
                    }
                    time={new Date(blog.createdAt).toLocaleDateString()}
                    blogId={blog._id}
                    totalLikes={blog.likes}
                    sections={blog.sections}
                    darkMode={darkMode}
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
  headerContent: {
    paddingVertical: 12,
  },

  stickyHeader: {
    zIndex: 100,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
  },
  horizontalScroll: {
    width: "100%",
  },
});

export default BlogScreen;
