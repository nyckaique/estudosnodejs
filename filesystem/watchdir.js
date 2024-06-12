import fs from "fs";

const dirPathName = "./diretorio";

fs.watch(dirPathName, (eventType, filename) => {
  if (filename) {
    console.log(`Evento: ${eventType}`);
    console.log(`Arquivo modificado: ${filename}`);
  } else {
    console.log("filename não fornecido");
  }
});
console.log(`Monitorando mudanças em ${dirPathName}`);
