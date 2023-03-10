"""
This script helps to download images of all stars provided by the API.
When running the program, it creates a dir in the working dir and stores
all images inside. It may take a long time to download all pictures, so
please be patient.

Note: for some non-ascii characters, they will be converted into ascii
characters and store as the file name. For example, alpha will be stored
as "&alpha;". So remember to make this transformantion manually when
programming the server.
"""

import json
import os
import re
from concurrent.futures import ThreadPoolExecutor

import requests

url: str = r"https://in-the-sky.org/data/catalogue.php"
sel_pattern: re.Pattern[str] = re.compile(
    r"<select class=\"slt cat\" name=\"cat\">.*?</select>"
)
value_pattern: re.Pattern[str] = re.compile(r"value=\"([ a-zA-Z]+?)\"")
pager_pattern: re.Pattern[str] = re.compile(r"<div class='pager'>.*?</div>")
link_pattern: re.Pattern[str] = re.compile(r"<a href='(.+?)'>")
img_pattern: re.Pattern[str] = re.compile(
    r"<div class=\"item bg_f0\">"
    r"[\s\S]*?"
    r"<b>"
    r"[\s\S]*?"
    r"<a href=\"\S+?\">"
    r"([\s\S]*?)"
    r"</a>"
    r"[\s\S]*?"
    r"</b>"
    r"[\s\S]*?"
    r"<div class=\"imgholder\">"
    r"[\s\S]*?"
    r"<a href=\"https://\S+?id=\S+?\">"
    r"[\s\S]*?"
    r"<img src=\"(\S+?)\"\s+?alt=\"[\s\S]+?\"/>"
    r"[\s\S]*?"
    r"</a>"
    r"[\s\S]*?"
    r"</div>"
    r"[\s\S]*?"
    r"</div>"
)


def catch_catalog_link() -> list[str]:
    """
    ret:    `list[tuple[str, str]]` A list contains tuples, which consists of
    the name and corresponding url of each star.
    """

    resp: requests.Response = requests.get(url, timeout=10)
    assert resp.status_code == 200
    match_sel_res: list[str] = sel_pattern.findall(resp.text)
    assert match_sel_res is not None
    assert len(match_sel_res) == 1
    match_sel_res: str = match_sel_res[0]
    catalogs: list[str] = value_pattern.findall(match_sel_res)
    return catalogs


def catch_subpage_link(catalog: str) -> tuple[list[tuple[str, str]], list[str]]:
    """
    args:   `catalog`, `str`
    ret:    `tuple[list[tuple[str, str]], list[str]]`
    """
    resp: requests.Response = requests.get(
        url=url, params={"cat": catalog}, timeout=10)
    assert resp.status_code == 200
    imgs_list: list[tuple[str, str]] = img_pattern.findall(resp.text)
    match_pages_res: list[str] = pager_pattern.findall(resp.text)
    assert len(match_pages_res) == 0 or len(match_pages_res) == 2
    if len(match_pages_res) == 2:
        assert match_pages_res[0] == match_pages_res[1]
        match_pages_res: str = match_pages_res[0]
        subpage_urls: list[str] = re.findall(link_pattern, match_pages_res)
    else:
        subpage_urls: list[str] = []
    return imgs_list, subpage_urls


def catch_image_link(subpage_url: str) -> list[tuple[str, str]]:
    """
    args:   `subpage_url`, `str`
    ret:    `list[tuple[str, str]]`
    """
    resp: requests.Response = requests.get(url=subpage_url, timeout=10)
    assert resp.status_code == 200
    imgs_list: list[tuple[str, str]] = re.findall(img_pattern, resp.text)
    return imgs_list


def download_image_links() -> str:
    greek_chars_pattern: re.Pattern[str] = re.compile(r"&[a-zA-Z]+?;")
    useless_pattern: re.Pattern[str] = re.compile(r"&#x[0-9a-zA-Z]+?;")
    imgs_collection: dict = dict()
    if not os.path.isdir("imgs"):
        os.makedirs("imgs")
    executor = ThreadPoolExecutor()
    catalogs = catch_catalog_link()
    for imgs_list, subpage_urls in executor.map(catch_subpage_link, catalogs):
        for new_imgs_list in executor.map(catch_image_link, subpage_urls):
            imgs_list += new_imgs_list
        for key, value in imgs_list:

            def name_clean(name: str) -> str:
                name = name.replace("<span style='text-transform:none;'>", "")
                name = name.replace("</span>", "")
                greek_chars = greek_chars_pattern.findall(name)
                assert len(greek_chars) == 0 or len(greek_chars) == 1
                if len(greek_chars) == 1:
                    name = name.replace(
                        greek_chars[0], greek_chars[0][1:-1][0:3])
                useless_chars = useless_pattern.findall(name)
                assert len(useless_chars) == 0 or len(useless_chars) == 1
                if len(useless_chars) == 1:
                    name = name.replace(useless_chars[0], "")
                return name

            key = name_clean(key)
            key = key.strip()
            value = value.strip()
            imgs_collection[key] = value
    return json.dumps(imgs_collection)

if __name__ == "__main__":
    print(download_image_links())