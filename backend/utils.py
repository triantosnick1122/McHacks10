import json

__all__ = (
    "getCohereApiKey",
)

__ENV_FILE = ".env"

def __readEnvFile() -> dict:
    with open(__ENV_FILE) as f:
        return json.load(f)

def getCohereApiKey() -> str:
    """Returns the cohere api key."""
    return __readEnvFile()["cohereKey"]
