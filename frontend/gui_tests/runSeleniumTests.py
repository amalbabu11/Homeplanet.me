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

# class SeleniumTests(unittest.TestCase):

#     def setUp(self):
#         # service = Service(PATH) # comment out before pushing
#         testoptions = Options()
#         testoptions.add_argument("--headless")
#         testoptions.add_argument("--no-default-browser-check")
#         testoptions.add_argument("--no-sandbox")
#         testoptions.add_argument("--disable-gpu")
#         self.driver = webdriver.Chrome(options=testoptions) # service=service
#         self.driver.get(URL)

#     def tearDown(self):
#         self.driver.quit()

#     # Test 1: test successful loading of the page
#     def testTitle(self):
#         title = self.driver.title
#         self.assertEqual(title, "HomePlanet")


# if name == "main":
#     unittest.main(argv=['first-arg-is-ignored'])

# selenium test format code from group TexasVotes: https://gitlab.com/forbesye/fitsbits/-/blob/master/front-end/guitests.py
# example tests from group Drive Responsibly: https://gitlab.com/ethanzh/drive-responsibly/-/blob/main/frontend/gui_tests/splashTests.py

import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

# from selenium.webdriver.chrome.service import Service # comment out before pushing

import sys

# PATH = "./frontend/gui_tests/chromedriver.exe"
URL = "https://www.animalwatch.net/Homepage"

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

    # # Test 2: test Species card
    # def testSpeciesCard(self):
    #     element = self.driver.find_elements(By.CLASS_NAME, "stretched-link")[0]
    #     newURL = element.get_attribute('href')

    #     self.assertEqual(newURL, "https://www.animalwatch.net/species")

    # # Test 3: test Parks card
    # def testParksCard(self):
    #     element = self.driver.find_elements(By.CLASS_NAME, "stretched-link")[1]
    #     newURL = element.get_attribute('href')

    #     self.assertEqual(newURL, "https://www.animalwatch.net/parks")

    # # Test 4: test Recreation card
    # def testRecreationCard(self):
    #     element = self.driver.find_elements(By.CLASS_NAME, "stretched-link")[2]
    #     newURL = element.get_attribute('href')

    #     self.assertEqual(newURL, "https://www.animalwatch.net/recreation")

    # # Test 5: test that the About Us page loads successfully
    # def testAboutUsLoading(self):
    #     self.driver.get("https://www.animalwatch.net/About")
    #     element = self.driver.find_element(By.TAG_NAME, "h3")

    #     self.assertEqual(element.text, "About Us")
    #     self.driver.get(URL)

    # # Test 6: test that the Species model page loads successfully
    # def testSpeciesLoading(self):
    #     self.driver.get("https://www.animalwatch.net/Species")
    #     element = self.driver.find_element(By.TAG_NAME, "h3")

    #     self.assertEqual(element.text, "Species")
    #     self.driver.get(URL)

    # # Test 7: test that the Parks model page loads successfully
    # def testParksLoading(self):
    #     self.driver.get("https://www.animalwatch.net/Parks")
    #     element = self.driver.find_element(By.TAG_NAME, "h3")

    #     self.assertEqual(element.text, "Parks")
    #     self.driver.get(URL)

    # # Test 8: test that the Recreation model page loads successfully
    # def testRecreationLoading(self):
    #     self.driver.get("https://www.animalwatch.net/Recreation")
    #     element = self.driver.find_element(By.TAG_NAME, "h3")

    #     self.assertEqual(element.text, "Recreation")
    #     self.driver.get(URL)

    # # Test 9: test Home nav-link redirection
    # def testHomeButton(self):
    #     element = self.driver.find_elements(By.CLASS_NAME, "nav-link")[0]
    #     newURL = element.get_attribute('href')

    #     self.assertEqual(newURL, URL)

    # # Test 10: test About nav-link redirection
    # def testAboutButton(self):
    #     element = self.driver.find_elements(By.CLASS_NAME, "nav-link")[1]
    #     newURL = element.get_attribute('href')

    #     self.assertEqual(newURL, "https://www.animalwatch.net/About")

    # # Test 11: test Species nav-link redirection
    # def testSpeciesButton(self):
    #     element = self.driver.find_elements(By.CLASS_NAME, "nav-link")[2]
    #     newURL = element.get_attribute('href')

    #     self.assertEqual(newURL, "https://www.animalwatch.net/Species")

    # # Test 12: test Parks nav-link redirection
    # def testParksButton(self):
    #     element = self.driver.find_elements(By.CLASS_NAME, "nav-link")[3]
    #     newURL = element.get_attribute('href')

    #     self.assertEqual(newURL, "https://www.animalwatch.net/Parks")

    # # Test 13: test Recreation nav-link redirection
    # def testRecreationButton(self):
    #     element = self.driver.find_elements(By.CLASS_NAME, "nav-link")[4]
    #     newURL = element.get_attribute('href')

    #     self.assertEqual(newURL, "https://www.animalwatch.net/Recreation")

    # # Test 14: test Search bar loading on Search Page
    # def testSearchPage(self):
    #     self.driver.get("https://www.animalwatch.net/searchpage")
    #     element = self.driver.find_elements(By.CLASS_NAME, "form-label")[0]

    #     self.assertEqual(element.text, "Search for Information:")
    #     self.driver.get(URL)

    # # Test 15: test Species search loading
    # def testSpeciesSearch(self):
    #     self.driver.get("https://www.animalwatch.net/Species")
    #     element = self.driver.find_elements(By.CLASS_NAME, "form-label")[0]

    #     self.assertEqual(element.text, "Search")
    #     self.driver.get(URL)

    # # Test 16: test Parks search loading
    # def testParksSearch(self):
    #     self.driver.get("https://www.animalwatch.net/Parks")
    #     element = self.driver.find_elements(By.CLASS_NAME, "form-label")[0]

    #     self.assertEqual(element.text, "Search")
    #     self.driver.get(URL)

    # # Test 17: test Recreation search loading
    # def testRecreationSearch(self):
    #     self.driver.get("https://www.animalwatch.net/Recreation")
    #     element = self.driver.find_elements(By.CLASS_NAME, "form-label")[0]

    #     self.assertEqual(element.text, "Search")
    #     self.driver.get(URL)

    # # Test 18: test Species sort and filter loading
    # def testSpeciesSortAndFilter(self):
    #     self.driver.get("https://www.animalwatch.net/Species")
    #     element = self.driver.find_elements(By.CLASS_NAME, "form-label")[1]

    #     self.assertEqual(element.text, "Taxonomy Class")

    #     element = self.driver.find_elements(By.CLASS_NAME, "form-label")[5]

    #     self.assertEqual(element.text, "Sort by")
    #     self.driver.get(URL)

    # # Test 19: test Parks sort and filter loading
    # def testParksSortAndFilter(self):
    #     self.driver.get("https://www.animalwatch.net/Parks")
    #     element = self.driver.find_elements(By.CLASS_NAME, "form-label")[1]

    #     self.assertEqual(element.text, "State")

    #     element = self.driver.find_elements(By.CLASS_NAME, "form-label")[2]

    #     self.assertEqual(element.text, "Sort by")
    #     self.driver.get(URL)

    # # Test 20: test Recreation sort and filter loading
    # def testRecreationSortAndFilter(self):
    #     self.driver.get("https://www.animalwatch.net/Recreation")
    #     element = self.driver.find_elements(By.CLASS_NAME, "form-label")[1]

    #     self.assertEqual(element.text, "Pets Allowed")

    #     element = self.driver.find_elements(By.CLASS_NAME, "form-label")[4]

    #     self.assertEqual(element.text, "Sort by")
    #     self.driver.get(URL)

if __name__ == "__main__":
    unittest.main(argv=['first-arg-is-ignored'])
