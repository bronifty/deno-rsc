import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { readFile } from "node:fs/promises";
import { renderToString } from "react-dom/server";
import parseMultipartFormData from "../utils/form.js";
import { addComment, getCommentsBySlug } from "./db2.js";

async function handler(req) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const slug = url.pathname;
  try {
    if (slug === "/client.js") {
      console.log("url.pathname === '/client.js'", url);
      const content = await readFile("./client.js", "utf8");
      return new Response(content, {
        headers: {
          "Content-Type": "text/javascript",
        },
      });
    }
    if (req.method === "POST") {
      console.log("req.method === 'POST'", url);
      let body = await req.text();
      let contentType = req.headers.get("content-type");
      let boundary = contentType.split("; ")[1].split("=")[1];
      // parse the form data
      let parsedBody = parseMultipartFormData(body, boundary);
      let slug = parsedBody.slug;
      let comment = parsedBody.comment;

      await addComment({ slug, comment });
      const comments = await getCommentsBySlug({ slug });
      console.log("comments: ", comments);

      return new Response(
        "Received POST request with slug: " + slug + " and comment: " + comment
      );
    }

    console.log(
      "in ssr server about to make a call to rsc with url.pathname as slug: ",
      slug
    );
    const response = await fetch("http://127.0.0.1:8081" + url.pathname);
    if (!response.ok) {
      return new Response("error from rsc server");
    }
    const clientJSXString = await response.text();
    console.log("back in ssr server with response from rsc of clientJSXString");
    if (url.searchParams.has("jsx")) {
      console.log(
        "in ssr server with response from rsc of clientJSXString; url.searchParams.has('jsx')"
      );
      // res.setHeader("Content-Type", "application/json");
      // res.end(clientJSXString);
      return new Response(clientJSXString, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      const clientJSX = await JSON.parse(clientJSXString, parseJSX);
      let html = renderToString(clientJSX);
      html += `<script>window.__INITIAL_CLIENT_JSX_STRING__ = `;
      html += JSON.stringify(clientJSXString).replace(/</g, "\\u003c");
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
        <script>
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        document.body.style.backgroundColor = getRandomColor();
    </script>
    <style>
        body {
            /* Transition the background-color property over 1 second */
            transition: background-color 1s;
        }
    </style>
      `;
      // res.setHeader("Content-Type", "text/html");
      // res.end(html);
      return new Response(html, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }
  } catch (err) {
    console.error(err);
    // res.statusCode = err.statusCode ?? 500;
    // res.end();
    return new Response("error");
  }
}

serve(handler, { port: 8080 });

// reviver function
function parseJSX(key, value) {
  if (value === "$RE") {
    return Symbol.for("react.element");
  } else if (typeof value === "string" && value.startsWith("$$")) {
    return value.slice(1);
  } else {
    return value;
  }
}
