import fs from "fs";

const filePathName = "./meuarquivo.txt";

fs.watchFile(filePathName, (curr, prev) => {
  console.log(`O arquivo foi modificado`);
  console.log(`Anterior: ${prev.mtime}`);
  console.log(`Atual: ${curr.mtime}`);
});

console.log(`Monitorando mudanças em ${filePathName}`);
