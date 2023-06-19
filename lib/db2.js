const kv = await Deno.openKv();
// const kv = await Deno.openKv("./data/sql.db");
export async function addComment({
  slug,
  comment
}) {
  const data = {
    slug,
    comment,
    author: "anonymous",
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString()
  };
  await kv.set(["comments", slug, data.id], data);
}
export async function getCommentsBySlug({
  slug
}) {
  const comments = [];
  for await (const res of kv.list({
    prefix: ["comments", slug]
  })) {
    comments.push(res.value);
  }
  console.log("in getCommentsBySlug; slug: ", slug, "comments: ", comments);
  return comments;
}

// usage example:
// await addComment({ slug: "test", comment: "aaaaa" });
// const comments = await getCommentsBySlug({ slug: "test" });
// console.log("comments: ", comments);