import axios from "axios";
import { setGroupedMessages, setCurrentPage, setCurrentDate, addMessages, setTotalPages, setFirstFetch, setTotalMessages, setTimeZone } from "../../../globalState/MessageSlice";
import { setLoading } from "../../../globalState/loadingSlice";
import { useDispatch, useSelector } from 'react-redux';
import { incrementRequestCount } from "../../../utils/ApiCounter";


const API_BASE_URL = "https://obbaramarket-backend.onrender.com";


export const handleSendMessage = async (content, receiverIdsArray, senderIdArray, token, setLoadingMessage, setContent) => {
    if (!content.trim()) {
        console.warn("Message content cannot be empty.");
        return;
    }
    setLoadingMessage(true);
    setContent("");

    try {
        const userReceiverId = receiverIdsArray[0] || senderIdArray[0];
        const response = await axios.post(
            `${API_BASE_URL}/api/ObbaraMarket/send/${userReceiverId}`,
            {
                content: content.trim(),
                timestamp: new Date().toISOString(),
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (response.status >= 200 && response.status < 300) {
            console.log("Message sent successfully");
        } else {
            console.error("Error sending message: Failed to send message with status:", response.status);
        }
    } catch (error) {
        const errorMsg = error.response?.data?.error || error.message || "An unexpected error occurred";
        console.error("Error sending message:", errorMsg);
    } finally {
        setLoadingMessage(false);
    }
};
export const fetchConversations = async (dispatch, userId, token, page, limit, loading) => {
    if(loading){
        return
    }
    dispatch(setLoading(true));
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    try {
        if (userId) {
            incrementRequestCount(); 

            const response = await axios.get(
                `${API_BASE_URL}/api/ObbaraMarket/conversations/${userId}?page=${page}&limit=${limit}&timeZone=${timeZone}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const result = response.data;

            if (result && Array.isArray(result.messages)) {
                dispatch(addMessages(result.messages));
                dispatch(setCurrentPage(result.currentPage || 1));
                dispatch(setTimeZone(result.timeZone));
                dispatch(setTotalMessages(result.totalMessages || 0));
                dispatch(setTotalPages(result.totalPages || 0));
                if (page === 1) {
                    dispatch(setFirstFetch(1));
                }
                if (page >= 2) {
                    dispatch(setFirstFetch(0));
                }
            } else {
                console.log("No se encontraron mensajes o formato incorrecto");
            }
        }
    } catch (error) {
        console.error("Error al realizar la solicitud", error);
    } finally {
        dispatch(setLoading(false));
    }
};
