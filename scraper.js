const puppeteer = require('puppeteer');
const saveData = require('./saveData');


async function scrapeProduct(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto(url)

    const [el] = await page.$x('//html/body/div[5]/div/form/div[2]/div[1]/main/div/div[3]/div[1]/div[1]/h1');
    const txt = await el.getProperty('textContent');
    const name = await txt.jsonValue();

    const [el2] = await page.$x('//html/body/div[5]/div/form/div[2]/div[1]/main/div/div[3]/div[2]/div[2]/span');
    const txt2 = await el2.getProperty('textContent');
    const color = await txt2.jsonValue();

    const [el3] = await page.$x('//html/body/div[5]/div/form/div[2]/div[1]/main/div/div[3]/div[1]/div[2]/span[4]');
    const txt3 = await el3.getProperty('textContent');
    let price = await txt3.jsonValue();
    price =  Number(price.slice(1));

    const [el4] = await page.$x('//html/body/div[5]/div/form/div[2]/div[1]/main/div/div[3]/div[3]/form/div[2]/div/div');
    const txt4 = await el4.getProperty('textContent');
    let result = await txt4.jsonValue();
    const size = [];
    // console.log(result.match(/XS(\s-\s\w+\s\w+)?|S(?1)?|M(?1)?|L(?1)?|XL(?1)?/gm))
    
    result.match(/(XS|S|M|L|XL)(\s-\s\w+\s\w+)?/gm)
    .forEach(element => {
        const [sizes, availability] = element.split(' - ')
        const obj = {};
        if (sizes){
            availability !== undefined ? obj[sizes] = availability : obj[sizes] = "Available"
            size.push(obj)    
        };
    });

    saveData({name, color, price, size}, 'edited.json');
    browser.close();
};


scrapeProduct('https://shop.mango.com/gb/women/skirts-midi/midi-satin-skirt_17042020.html?c=99')