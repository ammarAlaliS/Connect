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
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { AntDesign } from "@expo/vector-icons";
import CommentsModal_C from "./CommentsModal _C";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [likeSubcribe, setLikeSubcribe] = useState();
  const global_user = useSelector((state) => state.user.global_user);
  const token = global_user?.token;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/like/check/${blogId}`, {
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
        const response = await axios.get(
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

  const handleLikePost = async () => {
    const originalLikes = likes;
    const originalLikeSubcribe = likeSubcribe;

    setLikes((prevLikes) => (likeSubcribe ? prevLikes - 1 : prevLikes + 1));
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
      const response = await axios.get(
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
        borderWidth: 1,
        borderColor: darkMode.borderBox,
      }}
      className="px-4 pt-4  z-50"
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
            fontSize: 20,
            fontFamily: "PlusJakartaSans-Bold",
            color: darkMode.text,
          }}
        >
          {blog_title}
        </Text>
        <View className="flex-row flex-wrap items-center justify-start space-y-[4px] ">
          {blog_tag.map((tag, index) => (
            <Text
              key={index}
              style={{
                backgroundColor: darkMode.backgroundCardList,
                borderColor: darkMode.borderBoxCardList,
                color: darkMode.colorTextCardList,
                fontFamily: "PlusJakartaSans-SemiBold",
                fontSize: 13,
                paddingHorizontal: 8,
                paddingVertical: 5,
                marginRight: 4,
                borderRadius: 2,
                borderWidth: 1,
              }}
            >
              {tag}
            </Text>
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
          <View className="flex-row space-x-[6px] justify-between">
            <TouchableOpacity
              className="  py-2 px-4 rounded-[2px] border-[1px]"
              onPress={handleLikePost}
              style={[
                likeSubcribe
                  ? {
                      backgroundColor: darkMode.backgroundCardList,
                      borderColor: darkMode.textColorLikeButton,
                    }
                  : {
                      backgroundColor: darkMode.backgroundDark,
                      borderColor: darkMode.borderBox,
                    },
              ]}
            >
              <View className=" flex-row space-x-[2px] items-center justify-center">
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
                          fontFamily: "PlusJakartaSans-Bold",
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
              className=" py-2 px-2 rounded-[2px] border-[1px]  flex-1"
              style={{
                borderColor: darkMode.textCommentButton,
                backgroundColor: darkMode.backgroundComment,
              }}
              onPress={() => setModalVisible(true)}
            >
              <View className=" flex-row space-x-[2px] items-center justify-center">
                <EvilIcons
                  name="comment"
                  size={24}
                  color={darkMode.textCommentButton}
                />
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans-Bold",
                    color: darkMode.textCommentButton,
                  }}
                  className=" text-[14px]"
                >
                  Comentar
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className=" py-2 px-2 rounded-[2px] border-[1px] "
              style={{
                borderColor: darkMode.borderBox,
                backgroundColor: darkMode.backgroundCardList,
              }}
            >
              <View className=" flex-row space-x-[2px] items-center justify-center">
                <AntDesign name="save" size={20} color={darkMode.text} />
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans-Bold",
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
                })
              }
            >
              <View
                className=" items-center py-2 rounded-[2px] "
                style={{
                  borderWidth:1,
                  borderColor: darkMode.colorTextCardList,
                  backgroundColor: darkMode.backgroundCardList,
                }}
              >
                <Text
                  style={{
                     fontFamily: "PlusJakartaSans-SemiBold",
                     color: darkMode.colorTextCardList

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
      <CommentsModal_C
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        blogId={blogId}
        token={token}
      />
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
    height: 200,
    borderRadius: 2,
  },
  iconMessageContent: {
    marginBottom: 5,
  },
});

export default BlogCard;
