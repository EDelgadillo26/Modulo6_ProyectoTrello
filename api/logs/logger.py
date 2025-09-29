import logging
import os

# Crear carpeta para logs si no existe
os.makedirs("logs", exist_ok=True)

# Logger principal
logger = logging.getLogger("trello_api_logger")
logger.setLevel(logging.DEBUG)  # Cambiar a INFO en producción

# Formato del log
formatter = logging.Formatter(
    "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

# Handler para consola
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

# Handler para archivo
file_handler = logging.FileHandler("logs/trello_api.log")
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
