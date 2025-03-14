import axiosClient from '../../axiosClient.js';

export function removeHistory(bookId, userId) {
    if (!bookId || !userId) {
        return Promise.reject("Invalid bookId or userId");
    }

    return axiosClient.delete(`/remove-history/${userId}/${bookId}`)
        .then(() => {
            console.log("Book removed successfully.");
        })
        .catch((error) => {
            console.error("API Error:", error.response?.data || error.message);
            return Promise.reject(error);
        });
}
