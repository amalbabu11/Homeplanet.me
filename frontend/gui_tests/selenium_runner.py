# selenium test format code from group TexasVotes: https://gitlab.com/forbesye/fitsbits/-/blob/master/front-end/guitests.py
# example tests from group Drive Responsibly: https://gitlab.com/ethanzh/drive-responsibly/-/blob/main/frontend/gui_tests/splashTests.py

import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.chrome.service import Service # comment out before pushing

import sys

PATH = "./frontend/gui_tests/chromedriver.exe"
# URL = "https://main.d2etp2sj08ud8d.amplifyapp.com"



class SeleniumTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # service = Service(PATH) # comment out before pushing
        # testoptions = Options()
        # testoptions.add_argument("--headless")
        # testoptions.add_argument("--no-default-browser-check")
        # testoptions.add_argument("--no-sandbox")
        # testoptions.add_argument("--disable-gpu")
        # self.driver = webdriver.Chrome(
        #     service=Service(ChromeDriverManager().install()), options=testoptions
        # )
        cls.link = "https://homeplanet.me/"
        ops = Options()
        ops.add_argument("--headless")
        ops.add_argument("--disable-gpu")
        ops.add_argument("--window-size=1280,800")
        ops.add_argument("--allow-insecure-localhost")
        ops.add_argument("--log-level=3")
        ops.add_argument("--no-sandbox")
        ops.add_argument("--disable-dev-shm-usage")
        cls.driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()), options=ops
        )
        cls.driver.get(cls.link)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def waitForLoad(self):
        try:
            a = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.PARTIAL_LINK_TEXT, "HomePlanet"))
            )
        except Exception as e:
            self.assertEqual(True, False)


    # Test 1: test successful loading of the page
    def testTitle(self):
        title = self.driver.title
        self.assertEqual(title, "HomePlanet")

    # Test 2: test Planets URL
    def testPlanetsURL(self):
        element = self.driver.find_elements(By.CLASS_NAME, "nav-link")[0]
        newURL = element.get_attribute('href')

        self.assertEqual(newURL, "https://www.homeplanet.me/Planets")

    # Test 3: test Moons Page URL
    def testMoonsURL(self):
        element = self.driver.find_elements(By.CLASS_NAME, "nav-link")[1]
        newURL = element.get_attribute('href')

        self.assertEqual(newURL, "https://www.homeplanet.me/Moons")

    # Test 4: test Stars Page URL
    def testStarsURL(self):
        element = self.driver.find_elements(By.CLASS_NAME, "nav-link")[2]
        newURL = element.get_attribute('href')

        self.assertEqual(newURL, "https://www.homeplanet.me/Stars")

    # Test 5: test that the Planets page loads successfully
    def testPlanetsLoading(self):
        self.driver.get("https://www.homeplanet.me/Planets")
        element = self.driver.find_element(By.TAG_NAME, "h1")

        self.assertEqual(element.text, "Planets")
        self.driver.get(self.link)

    # Test 6: test that the Moons page loads successfully
    def testMoonsLoading(self):
        self.driver.get("https://www.homeplanet.me/Moons")
        element = self.driver.find_element(By.TAG_NAME, "h1")

        self.assertEqual(element.text, "Moons")
        self.driver.get(self.link)

    # Test 7: test that the Moons page loads successfully
    def testStarsLoading(self):
        self.driver.get("https://www.homeplanet.me/Stars")
        element = self.driver.find_element(By.TAG_NAME, "h1")

        self.assertEqual(element.text, "Stars")
        self.driver.get(self.link)

    # Test 8: test that the About Us page loads successfully
    def testAboutUsLoading(self):
        self.driver.get("https://www.homeplanet.me/About")
        element = self.driver.find_element(By.TAG_NAME, "h1")

        self.assertEqual(element.text, "About Us")
        self.driver.get(self.link)

    # Test 9: test that the Planet page has a Sort Button
    def testPlanetHasSort(self):
        self.driver.get("https://www.homeplanet.me/Planets")
        element = self.driver.find_element(By.TAG_NAME, "h2")

        self.assertEqual(element.text, "Sort By")
        self.driver.get(self.link)

    # Test 10: test that the Moon page has a Sort Button
    def testMoonHasSort(self):
        self.driver.get("https://www.homeplanet.me/Moons")
        element = self.driver.find_element(By.TAG_NAME, "h2")

        self.assertEqual(element.text, "Sort By")
        self.driver.get(self.link)

    # Test 11: test that the Stars page has a Sort Button
    def testStarHasSort(self):
        self.driver.get("https://www.homeplanet.me/Stars")
        element = self.driver.find_element(By.TAG_NAME, "h2")

        self.assertEqual(element.text, "Sort By")
        self.driver.get(self.link)



if __name__ == "__main__":
    unittest.main(argv=['first-arg-is-ignored'])
