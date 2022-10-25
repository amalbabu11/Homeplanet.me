from re import L
from bs4 import BeautifulSoup
import requests
import pandas as pd

wiki_url = "https://en.wikipedia.org/wiki/List_of_natural_satellites"

classes = "wikitable sortable"

response = requests.get(wiki_url)
# print(response.text)

# with open ('out.text' , 'w') as f:
#     f.write(response.text)

soup = BeautifulSoup(response.text, 'html.parser')
# print(soup)

moon_table = soup.find('table', attrs={"class" : classes})



rows = moon_table.find_all('tr')
# with open ('out.text' , 'w') as f:
#     f.write(str(rows[1]))
# print(rows)


mappings = {}

for i in range(1, len(rows)):
    row = rows[i]
    rowData = row.find_all('td')
    image = rowData[0].find('img')
    if image is not None:
        image = image['src']
    
    name = rowData[3].find('a')
    if name is not None:
        name = name.text


    mappings[name] = image


import json
with open('MoonImages.json', 'w') as fp:
    json.dump(mappings, fp)



# print(mappings)

# images = moon_table.find_all('img')
# print(len(images))
# # src = []
# # for image in images:
# #     if image[src] is None:
# #         src.append("")
# #     else:
# #         src.append('https:' + print(image['src']))

# # # print(src)
# table = pd.read_html(str(moon_table))
# table = table[0]
# # # print(table.columns)
# table['Name'] = table['Name'].apply(lambda d: d.strip.lower())
# table['Image'] = table.Name.apply(lambda d: mappings[d] if d in mappings else None)
# print(table.Name)

# print(table.Name)
# # print(table.Image)
# for mapping in mappings:
#     print(mapping)



# print(table)

