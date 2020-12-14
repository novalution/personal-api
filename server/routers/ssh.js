const film = require('express').Router();
const puppeteer = require("puppeteer");

async function getVideo(judul) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('http://149.56.24.226/');

    await page.type('body > header > nav.top.navbar.navbar-inverse.hidden-xs > div > form > div > div > span.typeahead__query > input', `${judul}`);
    await page.click('body > header > nav.top.navbar.navbar-inverse.hidden-xs > div > form > div > div > span.typeahead__button > button', { delay: 300 });

    await page.waitForSelector('body > main > div > section > div:nth-child(2) > div > div > div:nth-child(2) > div > div.col-xs-9.col-sm-10.search-content > h2 > a', {delay: 300});
    let mp4direct = await page.$eval('body > main > div > section > div:nth-child(2) > div > div > div:nth-child(2) > div > div.col-xs-9.col-sm-10.search-content > h2 > a', (element) => {
        return element.getAttribute("href");
    });
    let image = await page.$eval("body > main > div > section > div:nth-child(2) > div > div > div:nth-child(2) > div > div.col-xs-3.col-sm-2.search-poster > figure > a > img", (element) => {
        return element.getAttribute("src");
    });
	let nameInfo = await page.$eval('body > main > div > section > div:nth-child(2) > div > div > div:nth-child(2) > div > div.col-xs-9.col-sm-10.search-content > h2', el => el.innerText);
//	let textInfo = await page.$eval('#post-header > a:tittle', el => el.innerText);
	browser.close();
    return { mp4direct, image, nameInfo }
}

film.get('/', async (req, res) => {
    var judul = req.query.judul;
    const gets = await getVideo(judul);
    res.json(gets)
});

module.exports = film;
