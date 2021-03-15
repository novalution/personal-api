const film = require('express').Router();
const puppeteer = require('puppeteer');

async function getVideo(filems) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
})
const page = await browser.newPage();
await page.goto('http://149.56.24.226/',{delay:1000});
await page.type('body > header > nav.top.navbar.navbar-inverse.hidden-xs > div > form > div > div > span.typeahead__query > input',`${filems}`,{delay:300})
await page.type('body > header > nav.top.navbar.navbar-inverse.hidden-xs > div > form > div > div > span.typeahead__query > input',`${filems}`,{delay:300})
await page.click('body > header > nav.top.navbar.navbar-inverse.hidden-xs > div > form > div > div > span.typeahead__button > button',{delay:1000})
await page.waitForSelector('body > main > div > section > div:nth-child(2) > div > div > div:nth-child(2) > div > div.col-xs-9.col-sm-10.search-content > h2 > a',{delay:1000})
await page.click('body > main > div > section > div:nth-child(2) > div > div > div:nth-child(2) > div > div.col-xs-9.col-sm-10.search-content > h2 > a',{delay:1000})
await page.waitForSelector('#download-movie > a.btn.btn-success',{delay:1000})
let video = await page.$eval('#download-movie > a.btn.btn-success', (element) => {
    return element.getAttribute("href");
    });
//   //let thumb = await page.$eval('#movie-detail > div > div.col-xs-2.content-poster > figure > img', (element) => {
//     return element.getAttribute("src");
//     });
let juduls = await page.$eval('#download-movie > h2', el => el.innerText);
let sinopsis = await page.$eval('#movie-detail > div > div.col-xs-10.content > blockquote', el => el.innerText);

browser.close();
  return { video, juduls,sinopsis}
}
film.get('/', async (req, res) => {
    var filems = req.query.filems;
    const gets = await getVideo(filems);
    res.json(gets)
});
module.exports = film;
