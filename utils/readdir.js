import fs from "node:fs";
import path from "node:path";

async function readDirectory(directoryPath) {
  try {
    // Read the contents of the directory
    const files = await fs.promises.readdir(directoryPath);

    // Filter out subdirectories and return only files
    const filesOnly = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(directoryPath, file);
        const stat = await fs.promises.lstat(filePath);
        if (stat.isFile()) {
          return file;
        }
        return null;
      })
    );

    return filesOnly.filter(Boolean);
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}

export default readDirectory;
// Example usage
// const directoryPath = "./posts";
// readDirectory(directoryPath)
//   .then((files) => {
//     console.log("Files:", files);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
