input_create_checklist = {
    "type": "object",
    "properties": {
        "name": {"type": "string", "minLength": 1},
        "idCard": {"type": "string"}
    },
    "required": ["name", "idCard"],
    "additionalProperties": False
}
