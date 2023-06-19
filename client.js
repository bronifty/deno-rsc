// import React from "https://esm.sh/react@canary";
// import ReactDOM, { hydrateRoot } from "https://esm.sh/react-dom@canary/client";
import { hydrateRoot } from "react-dom/client";

let currentPathname = window.location.pathname;

const root = hydrateRoot(document, getInitialClientJSX());

function getInitialClientJSX() {
  const clientJSX = JSON.parse(window.__INITIAL_CLIENT_JSX_STRING__, parseJSX);
  return clientJSX;
}

async function navigate(pathname) {
  currentPathname = pathname;
  console.log("calling navigate with pathname: ", pathname);
  const clientJSX = await fetchClientJSX(pathname);
  console.log("clientJSX", clientJSX);
  if (pathname === currentPathname) {
    root.render(clientJSX);
  }
  document.body.style.backgroundColor = getRandomColor();
}

async function fetchClientJSX(pathname) {
  console.log("in fetchClientJSX with pathname: ", pathname);
  let jsxPathname = pathname + "?jsx";
  console.log("about to fetch jsxPathname: ", jsxPathname);
  const response = await fetch(jsxPathname);
  const clientJSXString = await response.text();
  const clientJSX = JSON.parse(clientJSXString, parseJSX);
  console.log("retvrned with clientJSX", clientJSX);
  return clientJSX;
}

function parseJSX(key, value) {
  if (value === "$RE") {
    // This is our special marker we added on the server.
    // Restore the Symbol to tell React that this is valid JSX.
    return Symbol.for("react.element");
  } else if (typeof value === "string" && value.startsWith("$$")) {
    // This is a string starting with $. Remove the extra $ added by the server.
    return value.slice(1);
  } else {
    return value;
  }
}

window.addEventListener(
  "submit",
  async (e) => {
    // Only listen to form submissions.
    if (e.target.tagName !== "FORM") {
      return;
    }
    e.preventDefault();
    // clear the form

    console.log("in the window submit interceptor; e.target: ", e.target);
    let form = e.target;
    let slug = form.elements["slug"].value;
    let comment = form.elements["comment"].value;
    e.target.elements["comment"].value = "";
    console.log(slug, comment);
    const formData = new FormData();
    formData.append("slug", slug);
    formData.append("comment", comment);
    const response = await fetch(slug, {
      method: "POST",
      body: formData,
    });
    setTimeout(() => navigate(slug), 2000);
  },
  true
);

window.addEventListener(
  "click",
  async (e) => {
    // Only listen to link clicks.
    if (e.target.tagName !== "A") {
      return;
    }
    // Ignore "open in a new tab".
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    // Ignore external URLs.
    const href = e.target.getAttribute("href");
    if (!href.startsWith("/")) {
      return;
    }
    // Prevent the browser from reloading the page but update the URL.
    e.preventDefault();
    window.history.pushState(null, null, href);
    // Call our custom logic.
    navigate(href);
  },
  true
);

window.addEventListener("popstate", (event) => {
  // When the user presses Back/Forward, call our custom logic too.
  navigate(window.location.pathname);
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// turn the onSubmit handler into a function
async function handleComment(e) {
  //         const comment = e.target.elements.comment.value;
  //         const comments = await readFile(`./comments/${slug}.json`, "utf8");
  //         const commentId = comments.length
  //           ? comments[comments.length - 1].commentId + 1
  //           : 1;
  //         const newComment = { commentId, text: comment, timestamp: Date.now() };
  //         comments.push(newComment);
  //         await writeFile(
  //           `./comments/${slug}.json`,
  //           JSON.stringify(comments),
  //           "utf8"
  //         );
  //       }}>
}

// async function CommentForm({ slug }) {
//   return (
//     <form
//       id={slug + "-form"}
//       onSubmit={async (e) => {
//         e.preventDefault();
//         const comment = e.target.elements.comment.value;
//         const comments = await readFile(`./comments/${slug}.json`, "utf8");
//         const commentId = comments.length
//           ? comments[comments.length - 1].commentId + 1
//           : 1;
//         const newComment = { commentId, text: comment, timestamp: Date.now() };
//         comments.push(newComment);
//         await writeFile(
//           `./comments/${slug}.json`,
//           JSON.stringify(comments),
//           "utf8"
//         );
//       }}>
//       <textarea name="comment" required />
//       <button type="submit">Post Comment</button>
//     </form>
//   );
// }
