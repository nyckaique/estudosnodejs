import fs from "fs";

const filePathName = "meuarquivo.txt";
const fileContent = "Meu arquivo de teste";

fs.writeFile(filePathName, fileContent, (err) => {
  if (err) {
    console.error("Erro ao escrever o arquivo:", err);
  } else {
    console.log("Arquivo escrito com sucesso!");
  }
});
