def assert_create_checklist(response, expected_payload):
    assert isinstance(response, dict), f"Response debe ser dict, got {type(response)}"
    assert "id" in response, "Falta 'id' en la respuesta"
    assert response.get("name") == expected_payload["name"], f"El name no coincide: {response.get('name')} != {expected_payload['name']}"
    assert response.get("idCard") == expected_payload["idCard"], f"El idCard no coincide: {response.get('idCard')} != {expected_payload['idCard']}"
