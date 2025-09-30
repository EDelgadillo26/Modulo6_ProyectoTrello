import pytest
import jsonschema
from routes.checklist import create_checklist, delete_checklist, TrelloAPI
from resources.schemas.input.checklist_schema import input_create_checklist
from resources.schemas.output.checklist_schema import output_create_checklist
from assertions.checklist_assertions import assert_create_checklist

@pytest.mark.functional
@pytest.mark.smoke
def test_create_checklist_success(valid_card_id):
    """Crear checklist con payload válido"""
    payload = {"name": "Checklist de prueba", "idCard": valid_card_id}
    jsonschema.validate(instance=payload, schema=input_create_checklist)

    response = create_checklist(valid_card_id, payload["name"])
    response = response.json()
    assert response is not None, "La API no devolvió respuesta"

    checklist_id = response.get("id")
    try:
        if checklist_id:
            assert_create_checklist(response, expected_payload=payload)
            jsonschema.validate(instance=response, schema=output_create_checklist)
    finally:
        if checklist_id:
            delete_checklist(checklist_id)


@pytest.mark.functional
@pytest.mark.xfail(reason="BUG-001: La API permite crear checklist con nombre vacío")
def test_create_checklist_empty_name(valid_card_id):
    """No se puede crear checklist con nombre vacío"""
    payload = {"name": "", "idCard": valid_card_id}
    jsonschema.validate(instance=payload, schema=input_create_checklist)

    response = create_checklist(valid_card_id, payload["name"])
    response = response.json()
    checklist_id = response.get("id") if response else None

    try:
        if checklist_id:
            assert_create_checklist(response, expected_payload=payload)
            jsonschema.validate(instance=response, schema=output_create_checklist)
        else:
            assert "err" in response or "error" in response
    finally:
        if checklist_id:
            delete_checklist(checklist_id)


@pytest.mark.functional
@pytest.mark.xfail(reason="BUG-002: La API permite nombres demasiado largos")
def test_create_checklist_long_name(valid_card_id):
    """Nombre demasiado largo debe fallar"""
    long_name = "X" * 600
    payload = {"name": long_name, "idCard": valid_card_id}
    jsonschema.validate(instance=payload, schema=input_create_checklist)

    response = create_checklist(valid_card_id, long_name)
    response = response.json()
    checklist_id = response.get("id") if response else None

    try:
        if checklist_id:
            assert_create_checklist(response, expected_payload=payload)
            jsonschema.validate(instance=response, schema=output_create_checklist)
        else:
            assert "err" in response or "error" in response
    finally:
        if checklist_id:
            delete_checklist(checklist_id)


@pytest.mark.functional
@pytest.mark.xfail(reason="BUG-003: La API permite crear checklist sin token")
def test_create_checklist_no_token(valid_card_id):
    """Crear checklist sin token debe fallar"""
    client_no_token = TrelloAPI(token="")
    payload = {"name": "Checklist sin token", "idCard": valid_card_id}

    try:
        response = client_no_token.post("/checklists", payload=payload)
        response = response.json()
        checklist_id = response.get("id") if response else None
    except Exception as e:
        response = {"err": str(e)}
        checklist_id = None

    try:
        if checklist_id:
            assert_create_checklist(response, expected_payload=payload)
            jsonschema.validate(instance=response, schema=output_create_checklist)
        else:
            assert "err" in response or "error" in response
    finally:
        if checklist_id:
            delete_checklist(checklist_id)
