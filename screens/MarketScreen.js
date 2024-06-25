import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native";
import ArticleCard from "../components/MarketComponents/ArticleCard.jsx";
import ArticleModal from "../components/MarketComponents/ArticleModal.jsx";
import BottomSellModal from "../components/MarketComponents/BottomSellModal.jsx";
import NewProductForm from "../components/MarketComponents/NewProductForm.jsx";
import FilterModal from "../components/MarketComponents/FilterModal.jsx";
import axios from "axios";

const MarketScreen = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const scrollViewRef = useRef(null);

  const API_BASE_URL = "http://localhost:5000/api/ObbaraMarket";
  const global_user = useSelector((state) => state.user.global_user);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzIxYmI5YzhiNGI0ODNiZDVlNWRlZiIsImlhdCI6MTcxODkxNzA0NywiZXhwIjoxNzE5MTc2MjQ3fQ.LzF937pkkC52CrqUE5fNbxfQhh36P39tU60xd2uc_8E"; //global_user?.token;

  const getProducts = async () => {
    setLoadingProducts(true);

    const response = await fetch(
      // `${API_BASE_URL}/get/products?limit=5&page=${currentPage}` //URL VERDADERA
      "https://api.chucknorris.io/jokes/random",
      {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        console.log("Entro aqui sin problemas");
        const data = {
          docs: [
            {
              productLocation: {
                state: "Barselona",
                latitude: 12.11212,
                longitude: -86.23,
              },
              _id: "66721c09c8b4b483bd5e5dfd",
              productName: "Mercedes",
              productCategory: "Coche",
              productStatus: "Nuevo",
              description:
                "Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla",
              price: 1500,
              image: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
              ],
              stock: 2,
              user: {
                global_user: {
                  first_name: "Nestor",
                  last_name: "Gonzalez",
                  email: "nestorgt37@gmail.com",
                  password:
                    "$2b$10$5RbZD9E8oRb6nbvrwacaauftELAFZtqV8BIhg8uZnQsNfntfhT1Vy",
                  profile_img_url:
                    "https://storage.googleapis.com/quickcar/1718754231723_T02DAANQAKS-U057Z4VB1FB-c016900e2dfe-512.jpg",
                  role: "user",
                },
                _id: "66721bb9c8b4b483bd5e5def",
                Blog: [],
                likes: [],
                __v: 0,
              },
              createdAt: "2024-06-18T23:45:13.873Z",
              updatedAt: "2024-06-19T02:28:37.030Z",
              __v: 0,
            },
            {
              productLocation: {
                state: "Barselona",
                latitude: 12.11212,
                longitude: -86.23,
              },
              _id: "66749890b58fa75a3f422be2",
              productName: "Ferrary",
              productCategory: "Coche",
              productStatus: "Nuevo",
              description:
                "Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla",
              price: 1500,
              image: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
              ],
              stock: 2,
              user: {
                global_user: {
                  first_name: "Nestor",
                  last_name: "Gonzalez",
                  email: "nestorgt37@gmail.com",
                  password:
                    "$2b$10$5RbZD9E8oRb6nbvrwacaauftELAFZtqV8BIhg8uZnQsNfntfhT1Vy",
                  profile_img_url:
                    "https://storage.googleapis.com/quickcar/1718754231723_T02DAANQAKS-U057Z4VB1FB-c016900e2dfe-512.jpg",
                  role: "user",
                },
                _id: "66721bb9c8b4b483bd5e5def",
                Blog: [],
                likes: [],
                __v: 0,
              },
              createdAt: "2024-06-20T21:01:04.076Z",
              updatedAt: "2024-06-20T21:01:04.076Z",
              __v: 0,
            },
            {
              productLocation: {
                state: "Barselona",
                latitude: 12.11212,
                longitude: -86.23,
              },
              _id: "66749899b58fa75a3f422be5",
              productName: "Toyota",
              productCategory: "Coche",
              productStatus: "Nuevo",
              description:
                "Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla",
              price: 1500,
              image: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
              ],
              stock: 2,
              user: {
                global_user: {
                  first_name: "Nestor",
                  last_name: "Gonzalez",
                  email: "nestorgt37@gmail.com",
                  password:
                    "$2b$10$5RbZD9E8oRb6nbvrwacaauftELAFZtqV8BIhg8uZnQsNfntfhT1Vy",
                  profile_img_url:
                    "https://storage.googleapis.com/quickcar/1718754231723_T02DAANQAKS-U057Z4VB1FB-c016900e2dfe-512.jpg",
                  role: "user",
                },
                _id: "66721bb9c8b4b483bd5e5def",
                Blog: [],
                likes: [],
                __v: 0,
              },
              createdAt: "2024-06-20T21:01:13.825Z",
              updatedAt: "2024-06-20T21:01:13.825Z",
              __v: 0,
            },
            {
              productLocation: {
                state: "Barselona",
                latitude: 12.11212,
                longitude: -86.23,
              },
              _id: "667498a3b58fa75a3f422be8",
              productName: "Lamborgini",
              productCategory: "Coche",
              productStatus: "Nuevo",
              description:
                "Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla",
              price: 1500,
              image: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
              ],
              stock: 2,
              user: {
                global_user: {
                  first_name: "Nestor",
                  last_name: "Gonzalez",
                  email: "nestorgt37@gmail.com",
                  password:
                    "$2b$10$5RbZD9E8oRb6nbvrwacaauftELAFZtqV8BIhg8uZnQsNfntfhT1Vy",
                  profile_img_url:
                    "https://storage.googleapis.com/quickcar/1718754231723_T02DAANQAKS-U057Z4VB1FB-c016900e2dfe-512.jpg",
                  role: "user",
                },
                _id: "66721bb9c8b4b483bd5e5def",
                Blog: [],
                likes: [],
                __v: 0,
              },
              createdAt: "2024-06-20T21:01:23.602Z",
              updatedAt: "2024-06-20T21:01:23.602Z",
              __v: 0,
            },
            {
              productLocation: {
                state: "Barselona",
                latitude: 12.11212,
                longitude: -86.23,
              },
              _id: "667498aab58fa75a3f422beb",
              productName: "Supra",
              productCategory: "Coche",
              productStatus: "Nuevo",
              description:
                "Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla",
              price: 1500,
              image: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
              ],
              stock: 2,
              user: {
                global_user: {
                  first_name: "Nestor",
                  last_name: "Gonzalez",
                  email: "nestorgt37@gmail.com",
                  password:
                    "$2b$10$5RbZD9E8oRb6nbvrwacaauftELAFZtqV8BIhg8uZnQsNfntfhT1Vy",
                  profile_img_url:
                    "https://storage.googleapis.com/quickcar/1718754231723_T02DAANQAKS-U057Z4VB1FB-c016900e2dfe-512.jpg",
                  role: "user",
                },
                _id: "66721bb9c8b4b483bd5e5def",
                Blog: [],
                likes: [],
                __v: 0,
              },
              createdAt: "2024-06-20T21:01:30.834Z",
              updatedAt: "2024-06-20T21:01:30.834Z",
              __v: 0,
            },
            {
              productLocation: {
                state: "Barselona",
                latitude: 12.11212,
                longitude: -86.23,
              },
              _id: "6674992fb58fa75a3f422bfd",
              productName: "Porche",
              productCategory: "Coche",
              productStatus: "Nuevo",
              description:
                "Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla",
              price: 1500,
              image: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
              ],
              stock: 2,
              user: {
                global_user: {
                  first_name: "Nestor",
                  last_name: "Gonzalez",
                  email: "nestorgt37@gmail.com",
                  password:
                    "$2b$10$5RbZD9E8oRb6nbvrwacaauftELAFZtqV8BIhg8uZnQsNfntfhT1Vy",
                  profile_img_url:
                    "https://storage.googleapis.com/quickcar/1718754231723_T02DAANQAKS-U057Z4VB1FB-c016900e2dfe-512.jpg",
                  role: "user",
                },
                _id: "66721bb9c8b4b483bd5e5def",
                Blog: [],
                likes: [],
                __v: 0,
              },
              createdAt: "2024-06-20T21:03:43.436Z",
              updatedAt: "2024-06-20T21:03:43.436Z",
              __v: 0,
            },
            {
              productLocation: {
                state: "Barselona",
                latitude: 12.11212,
                longitude: -86.23,
              },
              _id: "66749947b58fa75a3f422c00",
              productName: "Nissan GT-R",
              productCategory: "Coche",
              productStatus: "Nuevo",
              description:
                "Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla",
              price: 1500,
              image: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
              ],
              stock: 2,
              user: {
                global_user: {
                  first_name: "Nestor",
                  last_name: "Gonzalez",
                  email: "nestorgt37@gmail.com",
                  password:
                    "$2b$10$5RbZD9E8oRb6nbvrwacaauftELAFZtqV8BIhg8uZnQsNfntfhT1Vy",
                  profile_img_url:
                    "https://storage.googleapis.com/quickcar/1718754231723_T02DAANQAKS-U057Z4VB1FB-c016900e2dfe-512.jpg",
                  role: "user",
                },
                _id: "66721bb9c8b4b483bd5e5def",
                Blog: [],
                likes: [],
                __v: 0,
              },
              createdAt: "2024-06-20T21:04:08.003Z",
              updatedAt: "2024-06-20T21:04:08.003Z",
              __v: 0,
            },
            {
              productLocation: {
                state: "Barselona",
                latitude: 12.11212,
                longitude: -86.23,
              },
              _id: "6674996bb58fa75a3f422c07",
              productName: "McLaren",
              productCategory: "Coche",
              productStatus: "Nuevo",
              description:
                "Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla",
              price: 1500,
              image: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
              ],
              stock: 2,
              user: {
                global_user: {
                  first_name: "Nestor",
                  last_name: "Gonzalez",
                  email: "nestorgt37@gmail.com",
                  password:
                    "$2b$10$5RbZD9E8oRb6nbvrwacaauftELAFZtqV8BIhg8uZnQsNfntfhT1Vy",
                  profile_img_url:
                    "https://storage.googleapis.com/quickcar/1718754231723_T02DAANQAKS-U057Z4VB1FB-c016900e2dfe-512.jpg",
                  role: "user",
                },
                _id: "66721bb9c8b4b483bd5e5def",
                Blog: [],
                likes: [],
                __v: 0,
              },
              createdAt: "2024-06-20T21:04:43.029Z",
              updatedAt: "2024-06-20T21:04:43.029Z",
              __v: 0,
            },
          ],
          totalDocs: 13,
          limit: 5,
          totalPages: 2,
          page: 1,
          pagingCounter: 1,
          hasPrevPage: false,
          hasNextPage: true,
          prevPage: null,
          nextPage: 2,
        };
        const data1 = {
          docs: [
            {
              productLocation: {
                state: "Barselona",
                latitude: 12.11212,
                longitude: -86.23,
              },
              _id: "667498b2b58fa75a3f422bee",
              productName: "Onda",
              productCategory: "Coche",
              productStatus: "Nuevo",
              description:
                "Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla",
              price: 1500,
              image: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
              ],
              stock: 2,
              user: {
                global_user: {
                  first_name: "Nestor",
                  last_name: "Gonzalez",
                  email: "nestorgt37@gmail.com",
                  password:
                    "$2b$10$5RbZD9E8oRb6nbvrwacaauftELAFZtqV8BIhg8uZnQsNfntfhT1Vy",
                  profile_img_url:
                    "https://storage.googleapis.com/quickcar/1718754231723_T02DAANQAKS-U057Z4VB1FB-c016900e2dfe-512.jpg",
                  role: "user",
                },
                _id: "66721bb9c8b4b483bd5e5def",
                Blog: [],
                likes: [],
                __v: 0,
              },
              createdAt: "2024-06-20T21:01:38.711Z",
              updatedAt: "2024-06-20T21:01:38.711Z",
              __v: 0,
            },
            {
              productLocation: {
                state: "Barselona",
                latitude: 12.11212,
                longitude: -86.23,
              },
              _id: "667498c5b58fa75a3f422bf1",
              productName: "Bugati",
              productCategory: "Coche",
              productStatus: "Nuevo",
              description:
                "Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla",
              price: 1500,
              image: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
              ],
              stock: 2,
              user: {
                global_user: {
                  first_name: "Nestor",
                  last_name: "Gonzalez",
                  email: "nestorgt37@gmail.com",
                  password:
                    "$2b$10$5RbZD9E8oRb6nbvrwacaauftELAFZtqV8BIhg8uZnQsNfntfhT1Vy",
                  profile_img_url:
                    "https://storage.googleapis.com/quickcar/1718754231723_T02DAANQAKS-U057Z4VB1FB-c016900e2dfe-512.jpg",
                  role: "user",
                },
                _id: "66721bb9c8b4b483bd5e5def",
                Blog: [],
                likes: [],
                __v: 0,
              },
              createdAt: "2024-06-20T21:01:57.086Z",
              updatedAt: "2024-06-20T21:01:57.086Z",
              __v: 0,
            },
            {
              productLocation: {
                state: "Barselona",
                latitude: 12.11212,
                longitude: -86.23,
              },
              _id: "667498fab58fa75a3f422bf4",
              productName: "Chevrolet",
              productCategory: "Coche",
              productStatus: "Nuevo",
              description:
                "Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla",
              price: 1500,
              image: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
              ],
              stock: 2,
              user: {
                global_user: {
                  first_name: "Nestor",
                  last_name: "Gonzalez",
                  email: "nestorgt37@gmail.com",
                  password:
                    "$2b$10$5RbZD9E8oRb6nbvrwacaauftELAFZtqV8BIhg8uZnQsNfntfhT1Vy",
                  profile_img_url:
                    "https://storage.googleapis.com/quickcar/1718754231723_T02DAANQAKS-U057Z4VB1FB-c016900e2dfe-512.jpg",
                  role: "user",
                },
                _id: "66721bb9c8b4b483bd5e5def",
                Blog: [],
                likes: [],
                __v: 0,
              },
              createdAt: "2024-06-20T21:02:50.192Z",
              updatedAt: "2024-06-20T21:02:50.192Z",
              __v: 0,
            },
            {
              productLocation: {
                state: "Barselona",
                latitude: 12.11212,
                longitude: -86.23,
              },
              _id: "66749903b58fa75a3f422bf7",
              productName: "Tupson",
              productCategory: "Coche",
              productStatus: "Nuevo",
              description:
                "Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla",
              price: 1500,
              image: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
              ],
              stock: 2,
              user: {
                global_user: {
                  first_name: "Nestor",
                  last_name: "Gonzalez",
                  email: "nestorgt37@gmail.com",
                  password:
                    "$2b$10$5RbZD9E8oRb6nbvrwacaauftELAFZtqV8BIhg8uZnQsNfntfhT1Vy",
                  profile_img_url:
                    "https://storage.googleapis.com/quickcar/1718754231723_T02DAANQAKS-U057Z4VB1FB-c016900e2dfe-512.jpg",
                  role: "user",
                },
                _id: "66721bb9c8b4b483bd5e5def",
                Blog: [],
                likes: [],
                __v: 0,
              },
              createdAt: "2024-06-20T21:02:59.390Z",
              updatedAt: "2024-06-20T21:02:59.390Z",
              __v: 0,
            },
            {
              productLocation: {
                state: "Barselona",
                latitude: 12.11212,
                longitude: -86.23,
              },
              _id: "66749922b58fa75a3f422bfa",
              productName: "BMW M2",
              productCategory: "Coche",
              productStatus: "Nuevo",
              description:
                "Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla, con un pequeño golpe lateral Auto con 3000 km de uso, papeles en regla",
              price: 1500,
              image: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
              ],
              stock: 2,
              user: {
                global_user: {
                  first_name: "Nestor",
                  last_name: "Gonzalez",
                  email: "nestorgt37@gmail.com",
                  password:
                    "$2b$10$5RbZD9E8oRb6nbvrwacaauftELAFZtqV8BIhg8uZnQsNfntfhT1Vy",
                  profile_img_url:
                    "https://storage.googleapis.com/quickcar/1718754231723_T02DAANQAKS-U057Z4VB1FB-c016900e2dfe-512.jpg",
                  role: "user",
                },
                _id: "66721bb9c8b4b483bd5e5def",
                Blog: [],
                likes: [],
                __v: 0,
              },
              createdAt: "2024-06-20T21:03:30.106Z",
              updatedAt: "2024-06-20T21:03:30.106Z",
              __v: 0,
            },
          ],
          totalDocs: 13,
          limit: 5,
          totalPages: 3,
          page: 2,
          pagingCounter: 6,
          hasPrevPage: true,
          hasNextPage: true,
          prevPage: 1,
          nextPage: 3,
        };

        if (currentPage == 1) {
          console.log("Todo bien hasta aqui 1");
          products.push(...data.docs);
          console.log("Todo bien hasta aqui 2");
          setLastPage(data.totalPages);
          console.log("Todo bien hasta aqui 3");
        } else if (currentPage == 2) {
          products.push(...data1.docs);
          setLastPage(data1.totalPages);
        }
        setLoadingProducts(false);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("No se encontraron productos");
        setLoadingProducts(false);
      });
  };

  const ifScrollIsInTheEnd = (event) => {
    console.log("Estan entrando al scroll");

    if (
      event.layoutMeasurement.height + event.contentOffset.y >=
      event.contentSize.height - 5
    ) {
      if (currentPage < lastPage && !loadingProducts) {
        setLoadingProducts(true);
        setCurrentPage(currentPage + 1);
        scrollViewRef.current.scrollTo({
          x: 0,
          y: event.contentSize.height + 20,
          animated: true,
        });
      }
    }
  };

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users/1")
    //   .then((response) => response.json())
    //   .then((data) => dispatch(addUser(data)));
    getProducts();
  }, [currentPage]);

  const [search, setSearch] = useState("");
  const [selectedclassification, setSelectedclassification] = useState(1);
  const [carroDeCompras, setCarroDeCompras] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const listClasifications = [
    { id: 1, name: "Todos" },
    { id: 2, name: "Vehiculos de Traccion" },
    { id: 3, name: "Motocicletas" },
    { id: 4, name: "Motocarro" },
    { id: 5, name: "Ciclomotor" },
    { id: 6, name: "Ciclomotor" },
    { id: 7, name: "Ciclomotor" },
  ];

  return (
    <View style={styles.principalContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
        onScroll={(e) => {
          console.log("QUE ESTA PASANDO");
          ifScrollIsInTheEnd(e.nativeEvent);
        }}
        ref={scrollViewRef}
      >
        <View className="d-flex flex-row">
          <View style={styles.searchContainer}>
            <View style={styles.searchSection} className="d-flex flex-row">
              <Icon
                style={styles.searchIcon}
                name="search"
                size={20}
                color={search ? "#000000" : "#00000099"}
              />
              <TextInput
                style={styles.input}
                placeholder="Busca por nombre o codigo"
                onChangeText={(text) => setSearch(text)}
                value={search}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.searchSection} className="d-flex flex-row">
              <TouchableOpacity
                onPress={() => {
                  setShowFilterModal(true);
                }}
              >
                <Icon
                  style={styles.secondFilterIcon}
                  name="filter"
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
              <TextInput
                style={styles.secondImput}
                onChangeText={(text) => setSearch(text)}
              />
            </View>
          </View>
        </View>

        <View style={styles.clasificationContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="d-flex flex-row"
          >
            {listClasifications.map((item, index) => {
              if (item.id == selectedclassification) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.selectedItem}
                    onPress={() => {
                      setSelectedclassification(item.id);
                    }}
                  >
                    <Text style={{ color: "#fff" }}>{item.name}</Text>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.item}
                    onPress={() => {
                      setSelectedclassification(item.id);
                    }}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                );
              }
            })}
          </ScrollView>
        </View>

        {/* Cards de articulos */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal={false}
          scrollEventThrottle={16}
        >
          <View
            className="d-flex flex-row mx-4 my-2"
            style={[styles.articlesContainer]}
          >
            {products &&
              products.map((item, index) => {
                return (
                  <ArticleCard
                    carroDeCompras={carroDeCompras}
                    setCarroDeCompras={setCarroDeCompras}
                    urlImage={
                      item.image[0]
                        ? item.image[0]
                        : "https://noticias.coches.com/wp-content/uploads/2019/12/Recirculacion-de-Aire-2-859x483.jpg"
                    }
                    key={index}
                    setShowModal={setShowModal}
                    price={item.price}
                    stock={item.stock}
                    category={item.productCategory}
                  ></ArticleCard>
                );
              })}
            {loadingProducts && (
              <ActivityIndicator
                size={"large"}
                color={"#00000090"}
                style={{ height: 30, width: "100%", marginVertical: 10 }}
              ></ActivityIndicator>
            )}
          </View>
        </ScrollView>
      </ScrollView>
      {/* FooterMarket */}
      <Modal
        visible={showModal}
        animationType="slide"
        style={styles.modalContainer}
        transparent={true}
      >
        <ArticleModal setShowModal={setShowModal}></ArticleModal>
      </Modal>
      <BottomSellModal
        setShowNewProductModal={setShowNewProductModal}
      ></BottomSellModal>
      <Modal
        visible={showNewProductModal}
        animationType="slide"
        style={styles.secondModalContainer}
        transparent={true}
      >
        <NewProductForm setShowModal={setShowNewProductModal}></NewProductForm>
      </Modal>
      <Modal
        visible={showFilterModal}
        animationType="fade"
        style={styles.thirdModalContainer}
        transparent={true}
      >
        <FilterModal setShowFilterModal={setShowFilterModal}></FilterModal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    textAlign: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  principalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f4f5f6",
  },
  searchContainer: {
    margin: 10,
    marginRight: 0,
    flex: 1,
  },
  container: {
    margin: 10,
  },
  searchSection: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingLeft: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#ffffff",
    color: "#424242",
    borderRadius: 10,
    fontFamily: "PlusJakartaSans-SemiBold",
  },
  secondFilterIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingRight: 15,
    paddingLeft: 5,
  },
  secondImput: {
    width: 0,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "yellow",
    color: "#424242",
    borderRadius: 10,
  },
  item: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    fontFamily: "Eina01-BoldItalic",
  },
  selectedItem: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#2b00b6",
    fontFamily: "Eina01-BoldItalic",
  },
  articlesContainer: {
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    // paddingRight: 12,
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  clasificationContainer: {
    backgroundColor: "white",
    zIndex: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  modalContainer: {
    height: 100,
    width: "100%",
    marginTop: "25%",
    backgroundColor: "red",
    padding: 40,
  },
  secondModalContainer: {
    height: 100,
    width: "100%",
    marginTop: "25%",
    backgroundColor: "red",
    padding: 40,
  },
  thirdModalContainer: {
    height: 100,
    width: "100%",
    marginTop: "25%",
    backgroundColor: "red",
    padding: 40,
  },
});

export default MarketScreen;
