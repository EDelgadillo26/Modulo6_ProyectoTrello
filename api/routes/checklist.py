from .endpoint import TrelloAPI
from logs.conflogger import log_request_response
from logs.logger import logger

client = TrelloAPI()

def create_checklist(card_id, name):
    payload = {"name": name, "idCard": card_id}  # idCard requerido por Trello
    try:
        response = client.post("/checklists", payload=payload)  # devuelve dict directamente
        log_request_response(endpoint="/checklists", payload=payload, response=response)

        # response ya es un dict
        if 'id' in response:
            logger.debug(f"Checklist ID: {response['id']}")
        else:
            logger.debug(f"No 'id' en respuesta: {response}")

    except Exception as e:
        logger.debug(f"No se pudo crear checklist: {e}")
        response = None

    return response

def delete_checklist(checklist_id):
    try:
        response = client.delete(f"/checklists/{checklist_id}")  # devuelve dict
        logger.debug(f"Checklist {checklist_id} eliminado. Response: {response}")
    except Exception as e:
        logger.debug(f"No se pudo eliminar checklist {checklist_id}: {e}")
        response = None
    return response

