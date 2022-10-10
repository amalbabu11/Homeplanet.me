"""
This script helps to download images of all stars provided by the API.
When running the program, it creates a dir in the working dir and stores
all images inside. It may take a long time to download all pictures, so
please be patient.
"""

import os
import re

import requests


def catch_pictures_link() -> list[tuple[str, str]]:
    """
    ret: `list[tuple[str, str]]` A list contains tuples, which consists of
    the name and corresponding url of each star.
    """
    url: str = r"https://in-the-sky.org/data/catalogue.php"
    sel_pattern: re.Pattern[str] = re.compile(
        r"<select class=\"slt cat\" name=\"cat\">.*?</select>"
    )
    value_pattern: re.Pattern[str] = re.compile(r"value=\"([ a-zA-Z]+?)\"")
    pager_pattern: re.Pattern[str] = re.compile(r"<div class='pager'>.*?</div>")
    link_pattern: re.Pattern[str] = re.compile(r"<a href='(.+?)'>")
    img_pattern: re.Pattern[str] = re.compile(
        r"<div class=\"imgholder\">"
        r"[\s\S]*?"
        r"<a href=\"https://\S+?id=(\S+?)\">"
        r"[\s\S]*?"
        r"<img src=\"(\S+?)\"\s+?alt=\"[\s\S]+?\"/>"
        r"[\s\S]*?"
        r"</a>"
        r"[\s\S]*?"
        r"</div>"
    )

    imgs_list: list[tuple[str, str]] = []

    resp: requests.Response = requests.get(url, timeout=10)
    assert resp.status_code == 200
    match_sel_res: list[str] = re.findall(sel_pattern, resp.text)
    assert match_sel_res is not None
    assert len(match_sel_res) == 1
    match_sel_res: str = match_sel_res[0]
    catalogs: list[str] = re.findall(value_pattern, match_sel_res)
    for catalog in catalogs:
        resp: requests.Response = requests.get(
            url=url, params={"cat": catalog}, timeout=10
        )
        assert resp.status_code == 200
        imgs_list += re.findall(img_pattern, resp.text)
        match_pages_res: list[str] = re.findall(pager_pattern, resp.text)
        assert len(match_pages_res) == 0 or len(match_pages_res) == 2
        if len(match_pages_res) == 2:
            assert match_pages_res[0] == match_pages_res[1]
            match_pages_res: str = match_pages_res[0]
            subpage_urls: list[str] = re.findall(link_pattern, match_pages_res)
            for subpage_url in subpage_urls:
                resp: requests.Response = requests.get(url=subpage_url, timeout=10)
                assert resp.status_code == 200
                imgs_list += re.findall(img_pattern, resp.text)
    return imgs_list


def download_images(links: list[tuple[str, str]]):
    """
    Download the image of stars from urls.
    """
    if not os.path.isdir("imgs"):
        os.makedirs("imgs")
    for name, link in links:
        name = name.strip()
        link = link.strip()
        resp = requests.get(link, timeout=10)
        assert resp.status_code == 200
        with open(f"imgs/{name}.png", "wb") as file:
            file.write(resp.content)


if __name__ == "__main__":
    download_images(catch_pictures_link())
