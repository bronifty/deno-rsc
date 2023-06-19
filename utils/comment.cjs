const { writeFile, readFile } = require("node:fs/promises");
// import formidable from "https://esm.sh/formidable";
const formidable = require("formidable");

// [{"slug":"cat-api","comment":"cat comment","author":"John Doe","commentId":1,"timestamp":1686221998058}]
interface Comment {
  slug: string;
  comment: string;
  author: string;
  commentId: number;
  timestamp: number;
}

const comments: Comment[] = [
  {
    slug: "cat-api",
    comment: "cat comment",
    author: "John Doe",
    commentId: 1,
    timestamp: 1686221998058,
  },
];

// Example usage
comments.forEach((comment) => {
  console.log(comment.author + " said: " + comment.comment);
});

async function commentWriter({ slug, comment, author }) {
  let commentsJSON = [];
  commentsJSON = await readFile(`./comments/comments.json`, "utf8");
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
  const form = new formidable.IncomingForm();
  let slug;
  let comment;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end();
      return;
    }

    slug = fields.slug;
    comment = fields.comment;
    console.log(
      "in handleComment formidable form.parse; slug: ",
      slug,
      "comment: ",
      comment
    );
    await commentWriter({
      slug,
      comment,
      author: "John Doe",
    });
    res.end("Comment added successfully.");
  });
}

async function handleCommentServer(req, res, url) {
  console.log("in handleComment, url: ", url);
  const slug = url.searchParams.get("slug");
  // console.log("in handleComment: slug: ", slug, "url: ", url);
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const formData = parseUrlEncodedData(body);
    const comment = formData.get("comment");
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

module.exports = handleComment;
// export default handleComment;
