import axiosClient from "../../axiosClient";

export function readOnlineBtn(book, user) {
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

    axiosClient.post("/read-history", bookQuery)
        .then(response => {
            console.log("Reading history updated:", response.data);
        })
        .catch(error => {
            console.error("Error updating reading history:", error);
        });

}