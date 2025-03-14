import axiosClient from '../../axiosClient.js';

export function removeBook(bookId, userId) {
  if (!bookId || !userId) return;

  axiosClient.delete(`/remove-book/${userId}/${bookId}`)
    .then(() => {
      console.log("Book removed successfully.");
    })
    .catch((error) => {
      alert("Error removing book:", error);
    });
}
