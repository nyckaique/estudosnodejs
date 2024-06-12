import fs from "fs";
//reading html files
const dirPathName = "./diretorio";
const listFiles = (list) => list.filter((file) => file.endsWith(".html"));
fs.readdir(dirPathName, (err, files) => {
  if (err) {
    console.error("Erro ao ler o diretorio:", err);
  } else {
    const htmlFiles = listFiles(files);
    console.log("Conteúdo do diretorio: ", htmlFiles);
  }
});
