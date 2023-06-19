import fs from "node:fs";
import path from "node:path";

function readDirectory(directoryPath) {
  try {
    // Read the contents of the directory
    const files = fs.readdirSync(directoryPath);

    // Filter out subdirectories and return only files
    const filesOnly = files.filter((file) => {
      const filePath = path.join(directoryPath, file);
      return fs.statSync(filePath).isFile();
    });

    return filesOnly;
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}

// Example usage
const directoryPath = "./posts";
const files = readDirectory(directoryPath);
console.log("Files:", files);
