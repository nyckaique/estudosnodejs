import puppeteer from "puppeteer";

async function robo() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = `https://nutrifyapp.netlify.app/`;
  await page.goto(url);

  //await browser.close();
}

robo();
