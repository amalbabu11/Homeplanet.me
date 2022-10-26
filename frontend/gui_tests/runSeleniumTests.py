# credit to: https://gitlab.com/JohnPowow/animalwatch/

import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

# from selenium.webdriver.chrome.service import Service # comment out before pushing

import sys

PATH = "./frontend/gui_tests/chromedriver.exe"
URL = "https://homeplanet.me/"
# driver= webdriver.Chrome()

class SeleniumTests(unittest.TestCase):

    def setUp(self):
        # service = Service(PATH) # comment out before pushing
        testoptions = Options()
        testoptions.add_argument("--headless")
        testoptions.add_argument("--no-default-browser-check")
        testoptions.add_argument("--no-sandbox")
        testoptions.add_argument("--disable-gpu")
        self.driver = webdriver.Chrome(options=testoptions) # service=service
        self.driver.get(URL)

    def tearDown(self):
        self.driver.quit()

    # Test 1: test successful loading of the page
    def testTitle(self):
        title = self.driver.title
        self.assertEqual(title, "HomePlanet")


if name == "main":
    unittest.main(argv=['first-arg-is-ignored'])
    