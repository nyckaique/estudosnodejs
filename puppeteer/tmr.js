import puppeteer from "puppeteer";
import XLSX from "xlsx";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();
const usuario = process.env.USUARIO;
const senha = process.env.SENHA;

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function robo() {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
      "--disable-site-isolation-trials",
      "--disable-blink-features=AutomationControlled",
    ],
  });
  const page = await browser.newPage();
  const loginUrl = `https://allfreelancersclone.my.stacker.app/login`;
  await page.goto(loginUrl, {
    waitUntil: "load", // Espera que todas as conexões de rede sejam fechadas
  });
  await page.type(".stk-email-input .chakra-input", usuario, {
    delay: 100,
  });
  await page.type(".stk-password-input .chakra-input", senha, {
    delay: 100,
  });
  await page.click(".stk-login-button");
  await page.waitForNavigation({
    waitUntil: "load",
  });

  const normalOrdersUrl =
    "https://allfreelancersclone.my.stacker.app/normal-orders-to-take";

  while (true) {
    // Runs the `//h2` as the XPath expression.
    const element = await page.$(
      '::-p-xpath(//section[@id="table-container"]/div[1]/div[1]/table[1]/tbody[1]/tr[last()]/td[1]/div[1])'
    );
    // const order = await page.$(".admin-table-item");
    if (element) {
      console.log("achou order");
      await element.click();
      await page.waitForNavigation({
        waitUntil: "load",
      });

      // Aguarda até que o seletor .admin-detail-view-edit-button esteja disponível na página
      console.log("esperando aparecer o botão de edit");
      await page.waitForSelector(
        ".chakra-button.admin-detail-view-edit-button",
        {
          visible: true,
        }
      );
      console.log("botão de edit apareceu");

      await page.evaluate(() => {
        document
          .querySelector(".chakra-button.admin-detail-view-edit-button")
          .click();
      });
      console.log("clicou em edit");

      console.log("esperando aparecer o seletor");
      await page.waitForSelector('[id^="react-select-"]', {
        visible: true,
      });
      console.log("seletor apareceu");

      await page.type('[id^="react-select-"]', "gabrielcarati", { delay: 100 });
      console.log("digitou gabrielcarati");

      await page.keyboard.down("Enter");
      await delay(300);
      await page.keyboard.up("Enter");

      /*
      await page.evaluate(() => {
        document.querySelector(".stk-save-button").click();
      });
      console.log("clicou no botão de save");
      */

      await delay(3000);
      console.log("esperou 3 segundos para salvar e sair da página");

      // Captura a URL atual
      const currentUrl = await page.url();
      console.log(`Current URL: ${currentUrl}`);

      // Captura o texto do seletor
      const text = await page.evaluate(() => {
        return document.querySelector(".stacker-data-block .stk-text")
          .innerText;
      });
      console.log(`Text: ${text}`);

      // Captura a hora atual em GMT
      const currentTimeGMT = new Date().toISOString();
      console.log(`Current Time GMT: ${currentTimeGMT}`);

      // Salva as informações na planilha
      await saveToSpreadsheet(currentUrl, text, currentTimeGMT);

      await page.goto(normalOrdersUrl, {
        waitUntil: "load", // Espera que todas as conexões de rede sejam fechadas
      });
    } else {
      await delay(5000);
      await page.reload({
        waitUntil: "load", // Espera que todas as conexões de rede sejam fechadas
      });
    }
  }

  //await browser.close();
}

// Função para salvar os dados na planilha
async function saveToSpreadsheet(url, text, time) {
  const filePath = "orders.xlsx";
  let workbook;
  let worksheet;

  if (fs.existsSync(filePath)) {
    // Se o arquivo existe, lê o conteúdo
    workbook = XLSX.readFile(filePath);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    // Se o arquivo não existe, cria um novo
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.aoa_to_sheet([["Text", "URL", "Time"]]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  }

  // Converte a planilha para um array de arrays
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Adiciona a nova linha de dados
  data.push([text, url, time]);

  // Converte de volta para uma planilha
  const newWorksheet = XLSX.utils.aoa_to_sheet(data);
  workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;

  // Escreve o arquivo
  XLSX.writeFile(workbook, filePath);
}

robo();
