const puppeteer = require('puppeteer');
const saveData = require('./saveData');


async function scrapeProduct(url){
    // request to load the page
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto(url);
    // collect name
    const name = await page
    .$eval(
        'h1.product-name', 
        el => el.textContent
        );
    // collect color
    const color = await page
    .$eval(
        'div.colors-info > span.colors-info-name', 
        el2 => el2.textContent
        );
    // collect price
    let price = await page
    .$eval(
        'div.product-prices > span.product-sale.product-sale--discount', 
        el3 => el3.textContent
        );
    price =  Number(price.slice(1));
    // collect size
    const size = [];    
    const sizeOptions = await page
    .$$eval(
        '#sizeSelector > div > span', 
        options => { return options.map(option => option.innerText) }
        );
    sizeOptions.forEach(option => {
        const [sizes, availability] = option.split(' - ');
        const obj = {};
        if (sizes){
            availability !== undefined 
            ? obj[sizes] = availability 
            : obj[sizes] = "Available";
            size.push(obj);  
        };
    });    
    // output the data as json file
    saveData({name, color, price, size}, 'edited.json');
    browser.close();
};

scrapeProduct('https://shop.mango.com/gb/women/skirts-midi/midi-satin-skirt_17042020.html?c=99');