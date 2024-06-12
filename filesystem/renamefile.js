import fs from "fs";

const oldFilePathName = "./meuarquivo.txt";
const newFilePathName = "./meuarquivonovo.txt";

fs.rename(oldFilePathName, newFilePathName, (err) => {
  if (err) {
    console.error("Não foi possivel renomear: ", err);
  } else {
    console.log("Arquivo renomeado com sucesso!");
  }
});
