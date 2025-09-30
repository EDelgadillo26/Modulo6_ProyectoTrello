import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("TRELLO_API_KEY")
TOKEN = os.getenv("TRELLO_TOKEN")
BASE_URL = "https://api.trello.com/1"

class TrelloAPI:
    def __init__(self, base_url=None, api_key=None, token=None):
        self.base_url = base_url.rstrip("/") if base_url else BASE_URL
        self.api_key = api_key or API_KEY
        self.token = token or TOKEN
        self.auth_params = {"key": self.api_key, "token": self.token}

    def _request(self, method, endpoint, params=None, json=None):
        url = f"{self.base_url}{endpoint}"
        params = params or {}
        params.update(self.auth_params)  # siempre agrega auth
        response = requests.request(method, url, params=params, json=json)
        response.raise_for_status()
        return response

    # Métodos simplificados
    def get(self, endpoint, params=None):
        return self._request("GET", endpoint, params=params)

    def post(self, endpoint, payload=None):
        return self._request("POST", endpoint, json=payload)

    def put(self, endpoint, payload=None):
        return self._request("PUT", endpoint, json=payload)

    def delete(self, endpoint, payload=None):
        return self._request("DELETE", endpoint, json=payload)
