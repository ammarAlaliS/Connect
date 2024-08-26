import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import api from "../api/api";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { AntDesign } from "@expo/vector-icons";

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
      return error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [blogId, token]);

  useEffect(() => {
    const getTotalLikes = async () => {
      try {
        const response = await api.get(
          `${API_BASE_URL}/blogs/${blogId}/likes`
        );
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

  const handleLikePost = async () => {
    const originalLikes = likes;
    const originalLikeSubcribe = likeSubcribe;

    setLikes((prevLikes) => (likeSubcribe ? prevLikes - 1 : prevLikes + 1));
    setLikeSubcribe(!likeSubcribe);

    try {
      const response = await api.post(
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

      // Rollback to original state if request fails
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
      console.error("Error fetching likes:", error);
    }
  };

  getTotalComment();
  return (
    <View
      style={{
        backgroundColor: darkMode.background,
        borderRadius: 0,
        shadowColor: "#f1f1f1",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderLeftWight: 1,
        borderColor: darkMode.borderBox,
      }}
      className="px-2 pt-3  z-50"
    >
      {image_url.map((image, index) => (
        <Image
          source={{ uri: image.url }}
          alt={image.alt}
          style={styles.image}
          resizeMode="cover"
          key={index}
        />
      ))}

      <View className="space-y-2">
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
                borderWidth:1,
                borderColor: darkMode.borderBox
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
                borderWidth:1,
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
                borderWidth:1,
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 2,
  },
  iconMessageContent: {
    marginBottom: 5,
  },
});

export default BlogCard;
