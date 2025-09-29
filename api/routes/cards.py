from .endpoint import TrelloAPI
from api.logs.conflogger import log_request_response
from api.logs.logger import logger

client = TrelloAPI()

def crear_card(list_id, name, desc=""):
    payload = {"idList": list_id, "name": name, "desc": desc}
    try:
        response = client.post("/cards", payload=payload)
        log_request_response(endpoint="/cards", payload=payload, response=response)
        if 'id' in response:
            logger.debug(f"Card ID: {response['id']}")
        else:
            logger.debug(f"No 'id' en respuesta: {response}")
    except Exception as e:
        logger.debug(f"No se pudo crear card: {e}")
        response = None
    return response

def eliminar_card(card_id):
    try:
        response = client.delete(f"/cards/{card_id}")
        logger.debug(f"Card {card_id} eliminado. Response: {response}")
    except Exception as e:
        logger.debug(f"No se pudo eliminar card {card_id}: {e}")
        response = None
    return response

def obtener_cards(board_id):
    try:
        response = client.get(f"/boards/{board_id}/cards")
        logger.debug(f"Cards en board {board_id}: {response}")
    except Exception as e:
        logger.debug(f"No se pudieron obtener cards: {e}")
        response = []
    return response
