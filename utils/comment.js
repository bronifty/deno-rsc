import { writeFile, readFile } from "node:fs/promises";

async function commentWriter({ slug, comment, author }) {
  const commentsJSON = await readFile(`./comments/comments.json`, "utf8");
  // console.log("commentsJSON: ", commentsJSON);

  const comments = JSON.parse(commentsJSON);
  const commentId = comments.length
    ? comments[comments.length - 1].commentId + 1
    : 1;
  const newComment = {
    slug,
    comment,
    author,
    commentId,
    timestamp: Date.now(),
  };
  // console.log("comments: ", comments, "newComment: ", newComment);
  comments.push(newComment);
  await writeFile(`./comments/comments.json`, JSON.stringify(comments), "utf8");
}

function parseUrlEncodedData(data) {
  const pairs = data.split("&");
  const result = {};
  for (let pair of pairs) {
    const [key, value] = pair.split("=");
    result[decodeURIComponent(key)] = decodeURIComponent(
      value.replace(/\+/g, " ")
    );
  }
  return result;
}

async function handleComment(req, res, url) {
  const slug = url.searchParams.get("slug");
  // console.log("in handleComment: slug: ", slug, "url: ", url);
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const formData = parseUrlEncodedData(body);
    const comment = formData.comment;
    console.log("body: ", body, "comment: ", comment);
    await commentWriter({
      slug,
      comment,
      author: "John Doe",
    });
    res.end("Comment added successfully.");
  });
  // throwing in an extra return for good measure; delete this
  return;
}

export default handleComment;
