input_create_card = {
    "type": "object",
    "properties": {
        "name": {"type": "string", "minLength": 1},
        "desc": {"type": "string"},
        "idList": {"type": "string"},
        "pos": {"type": ["string", "number"]},
        "due": {"type": ["string", "null"]},
    },
    "required": ["name", "idList"],
    "additionalProperties": False
}
