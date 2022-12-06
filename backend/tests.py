import unittest
import requests


class TestBackend(unittest.TestCase):
    host: str = "localhost"
    port: int = 8000

    def test_index(self):
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api"
        )
        self.assertEqual(resp.text, "Hello, welcome to homeplanet.me!")

    def test_all_moons(self):
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/all_moons"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertIn("bodies", body)
        body: list = body["bodies"]
        self.assertNotEqual(body, None)
        self.assertNotEqual(len(body), 1)
        self.assertNotEqual(body[0], None)

    def test_all_moons_sort(self):
        key_words: list[str] = [
            "density",
            "gravity",
            "mass-value",
            "mass-exponent",
            "vol-value",
            "vol-exponent",
        ]
        sort_words: list[str] = [
            "density",
            "gravity",
            "massValue",
            "massExponent",
            "volValue",
            "volExponent",
        ]
        for key_word, sort_word in zip(key_words, sort_words):
            resp: requests.Response = requests.get(
                f"http://{TestBackend.host}:{TestBackend.port}/api/all_moons?sort-{key_word}=true"
            )
            self.assertEqual(resp.status_code, 200)
            body: dict = resp.json()
            self.assertIn("bodies", body)
            bodies: list = body["bodies"]
            counter: int = 0
            for body in bodies:
                key: str = sort_word
                self.assertIn(key, body)
                value: int | float = body[key]
                self.assertGreaterEqual(value, counter)
                counter = value

    def test_all_moons_search(self):
        moon = "Moon"
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/all_moons?search={moon}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertIn("size", body)
        self.assertIn("total_size", body)
        self.assertIn("bodies", body)
        bodies: list = body["bodies"]
        self.assertGreaterEqual(len(bodies), 1)
        self.assertIn("englishName", bodies[0])
        self.assertEqual(bodies[0]["englishName"].lower(), moon.lower())

    def test_moon(self):
        index: int = 1
        moon: str = "Moon"
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/moon?index={index}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertNotEqual(body, None)
        self.assertEqual(len(body), 1)
        self.assertNotEqual(body[0], None)
        self.assertEqual(body[0]["englishName"], moon)
        self.assertEqual(body[0]["index"], index)
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/moon?name={moon}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertNotEqual(body, None)
        self.assertEqual(len(body), 1)
        self.assertNotEqual(body[0], None)
        self.assertEqual(body[0]["englishName"], moon)
        self.assertEqual(body[0]["index"], index)

    def test_recommend_moon(self):
        moon: str = "Moon"
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/recommend/moon?moon={moon}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertIn("planet", body.keys())
        self.assertIn("star", body.keys())
        self.assertIsInstance(body["planet"], dict)
        self.assertIsInstance(body["star"], dict)

    def test_all_planets(self):
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/all_planets"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertIn("bodies", body)
        body: list = body["bodies"]
        self.assertNotEqual(body, None)
        self.assertNotEqual(len(body), 1)
        self.assertNotEqual(body[0], None)

    def test_all_planets_sort(self):
        sort_words: list[str] = ["masse", "rade", "dens", "eqt", "orbper"]
        for sort_word in sort_words:
            resp: requests.Response = requests.get(
                f"http://{TestBackend.host}:{TestBackend.port}/api/all_planets?sort-pl-{sort_word}=true"
            )
            self.assertEqual(resp.status_code, 200)
            body: dict = resp.json()
            self.assertIn("bodies", body)
            bodies: list = body["bodies"]
            counter: int = 0
            for body in bodies:
                key: str = f"pl_{sort_word}"
                self.assertIn(key, body)
                value: int | float = body[key]
                self.assertGreaterEqual(value, counter)
                counter = value

    def test_all_planets_search(self):
        planet = "TOI-1899 b"
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/all_planets?search={planet}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertIn("size", body)
        self.assertIn("total_size", body)
        self.assertIn("bodies", body)
        bodies: list = body["bodies"]
        self.assertGreaterEqual(len(bodies), 1)
        self.assertIn("pl_name", bodies[0])
        self.assertEqual(bodies[0]["pl_name"].lower(), planet.lower())

    def test_planet(self):
        index: int = 1
        planet: str = "TOI-2337 b"
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/planet?index={index}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertNotEqual(body, None)
        self.assertEqual(len(body), 1)
        self.assertNotEqual(body[0], None)
        self.assertEqual(body[0]["pl_name"], planet)
        self.assertEqual(body[0]["index"], index)
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/planet?name={planet}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertNotEqual(body, None)
        self.assertEqual(len(body), 1)
        self.assertNotEqual(body[0], None)
        self.assertEqual(body[0]["pl_name"], planet)
        self.assertEqual(body[0]["index"], index)

    def test_recommend_planet(self):
        planet: str = "TOI-2337 b"
        planet_index: int = 1
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/recommend/planet?planet={planet_index}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertIn("moon", body.keys())
        self.assertIn("star", body.keys())
        self.assertIsInstance(body["moon"], list)
        self.assertIsInstance(body["star"], list)

    def test_all_stars(self):
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/all_stars"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertIn("bodies", body)
        body: list = body["bodies"]
        self.assertNotEqual(body, None)
        self.assertNotEqual(len(body), 1)
        self.assertNotEqual(body[0], None)

    def test_all_stars_sort(self):
        sort_words: list[str] = [
            "st_teff",
            "st_age",
            "st_rad",
            "st_mass",
            "st_logg",
        ]
        for sort_word in sort_words:
            key_word = sort_word.replace("_", "-")
            resp: requests.Response = requests.get(
                f"http://{TestBackend.host}:{TestBackend.port}/api/all_stars?sort-{key_word}=true"
            )
            self.assertEqual(resp.status_code, 200)
            body: dict = resp.json()
            self.assertIn("bodies", body)
            bodies: list = body["bodies"]
            counter: int | float = 0
            for body in bodies:
                key: str = sort_word
                self.assertIn(key, body)
                value: int | float = body[key]
                self.assertGreaterEqual(value, counter)
                counter = value

    def test_all_stars_search(self):
        star = "HIP 3419"
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/all_stars?search={star}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertIn("size", body)
        self.assertIn("total_size", body)
        self.assertIn("bodies", body)
        bodies: list = body["bodies"]
        self.assertGreaterEqual(len(bodies), 1)
        self.assertIn("star_name", bodies[0])
        self.assertEqual(bodies[0]["star_name"].lower(), star.lower())

    def test_star(self):
        index: int = 1
        star: str = "HIP 3765"
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/star?index={index}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertNotEqual(body, None)
        self.assertEqual(len(body), 1)
        self.assertNotEqual(body[0], None)
        self.assertEqual(body[0]["star_name"], star)
        self.assertEqual(body[0]["index"], index)
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/star?name={star}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertNotEqual(body, None)
        self.assertEqual(len(body), 1)
        self.assertNotEqual(body[0], None)
        self.assertEqual(body[0]["star_name"], star)
        self.assertEqual(body[0]["index"], index)

    def test_recommend_star(self):
        star: str = "HIP 3765"
        star_index: int = 1
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/recommend/star?star={star_index}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertIn("moon", body.keys())
        self.assertIn("planet", body.keys())
        self.assertIsInstance(body["moon"], list)
        self.assertIsInstance(body["planet"], list)


if __name__ == "__main__":
    unittest.main()
