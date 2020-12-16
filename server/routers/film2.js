const film2 = require('express').Router();
const puppeteer = require("puppeteer");

async function filem2(judul) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('http://cgvindo.fun/');

    await page.click('#HdTop > div > form > label', { delay: 300 });
    await page.type('#Tf-Search', `${judul}`);
    await page.keyboard.press('Enter')
    await page.waitForSelector('#post-48460 > article > a > div > figure', {delay: 300});
    let thumb = await page.$eval("#post-48460 > article > a > div > figure > img", (element) => {
        return element.getAttribute("src");
    });
    await page.click('#post-48460 > article > a > div > figure', { delay: 300 });
       
    await page.waitForSelector('#Tf-Wp > div.Tf-Wp > div > div.Main.Container > div > main > section > ul > li:nth-child(1) > div > a', {delay: 300});
    let video = await page.$eval('#Tf-Wp > div.Tf-Wp > div > div.Main.Container > div > main > section > ul > li:nth-child(1) > div > a', (element) => {
        return element.getAttribute("href");
    });
	let title = await page.$eval('#Tf-Wp > div.Tf-Wp > div > div.Main.Container > div > main > article > header > div > a:nth-child(1) > h1', el => el.innerText);
	let sinopsis = await page.$eval('#Tf-Wp > div.Tf-Wp > div > div.Main.Container > div > main > article > header > div > div.Description > p:nth-child(2)', el => el.innerText);
	browser.close();
    return { video, thumb, title, sinopsis}
}

film2.get('/', async (req, res) => {
    var judul = req.query.judul;
    const gets = await filem2(judul);
    res.json(gets)
});

module.exports = film2;
