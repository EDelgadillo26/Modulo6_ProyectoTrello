output_create_card = {
    "type": "object",
    "properties": {
        "id": {"type": "string"},
        "name": {"type": "string"},
        "desc": {"type": "string"},
        "idList": {"type": "string"},
        "idBoard": {"type": "string"},
        "url": {"type": "string"}
    },
    "required": ["id", "name", "idList", "idBoard"],
    "additionalProperties": True
}
