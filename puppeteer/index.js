import puppeteer from "puppeteer";

async function robo() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const moedaBase = "dolar";
  const moedaFinal = "real";
  const url = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}`;
  await page.goto(url);
  const resultado = await page.evaluate(() => {
    return document.querySelector(".lWzCpb.a61j6").value;
  });
  console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é ${resultado}`);
  //await browser.close();
}

robo();
