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
        cls.link = "https://main.d2etp2sj08ud8d.amplifyapp.com/Planets"
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
                EC.presence_of_element_located((By.PARTIAL_LINK_TEXT, "Mercury"))
            )
        except Exception as e:
            self.assertEqual(True, False)
        
    def testPlanetsPagetLoads(self):
        assert 'Planet' in self.driver.page_source
    
    def testPlanetsPageHasPlanet1(self):
        assert 'Mercury' in self.driver.page_source

    def testPlanetsPageHasPlanet2(self):
        assert 'Earth' in self.driver.page_source
    
    def testPlanetsPageHasPlanet3(self):
        assert 'Neptune' in self.driver.page_source

    def testPlanetsPageHasRadiusAttribute(self):
        assert 'Radius' in self.driver.page_source
    
    def testPlanetsPageHasMassAttribute(self):
        assert 'Mass' in self.driver.page_source
    
    def testPlanetsPageHasTempAttribute(self):
        assert 'Temperature' in self.driver.page_source
    
    def testPlanetsPageHasDistanceFromEarthAttribute(self):
        assert 'Distance From Earth' in self.driver.page_source
    
    def testPlanetsPageHasSizeUnits(self):
        assert 'Jupiters' in self.driver.page_source
    
    def testPlanetsPageHasTempUnits(self):
        assert 'Kelvin' in self.driver.page_source


if __name__ == "__main__":
    unittest.main(argv=['first-arg-is-ignored'])
