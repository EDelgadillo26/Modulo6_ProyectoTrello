import pytest
import jsonschema
from routes.cards import create_card, delete_card
from resources.schemas.input.card_schema import input_create_card
from resources.schemas.output.card_schema import output_create_card
from assertions.card_assertions import assert_create_card

@pytest.mark.functional
@pytest.mark.smoke
def test_create_card_success(valid_list_id):
    """Crear card con payload válido"""
    payload = {"name": "Card de prueba", "idList": valid_list_id}
    jsonschema.validate(instance=payload, schema=input_create_card)

    response = create_card(valid_list_id, payload["name"])
    data_response = response.json()
    assert data_response is not None, "La API no devolvió respuesta"

    card_id = data_response.get("id")
    try:
        if card_id:
            assert_create_card(response, expected_payload=payload)
            jsonschema.validate(instance=response.json(), schema=output_create_card)
    finally:
        if card_id:
            delete_card(card_id)


@pytest.mark.functional
@pytest.mark.xfail(reason="BUG-001-CARD001: No se puede crear card con nombre vacío")
def test_create_card_empty_name(valid_list_id,cleanup_card_if_exists):
    """No se puede crear card con nombre vacío"""
    payload = {"name": "", "idList": valid_list_id}
    jsonschema.validate(instance=payload, schema=input_create_card)

    response = create_card(valid_list_id, payload["name"])
    assert response.status_code != 200, "Se esperaba status code diferente 200, pero se obtuvo 200"
    cleanup_card_if_exists(response)


@pytest.mark.functional
@pytest.mark.xfail(reason="BUG-002-CARD002: Nombre demasiado largo debería fallar")
def test_create_card_long_name(valid_list_id,cleanup_card_if_exists):
    """Nombre demasiado largo debe fallar"""
    long_name = "X" * 600
    payload = {"name": long_name, "idList": valid_list_id}
    jsonschema.validate(instance=payload, schema=input_create_card)

    response = create_card(valid_list_id, long_name)
    assert "err" in response, "Se esperaba error por nombre demasiado largo"
    cleanup_card_if_exists(response)

@pytest.mark.functional
@pytest.mark.xfail(reason="BUG-003-CARD003: Token ausente debería fallar")
def test_create_card_no_token(valid_list_id,cleanup_card_if_exists):
    """Crear card sin token debe fallar"""
    from routes.cards import TrelloAPI

    client_no_token = TrelloAPI(token="")
    payload = {"name": "Card sin token", "idList": valid_list_id}

    try:
        response = client_no_token.post(
            "/cards", 
            payload={"name": payload["name"], "idList": valid_list_id}
        )
    except Exception as e:
        response = {"err": str(e)}

    assert "err" in response, "Se esperaba error por token ausente"
    cleanup_card_if_exists(response)
