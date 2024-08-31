import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Animated,
} from "react-native";
import BlogIcon from "../icons/BlogIcon";
import Svg, { Path } from "react-native-svg";

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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageOpacity = useRef(new Animated.Value(1)).current;
  const newImageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.sequence([
        Animated.timing(imageOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(newImageOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % image_url.length);
        imageOpacity.setValue(1);
        newImageOpacity.setValue(0);
      });
    };

    const interval = setInterval(startAnimation, 2000);

    return () => clearInterval(interval);
  }, [currentImageIndex, image_url, imageOpacity, newImageOpacity]);

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
          <View style={{ width: "100%", height: 250 }}>
            {image_url.length > 1 && (
              <>
                <Animated.View
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    opacity: imageOpacity,
                    zIndex: 1,
                  }}
                >
                  <Image
                    source={{ uri: image_url[currentImageIndex]?.url }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </Animated.View>
                <Animated.View
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    opacity: newImageOpacity,
                    zIndex: 0,
                  }}
                >
                  <Image
                    source={{
                      uri: image_url[(currentImageIndex + 1) % image_url.length]
                        ?.url,
                    }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </Animated.View>
              </>
            )}
            {image_url.length === 1 && (
              <Image
                source={{ uri: image_url[0]?.url }}
                style={styles.image}
                resizeMode="cover"
              />
            )}
          </View>
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
              <Text
                style={{
                  fontSize: 16,
                  color: darkMode.signInTextColor,
                  marginTop: 3,
                }}
              >
                {blog_description}
              </Text>
            </View>
            <View className="space-y-2" style={{ marginTop: 5 }}>
              {sections.map((section, index) => (
                <View key={index}>
                  {section?.title?.length > 0 && (
                    <Text
                      style={{
                        fontSize: 20,
                        color: darkMode.text,
                        fontFamily: "PlusJakartaSans-Bold",
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    >
                      {section.title}
                    </Text>
                  )}

                  {Array.isArray(section.content) &&
                    section.content.map((paragraph, paragraphIndex) => (
                      <Text
                        key={paragraphIndex}
                        style={{
                          fontSize: 16,
                          color: darkMode.text,
                          marginTop: 10,
                        }}
                      >
                        {paragraph}
                      </Text>
                    ))}
                  {Array.isArray(section.list) && section.list.length > 0 && (
                    <View>
                      {section.list.map((item, itemIndex) =>
                        item ? (
                          <View key={itemIndex} style={{ paddingLeft: 16 }}>
                            <View
                              style={{
                                fontSize: 16,
                                color: darkMode.text,
                                marginTop: 10,
                              }}
                              className="flex-row"
                            >
                              <View style={{ marginTop: 4 }}>
                                <Svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={18}
                                  height={18}
                                  viewBox="0 0 24 24"
                                  fill={darkMode.text}
                                  stroke={darkMode.text}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <Path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <Path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                                </Svg>
                              </View>

                              <View>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: darkMode.text,
                                  }}
                                >
                                  {" "}
                                  {item}
                                </Text>
                              </View>
                            </View>
                          </View>
                        ) : null
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "PlusJakartaSans-Bold",
                  fontSize: 14,
                  color: darkMode.text,
                }}
              >
                {author_name} {author_last_name}
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans-Bold",
                  fontSize: 12,
                  color: darkMode.text,
                }}
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
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ArticleScreen;
