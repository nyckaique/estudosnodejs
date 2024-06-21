import puppeteer from "puppeteer";

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
  const url = `https://nutrifyapp.netlify.app/`;
  await page.goto(url);
  await page.waitForNavigation();
  const acessoParaTeste = await page.waitForSelector(".mt-2.underline");
  await acessoParaTeste.click();
  const loginButton = await page.waitForSelector(".button-orange");
  await loginButton.click();
  await page.waitForNavigation();
  await page.locator("input").fill("rafael");
  // const buscarNomeInput = await page.waitForSelector("table > input");
  // await buscarNomeInput.
  //await browser.close();
}

robo();
