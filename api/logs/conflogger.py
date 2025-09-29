from api.logs.logger import logger
import json

def log_request_response(endpoint, payload=None, response=None):
    payload_str = json.dumps(payload, indent=2) if payload else "No payload"
    response_str = json.dumps(response, indent=2) if response else "No response"
    
    logger.info(f"Endpoint: {endpoint}")
    logger.info(f"Payload: {payload_str}")
    logger.info(f"Response: {response_str}")
