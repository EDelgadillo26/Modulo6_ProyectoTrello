from .endpoint import TrelloAPI
from api.logs.conflogger import log_request_response
from api.logs.logger import logger

client = TrelloAPI()

def crear_checklist(card_id, name):
    payload = {"name": name}
    try:
        response = client.post(f"/cards/{card_id}/checklists", payload=payload)
        log_request_response(endpoint=f"/cards/{card_id}/checklists", payload=payload, response=response)
        if 'id' in response:
            logger.debug(f"Checklist ID: {response['id']}")
        else:
            logger.debug(f"No 'id' en respuesta: {response}")
    except Exception as e:
        logger.debug(f"No se pudo crear checklist: {e}")
        response = None
    return response

def eliminar_checklist(checklist_id):
    try:
        response = client.delete(f"/checklists/{checklist_id}")
        logger.debug(f"Checklist {checklist_id} eliminado. Response: {response}")
    except Exception as e:
        logger.debug(f"No se pudo eliminar checklist {checklist_id}: {e}")
        response = None
    return response
