import fs from "fs";

const filePathName = "./meuarquivo.txt";

fs.unlink(filePathName, (err) => {
  if (err) {
    console.error("Erro ao remover arquivo: ", err);
  } else {
    console.log("Sucesso ao remover arquivo!");
  }
});
