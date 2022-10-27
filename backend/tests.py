import unittest
import requests


class TestBackend(unittest.TestCase):
    host = "localhost"
    port = 8000

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
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/recommend/planet?planet={planet}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertIn("moon", body.keys())
        self.assertIn("star", body.keys())
        self.assertIsInstance(body["moon"], dict)
        self.assertIsInstance(body["star"], dict)

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
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/api/recommend/star?star={star}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertIn("moon", body.keys())
        self.assertIn("planet", body.keys())
        self.assertIsInstance(body["moon"], dict)
        self.assertIsInstance(body["planet"], dict)


if __name__ == "__main__":
    unittest.main()
