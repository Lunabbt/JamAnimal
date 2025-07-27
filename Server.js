const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/stream", async (req, res) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
  );

  await page.goto("https://www.animaljam.com/en/play", {
    waitUntil: "networkidle2"
  });

  const html = await page.content();
  res.send(html);

  setTimeout(() => browser.close(), 2 * 60 * 1000);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
