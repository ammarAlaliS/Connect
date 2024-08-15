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
    darkMode,
  } = route.params;

  const detectHash = (tag) => {
    const hashIndex = tag.indexOf("#");
    if (hashIndex !== -1) {
      const spaceIndex = tag.indexOf(" ", hashIndex);
      const endIndex = spaceIndex === -1 ? tag.length : spaceIndex;
      const beforeHash = tag.slice(0, hashIndex);
      const hashAndWord = tag.slice(hashIndex, endIndex);
      const remainingText = tag.slice(endIndex);
      const hashSymbol = hashAndWord.charAt(0);
      const wordAfterHash = hashAndWord.slice(1);

      return (
        <Text>
          {beforeHash}
          <Text style={{ color: darkMode.signInTextColor }}>{hashSymbol} </Text>
          <Text
            style={{
              color: darkMode.text,
              fontFamily: "PlusJakartaSans-SemiBold",
              fontSize: 14,
              opacity: 0.5,
            }}
          >
            {wordAfterHash}
          </Text>
          {remainingText}
        </Text>
      );
    } else {
      return <Text>{tag}</Text>;
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: statusBarHeight,
        backgroundColor: darkMode.background,
      }}
    >
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <View style={styles.headerTitle}>
              <Text
                style={[
                  styles.blogTitle,
                  {
                    color: darkMode.text,
                  },
                ]}
              >
                Blog
              </Text>
              <View style={styles.iconContainer}>
                <BlogIcon width={36} height={36} color={darkMode.text} />
              </View>
            </View>
          </View>
        </View>
        <View className=" px-3 h-full space-y-2 ">
          {image_url.map((image, index) => (
            <Image
              source={{ uri: image.url }}
              alt={image.alt}
              style={{
                width: "100%",
                height: 250,
                borderRadius: 2,
              }}
              resizeMode="cover"
              key={index}
            />
          ))}
          <View>
            <Text
              style={{
                fontSize: 24,
                fontFamily: "PlusJakartaSans-Bold",
                color: darkMode.text,
              }}
            >
              {blog_title}
            </Text>
          </View>
          <View className="">
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {blog_tag.map((tag, index) => (
                <View
                  key={index}
                  style={{
                    marginRight: 4,
                    height: 24,
                  }}
                >
                  {detectHash(tag)}
                </View>
              ))}
            </View>

            <View>
              <Text style={{ fontSize: 16, color: darkMode.signInTextColor ,marginTop:10}}>
                {blog_description}
              </Text>
            </View>
            <View className="space-y-2" style={{marginTop:5}}>
              {sections.map((section, index) => (
                <View key={index} >
                  <Text
                    style={{ fontSize: 20, color: darkMode.text, fontFamily: "PlusJakartaSans-Bold", marginBottom:10 }}
                  >
                    {section.title}
                  </Text>
                  <Text style={{ fontSize: 16,  color: darkMode.text}}>
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
                marginTop:10
              }}
            >
              <Text
                style={{ fontFamily: "PlusJakartaSans-Bold", fontSize: 14, color:darkMode.text }}
              >
                {author_name} {author_last_name}
              </Text>
              <Text
                style={{ fontFamily: "PlusJakartaSans-Bold", fontSize: 12,  color:darkMode.text }}
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
    paddingHorizontal: 8,
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
