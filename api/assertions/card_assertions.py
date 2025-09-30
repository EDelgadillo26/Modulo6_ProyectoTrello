import jsonschema

def assert_create_card(response, expected_payload):
    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"
    body = response.json()
    assert "id" in body, "El body no contiene 'id'"
    assert body["name"] == expected_payload["name"], f"Nombre esperado {expected_payload['name']} pero fue {body['name']}"

def assert_card_error(response):
    assert response.status_code in [400, 401, 404], f"Error esperado, pero la API respondió {response.status_code}"
    body = response.json()
    assert "message" in body or "error" in body, "No se encontró mensaje de error en la respuesta"
