import React from "react";
import { SafeAreaView } from "react-native";
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import BlogIcon from "../icons/BlogIcon";

const statusBarHeight = StatusBar.currentHeight || 0;

const ArticleScreen = ({ route }) => {
  // Obtener los parámetros enviados desde BlogCard
  const {
    image_url,
    blog_title,
    blog_tag,
    blog_description,
    author_name,
    author_last_name,
    author_profile_img_url,
    time,
    blogId,
    sections,
  } = route.params;

  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: statusBarHeight, backgroundColor: "#fff" }}
    >
      <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <View style={styles.headerTitle}>
              <Text style={styles.blogTitle}>Blog</Text>
              <View style={styles.iconContainer}>
                <BlogIcon width={36} height={36} />
              </View>
            </View>
          </View>
        </View>
        <View className=" px-4 bg-white h-full ">
          {image_url.map((image, index) => (
            <Image
              source={{ uri: image.url }}
              alt={image.alt}
              style={{
                width: "100%",
                height: 200,
                borderRadius: 2,
                marginBottom: 10,
              }}
              resizeMode="cover"
              key={index}
            />
          ))}
          <View className="space-y-4">
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {blog_tag.map((tag, index) => (
                <Text
                  key={index}
                  style={{
                    backgroundColor: "#8504FF",
                    color: "#fff",
                    fontFamily: "PlusJakartaSans-SemiBold",
                    fontSize: 13,
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                    marginRight: 5,
                    borderRadius: 5,
                  }}
                >
                  {tag}
                </Text>
              ))}
            </View>
            <View>
              <Text
                style={{ fontSize: 20, fontFamily: "PlusJakartaSans-Bold" }}
              >
                {blog_title}
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 16, color: "#666" }}>
                {blog_description}
              </Text>
            </View>
            <View>
              {sections.map((section, index) => (
                <View key={index} className="space-y-4">
                  <Text
                    style={{ fontSize: 20, fontFamily: "PlusJakartaSans-Bold" }}
                  >
                    {section.title}
                  </Text>
                  <Text style={{ fontSize: 16, color: "#666" }}>
                    {section.content}
                  </Text>
                </View>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                style={{ fontFamily: "PlusJakartaSans-Bold", fontSize: 14 }}
              >
                {author_name} {author_last_name}
              </Text>
              <Text
                style={{ fontFamily: "PlusJakartaSans-Bold", fontSize: 12 }}
              >
                {time}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContent: {
    paddingVertical: 12,
  },
  headerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  blogTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 24,
    lineHeight: 33,
  },
  iconContainer: {
    alignItems: "center",
  },
});

export default ArticleScreen;
