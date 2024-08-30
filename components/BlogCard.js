import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import api from "../api/api";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { AntDesign } from "@expo/vector-icons";
import io from "socket.io-client";

const API_BASE_URL =
  "https://obbaramarket-backend.onrender.com/api/ObbaraMarket";
const socket = io(API_BASE_URL, {
  transports: ["websocket"],
});

const BlogCard = ({
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
}) => {
  const navigation = useNavigation();
  const [likes, setLikes] = useState();
  const [totalComment, setTotalComment] = useState();
  const [showMore, setShowMore] = useState(false);
  const [likeSubcribe, setLikeSubcribe] = useState();
  const global_user = useSelector((state) => state.user.global_user);
  const token = global_user?.token;

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

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/like/check/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLikeSubcribe(response.data.hasLiked);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [blogId, token]);

  useEffect(() => {
    const getTotalLikes = async () => {
      try {
        const response = await api.get(`${API_BASE_URL}/blogs/${blogId}/likes`);
        setLikes(response.data.totalLikes);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    getTotalLikes();

    socket.on("likePost", ({ blogId: updatedBlogId }) => {
      if (updatedBlogId === blogId) {
        getTotalLikes();
      }
    });

    return () => {
      socket.off("likePost");
    };
  }, [blogId]);

  const detectHash = (tag) => {
    const hashIndex = tag.indexOf("#");
    if (hashIndex !== -1) {
      const spaceIndex = tag.indexOf(" ", hashIndex);
      const endIndex = spaceIndex === -1 ? tag.length : spaceIndex;
      const beforeHash = tag.slice(0, hashIndex);
      const hashAndWord = tag.slice(hashIndex, endIndex);
      const remainingText = tag.slice(endIndex);

      return (
        <Text>
          {beforeHash}
          <Text style={{ color: darkMode.signInTextColor }}>
            {hashAndWord.charAt(0)}{" "}
          </Text>
          <Text
            style={{
              color: darkMode.text,
              fontFamily: "PlusJakartaSans-SemiBold",
              fontSize: 14,
              opacity: 0.5,
            }}
          >
            {hashAndWord.slice(1)}
          </Text>
          {remainingText}
        </Text>
      );
    } else {
      return <Text>{tag}</Text>;
    }
  };

  const handleLikePost = async () => {
    const originalLikes = likes;
    const originalLikeSubcribe = likeSubcribe;

    setLikes((prevLikes) => (likeSubcribe ? prevLikes - 1 : prevLikes + 1));
    setLikeSubcribe(!likeSubcribe);

    try {
      await api.post(
        `${API_BASE_URL}/like/${blogId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      socket.emit("likePost", { blogId });
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      setLikes(originalLikes);
      setLikeSubcribe(originalLikeSubcribe);
    }
  };

  const getTotalComment = async () => {
    try {
      const response = await api.get(
        `${API_BASE_URL}/blogs/${blogId}/totalComment`
      );
      setTotalComment(response.data.totalComment);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getTotalComment();
  }, []);

  return (
    <View
      style={{
        backgroundColor: darkMode.background,
        shadowColor: "#f1f1f1",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderColor: darkMode.borderBox,
        marginHorizontal: 2,
        overflow: "hidden",
        position: "relative",
      }}
      className="px-2 pt-3"
    >
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

      <View className="space-y-2 relative mt-2">
        <Text
          style={{
            fontSize: 24,
            fontFamily: "PlusJakartaSans-Bold",
            color: darkMode.text,
            marginTop: 2,
          }}
        >
          {blog_title}
        </Text>
        <View className="flex-row flex-wrap items-center justify-start space-y-[0px] ">
        {blog_tag.map((tag, index) => (
          <View
            key={index}
            style={{
              // paddingHorizontal: 8,
              // paddingBottom: 5,
              // paddingTop:3,
              marginRight: 4,
              // borderRadius: 9999,

              height: 24,
            }}
          >
            {detectHash(tag)}
          </View>
        ))}
      </View>
      <Text
        style={{
          fontSize: 16,
          color: darkMode.text,
        }}
      >
        {showMore ? blog_description : `${blog_description.slice(0, 120)}...`}
      </Text>

      <View className=" flex-row justify-between items-center">
        <TouchableOpacity onPress={toggleShowMore}>
          <View>
            <Text
              style={{
                color: darkMode.showText,
                fontSize: 16,
              }}
              className=""
            >
              {showMore ? "Leer menos" : "Leer más"}
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontFamily: "PlusJakartaSans-Bold",
              color: darkMode.text,
            }}
            className=" text-sm "
          >
            {author_name} {author_last_name}
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans-Bold",
              color: darkMode.text,
            }}
            className=" text-[12px]"
          >
            {time}
          </Text>
        </View>
      </View>
      <View className=" w-full flex-row justify-between py-2 items-center ">
        <View className=" flex-row space-x-[4px]">
          <View
            style={[
              likes === 0
                ? {
                    backgroundColor: "rgba(128, 128, 128, 0.4)",
                  }
                : {
                    backgroundColor: "#FFCBCB",
                  },
            ]}
            className="  h-[28px] w-[28px] items-center justify-center rounded-full"
          >
            <EvilIcons
              name="like"
              size={24}
              style={[
                likes === 0
                  ? {
                      marginBottom: 5,
                      color: "#fff",
                    }
                  : {
                      marginBottom: 5,
                      color: darkMode.textColorLikeButton,
                    },
              ]}
            />
          </View>
          <Text
            style={{
              fontFamily: "PlusJakartaSans-Bold",
              color: darkMode.text,
            }}
            className="mt-[3px] "
          >
            {likes}
          </Text>
        </View>
        <View className="flex-row  space-x-[4px]">
          <View className=" bg-[#1E90FF] h-[28px] w-[28px] items-center justify-center rounded-full">
            <EvilIcons
              name="comment"
              size={24}
              color="white"
              style={styles.iconMessageContent}
            />
          </View>
          <Text
            style={{
              fontFamily: "PlusJakartaSans-Bold",
              color: darkMode.text,
            }}
            className=" mt-[3px]"
          >
            {totalComment}
          </Text>
        </View>
        <View className="flex-row  space-x-[4px]">
          <View className=" bg-[#1E90FF] h-[28px] w-[28px] items-center justify-center rounded-full">
            <AntDesign name="save" size={18} color={darkMode.text} />
          </View>
          <Text
            style={{
              fontFamily: "PlusJakartaSans-Bold",
              color: darkMode.text,
            }}
            className=" mt-[3px]"
          >
            0
          </Text>
        </View>
      </View>

      <View
        className="border-t-[1px] py-4  space-y-2  "
        style={{ borderColor: darkMode.borderBox }}
      >
        <View className="flex-row space-x-[6px] justify-between ">
          <TouchableOpacity
            onPress={handleLikePost}
            className="  rounded-full overflow-hidden"
            style={{
              borderWidth: 1,
              borderColor: darkMode.borderBox,
            }}
          >
            <View
              className=" flex-row space-x-[2px] items-center justify-center py-2 px-4 "
              style={[
                likeSubcribe
                  ? {
                      backgroundColor: darkMode.backgroundDark,
                    }
                  : {
                      backgroundColor: darkMode.backgroundDark,
                    },
              ]}
            >
              <EvilIcons
                name="like"
                size={24}
                style={[
                  likeSubcribe
                    ? {
                        color: darkMode.textColorLikeButton,
                      }
                    : {
                        color: darkMode.text,
                      },
                ]}
              />
              <Text
                style={[
                  likeSubcribe
                    ? {
                        marginBottom: 3,
                        fontFamily: "PlusJakartaSans-SemiBold",
                        color: darkMode.textColorLikeButton,
                      }
                    : {
                        marginBottom: 3,
                        fontFamily: "PlusJakartaSans-Bold",
                        color: darkMode.text,
                      },
                ]}
                className=" text-[14px] text-white"
              >
                Mola
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className=" py-2 px-2 rounded-full overflow-hidden  flex-1"
            style={{
              borderWidth: 1,
              borderColor: darkMode.borderBox,
              backgroundColor: darkMode.backgroundDark,
            }}
            onPress={() =>
              navigation.navigate("comment", {
                blogId,
                token,
                darkMode,
              })
            }
          >
            <View className=" flex-row space-x-[2px] items-center justify-center">
              <EvilIcons name="comment" size={24} color={darkMode.text} />
              <Text
                style={{
                  fontFamily: "PlusJakartaSans-SemiBold",
                  color: darkMode.text,
                }}
                className=" text-[14px]"
              >
                Comentar
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className=" py-2 px-4 rounded-full overflow-hidden "
            style={{
              borderWidth: 1,
              borderColor: darkMode.borderBox,
              backgroundColor: darkMode.backgroundDark,
            }}
          >
            <View className=" flex-row space-x-[2px] items-center justify-center">
              <AntDesign
                name="save"
                size={18}
                style={{ marginTop: 3 }}
                color={darkMode.text}
              />
              <Text
                style={{
                  fontFamily: "PlusJakartaSans-SemiBold",
                  color: darkMode.text,
                }}
                className=" text-[14px]"
              >
                Guardar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ArticleScreen", {
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
              })
            }
          >
            <View
              className=" items-center py-2 rounded-full "
              style={{
                borderWidth: 1,
                borderColor: darkMode.borderBox,
                backgroundColor: darkMode.backgroundDark,
              }}
            >
              <Text
                style={{
                  fontFamily: "PlusJakartaSans-Bold",
                  color: darkMode.colorTextCardList,
                }}
                className="text-white text-base mb-[3px]"
              >
                Leer articulo
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  iconMessageContent: {
    marginBottom: 5,
  },
});

export default BlogCard;
