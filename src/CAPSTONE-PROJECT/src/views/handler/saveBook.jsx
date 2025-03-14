import axiosClient from '../../axiosClient.js';

export function saveBook(book, user) {
  if (!book || !user) return;

  const bookQuery = {
    userId: user.id,
    bookId: book.id,
    title: book.title,
    author: book.authors.map((author) => author.name).join(", ") || "Unknown Author",
    cover: book.formats["image/jpeg"] || "https://via.placeholder.com/200",
    downloadCount: book.download_count,
    readFormat: book.formats["text/html"] || null,
    downloadFormat: book.formats["application/epub+zip"] || null,
  };

  axiosClient.post("/save-book", bookQuery)
    .then((response) => {
      console.log("Book saved successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error saving book:", error);
    });
}
