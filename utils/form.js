export default function parseMultipartFormData(body, boundary) {
  let result = {};
  // Split the body string into individual parts
  let parts = body.split("--" + boundary).slice(1, -1);

  parts.forEach((part) => {
    // Split each part into lines
    let lines = part.split("\r\n").filter((line) => line);
    // The first line should contain the "Content-Disposition" header
    let contentDisposition = lines[0];
    // The field name is inside quotes after 'name='
    let fieldName = contentDisposition.split(";")[1].split("=")[1];
    fieldName = fieldName.replace(/"/g, "").trim(); // Remove the quotes around the field name
    // The field value is on the last line
    let fieldValue = lines[lines.length - 1].trim();
    // Add this field to the result
    result[fieldName] = fieldValue;
  });

  return result;
}

// let body = `------WebKitFormBoundarydEwf8S2BzSpBrhK4
// Content-Disposition: form-data; name="slug"

// test
// ------WebKitFormBoundarydEwf8S2BzSpBrhK4
// Content-Disposition: form-data; name="comment"

// abc
// ------WebKitFormBoundarydEwf8S2BzSpBrhK4--`;

// let boundary = "WebKitFormBoundarydEwf8S2BzSpBrhK4";
// let parsedBody = parseMultipartFormData(body, boundary);

// console.log(parsedBody);

export function throwNotFound(cause) {
  const notFound = new Error("Not found.", { cause });
  notFound.statusCode = 404;
  throw notFound;
}
