function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from "react";
import { readFile, readdir } from "node:fs/promises";
import sanitizeFilename from "https://esm.sh/sanitize-filename@1.6.3";
import ReactMarkdown from "https://esm.sh/react-markdown@8.0.7";
import readDirectory from "../utils/readdir.js";
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { addComment, getCommentsBySlug } from "./db2.js";
import parseMultipartFormData from "../utils/form.js";
async function handler(req) {
  const url = new URL(req.url);
  const slug = url.pathname;
  if (req.method === "POST") {
    console.log("req.method === 'POST'", url);
    let body = await req.text();
    let contentType = req.headers.get("content-type");
    let boundary = contentType.split("; ")[1].split("=")[1];
    // parse the form data
    let parsedBody = parseMultipartFormData(body, boundary);
    let slug = parsedBody.slug;
    let comment = parsedBody.comment;
    try {
      await addComment({
        slug,
        comment
      });
      return new Response("ok");
    } catch (error) {
      return new Response("error");
    }
  }
  if (slug === "/client.js") {
    sendScript({
      request: req,
      filename: "./client.js"
    });
  }
  try {
    if (url.searchParams.has("jsx")) {
      url.searchParams.delete("jsx");
      // RSC (lives in window.__INITIAL_CLIENT_JSX_STRING__)
      const clientJSXString = await sendJSX( /*#__PURE__*/React.createElement(Router, {
        url: url
      }));
      return new Response(clientJSXString, {
        headers: {
          "content-type": "application/json; charset=utf-8"
        }
      });
    } else {
      // SSR (1st load)
      const html = await sendHTML( /*#__PURE__*/React.createElement(Router, {
        url: url
      }));
      return new Response(html, {
        headers: {
          "content-type": "text/html; charset=utf-8"
        }
      });
    }
  } catch (err) {
    console.error(err);
    res.writeHead(err.statusCode ?? 500);
    res.end();
  }
}
serve(handler, {
  port: 8080
});
async function sendScript({
  request,
  filename
}) {
  return await fetch(filename, {
    headers: request.headers,
    method: request.method,
    body: request.body
  });
}
async function sendJSX(jsx) {
  const clientJSX = await renderJSXToClientJSX(jsx);
  const clientJSXString = JSON.stringify(clientJSX, stringifyJSX);
  return clientJSXString;
}
async function sendHTML(jsx) {
  const clientJSX = await renderJSXToClientJSX(jsx);
  let html = await renderToString(clientJSX);
  const clientJSXString = JSON.stringify(clientJSX, stringifyJSX);
  html += `<script>window.__INITIAL_CLIENT_JSX_STRING__ = `;
  html += JSON.stringify(clientJSXString).replace(/</g, "\\u003c"); // Escape the string
  html += `</script>`;
  html += `
    <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react@canary",
          "react-dom/client": "https://esm.sh/react-dom@canary/client"
        }
      }
    </script>
    <script type="module" src="/client.js"></script>
  `;
  return html;
}
async function renderJSXToClientJSX(jsx) {
  if (typeof jsx === "string" || typeof jsx === "number" || typeof jsx === "boolean" || jsx == null) {
    return jsx;
  } else if (Array.isArray(jsx)) {
    return Promise.all(jsx.map(child => renderJSXToClientJSX(child)));
  } else if (jsx != null && typeof jsx === "object") {
    if (jsx.$$typeof === Symbol.for("react.element")) {
      if (jsx.type === Symbol.for("react.fragment")) {
        return renderJSXToClientJSX(jsx.props.children);
      } else if (typeof jsx.type === "string") {
        return {
          ...jsx,
          props: await renderJSXToClientJSX(jsx.props)
        };
      } else if (typeof jsx.type === "function") {
        const Component = jsx.type;
        const props = jsx.props;
        const returnedJsx = await Component(props); // this is where server fetching happens
        // console.log("returnedJsx", returnedJsx);
        return renderJSXToClientJSX(returnedJsx);
      } else {
        console.log("jsx fragment", jsx);
        throw new Error("Not implemented.");
      }
    } else {
      return Object.fromEntries(await Promise.all(Object.entries(jsx).map(async ([propName, value]) => [propName, await renderJSXToClientJSX(value)])));
    }
  } else {
    console.log("jsx fragment", jsx);
    throw new Error("Not implemented");
  }
}
function stringifyJSX(key, value) {
  if (value === Symbol.for("react.element")) {
    // We can't pass a symbol, so pass our magic string instead.
    return "$RE"; // Could be arbitrary. I picked RE for React Element.
  } else if (typeof value === "string" && value.startsWith("$")) {
    // To avoid clashes, prepend an extra $ to any string already starting with $.
    return "$" + value;
  } else {
    return value;
  }
}
function throwNotFound(cause) {
  const notFound = new Error("Not found.", {
    cause
  });
  notFound.statusCode = 404;
  throw notFound;
}
export default function Router({
  url
}) {
  let page;
  if (url.pathname === "/") {
    console.log("in rsc server Router; url.pathname is /");
    page = /*#__PURE__*/React.createElement(BlogIndexPage, null);
  } else {
    console.log("in rsc server Router; url.pathname is not /");
    const postSlug = sanitizeFilename(url.pathname.slice(1));
    page = /*#__PURE__*/React.createElement(BlogPostPage, {
      postSlug: postSlug
    });
  }
  return /*#__PURE__*/React.createElement(BlogLayout, null, /*#__PURE__*/React.createElement(React.Fragment, {
    key: url.pathname
  }, page));
}
async function BlogIndexPage() {
  async function getPostSlugs() {
    const directoryPath = "./posts";
    const postFiles = await readDirectory(directoryPath);
    const postSlugs = postFiles.map(file => file.slice(0, file.lastIndexOf(".")));
    return postSlugs;
  }
  const postSlugs = await getPostSlugs();
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h1", null, "Welcome to my blog"), /*#__PURE__*/React.createElement("div", null, postSlugs.map(slug => /*#__PURE__*/React.createElement(Post, {
    key: slug,
    slug: slug
  }))));
}
function BlogPostPage({
  postSlug
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Post, {
    slug: postSlug
  }), /*#__PURE__*/React.createElement(CommentForm, {
    slug: postSlug
  }), /*#__PURE__*/React.createElement(Comments, {
    slug: postSlug
  }));
}
async function Post({
  slug
}) {
  let content;
  try {
    content = await readFile("./posts/" + slug + ".txt", "utf8");
  } catch (err) {
    throwNotFound(err);
  }
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement("a", {
    href: "/" + slug
  }, slug)), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement(ReactMarkdown, {
    children: content,
    components: {
      img: ({
        node,
        ...props
      }) => /*#__PURE__*/React.createElement("img", _extends({
        style: {
          maxWidth: "100%"
        }
      }, props))
    }
  })));
}
async function CommentForm({
  slug
}) {
  return /*#__PURE__*/React.createElement("form", {
    id: `${slug}-form`,
    action: `/${slug}`,
    method: "post"
  }, /*#__PURE__*/React.createElement("input", {
    hidden: true,
    readOnly: true,
    name: "slug",
    value: slug
  }), /*#__PURE__*/React.createElement("textarea", {
    name: "comment",
    required: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Post Comment"));
}
async function Comments({
  slug
}) {
  let comments;
  try {
    // const commentsFile = await readFile("./comments/comments.json", "utf8");
    // const allComments = JSON.parse(commentsFile);
    // comments = allComments.filter((comment) => comment.slug === slug);
    // const comments = await kv.get(["comments"]);
    comments = await getCommentsBySlug({
      slug
    });
    console.log("in RSC Comments; comments: ", comments, "slug: ", slug);
  } catch (err) {
    console.log("No comments found for post:", slug);
    throwNotFound(err);
  }
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", null, "Comments"), /*#__PURE__*/React.createElement("ul", null, comments?.map(comment => /*#__PURE__*/React.createElement("li", {
    key: comment.slug
  }, /*#__PURE__*/React.createElement("p", null, comment.comment), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("i", null, "by ", comment.author)), /*#__PURE__*/React.createElement("p", null, "at ", Date(comment.timestamp))))));
}
function BlogLayout({
  children
}) {
  const author = "Jae Doe";
  return /*#__PURE__*/React.createElement("html", null, /*#__PURE__*/React.createElement("head", null, /*#__PURE__*/React.createElement("title", null, "My blog")), /*#__PURE__*/React.createElement("body", null, /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("a", {
    href: "/"
  }, "Home"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("input", null), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement("main", null, children), /*#__PURE__*/React.createElement(Footer, {
    author: author
  })));
}
function Footer({
  author
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("i", null, "(c) ", author, " ", new Date().getFullYear()))));
}