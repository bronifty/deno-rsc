import { addComment, getCommentsBySlug } from "../server/db2.js";

let slug = "dog";
await addComment({ slug, comment: "bbb" });
const comments = await getCommentsBySlug({ slug });
console.log("comments: ", comments);
