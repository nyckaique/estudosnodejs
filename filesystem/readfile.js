import fs from "fs";

const filePathName = "./meuarquivo.txt";

fs.readFile(filePathName, "utf-8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo:", err);
  } else {
    console.log("Conteúdo do arquivo: ", data);
  }
});
