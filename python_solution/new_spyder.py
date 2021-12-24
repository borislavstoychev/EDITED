import requests
import json


class ScrapeProduc:
    def __init__(self):
        self.headers = {
            "Accept":	"*/*",
            "Accept-Encoding":	"gzip, deflate, br",
            "Accept-Language":	"en-US,en;q=0.5",
            "Host":	"shop.mango.com",
            "Referer": "https://shop.mango.com/gb/women/skirts-midi/midi-satin-skirt_17042020.html?c=99",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "stock-id": "006.IN.0.true.false.v0",
            "TE": "trailers",
            "User-Agent":	"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:95.0) Gecko/20100101 Firefox/95.0"
        }

    def set_url(self):
        return f"https://shop.mango.com/services/garments/1704202099"

    def make_request(self):
        url = self.set_url()
        return requests.request("GET",url,headers=self.headers)

    def get_data(self):
        self.data = self.make_request().json()

    def save_data(self, data):
        with open('edited.json',"w", encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False, indent=4)

    def crawl(self):
        data = []
        self.make_request()
        self.get_data()
        name = self.data['name']
        for colors in self.data['colors']['colors']:
            size = []
            color = colors['label']
            price = colors['price']
            sizes = colors['sizes']
            for s in sizes[1:]:
                if 'available' in s:
                    size.append({s['value']: s['available']})
                else:
                    size.append({s['value']: False})
            data.append({"name": name, "color": color, "price": price, "size": size})
        self.save_data(data)        

if __name__ == "__main__":
    scraper = ScrapeProduc()
    scraper.crawl()