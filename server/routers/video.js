const video = require('express').Router();
const puppeteer = require("puppeteer");

async function vid(link) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
      const page = await browser.newPage();
      await page.goto('https://id.savefrom.net/7/',{delay:1000})
      await page.type('#sf_url',`${link}`)
      await page.click('#sf_submit',{delay:1000})
      await page.waitForSelector('#sf_result > div > div.result-box.video > div.info-box > div.link-box > div.def-btn-box > a',{delay:15000})
      let video = await page.$eval('#sf_result > div > div.result-box.video > div.info-box > div.link-box > div.def-btn-box > a', (element) => {
          return element.getAttribute("href");
        });
    browser.close();
    return{video}
}


video.get('/', async (req, res) => {
    var link = req.query.link;
    const gets = await vid(link);
    res.json(gets)
});

module.exports = video;
