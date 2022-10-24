import unittest
import requests


class TestBackend(unittest.TestCase):
    host = "localhost"
    port = 8000

    def test_index(self):
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}"
        )
        self.assertEqual(resp.text, "Hello, welcome to homeplanet.me!")

    def test_moon(self):
        moon: str = "Moon"
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/moon?name={moon}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertNotEqual(body, None)
        self.assertEqual(len(body), 1)
        self.assertNotEqual(body[0], None)
        self.assertEqual(body[0]["englishName"], moon)

    def test_recommand_moon(self):
        moon: str = "Moon"
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/recommand/moon?moon={moon}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertIn("planet", body.keys())
        self.assertIn("star", body.keys())
        self.assertIsInstance(body["planet"], dict)
        self.assertIsInstance(body["star"], dict)

    def test_planet(self):
        planet: str = "TOI-954 b"
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/planet?name={planet}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertNotEqual(body, None)
        self.assertEqual(len(body), 1)
        self.assertNotEqual(body[0], None)
        self.assertEqual(body[0]["pl_name"], planet)

    def test_recommand_planet(self):
        planet: str = "TOI-954 b"
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/recommand/planet?planet={planet}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertIn("moon", body.keys())
        self.assertIn("star", body.keys())
        self.assertIsInstance(body["moon"], dict)
        self.assertIsInstance(body["star"], dict)

    def test_star(self):
        star: str = "HIP 3419"
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/star?name={star}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertNotEqual(body, None)
        self.assertEqual(len(body), 1)
        self.assertNotEqual(body[0], None)
        self.assertEqual(body[0]["star_name"], star)

    def test_recommand_star(self):
        star: str = "HIP 3419"
        resp: requests.Response = requests.get(
            f"http://{TestBackend.host}:{TestBackend.port}/recommand/star?star={star}"
        )
        self.assertEqual(resp.status_code, 200)
        body: dict = resp.json()
        self.assertIn("moon", body.keys())
        self.assertIn("planet", body.keys())
        self.assertIsInstance(body["moon"], dict)
        self.assertIsInstance(body["planet"], dict)


if __name__ == "__main__":
    unittest.main()
