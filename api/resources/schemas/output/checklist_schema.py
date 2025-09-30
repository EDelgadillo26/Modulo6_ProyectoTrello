output_create_checklist = {
    "type": "object",
    "properties": {
        "id": {"type": "string"},
        "name": {"type": "string"},
        "idCard": {"type": "string"}
    },
    "required": ["id", "name", "idCard"],
    "additionalProperties": True
}
