# EDITED
EDITED: Task - Junior Python Developer

As part of the Edited team, you'll be responsible for keeping millions of products up-to-date.
Using python scrapy framework, or one of /puppeteer / cheerio / jsdom / scrape-it / protractor/ framework or without using any framework, you have to retrieve the information about the name, selected color, price and size of a single product located at [link](https://shop.mango.com/gb/women/skirts-midi/midi-satin-skirt_17042020.html?c=99).
Solution needs to include the navigation to the product page and extracting the data. Output the data needs to be in a json file.
Provide the solution as zip archive or link to repository.Following steps needs to be implemented:
 - request to load the page located at [link](https://shop.mango.com/bg-en/women/skirts-midi/midi-satin-skirt_17042020.html?c=99)
 - parse of the html
 - collect the data (name, price, selected default color and size)
 - output the data as json file, for example:
 ```
 {
  "name": String
  "price": Double,
  "color": String,
  "size": Array
}
```
