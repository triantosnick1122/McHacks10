import json
from typing import Dict
__all__ = (
    "getCohereApiKey",
)

__ENV_FILE = ".env"

def __reportFromDbToJson(dbRecord) -> json:
    # id
    # subreddit
    # timestamp
    # score
    # records_analyzed
    # is_current
    # is_post

    if dbRecord.is_post == 1:
        type = 'posts'
    else:
        type = 'comments'
    
    data = {
        "subreddit": str(dbRecord.subreddit),
        "timestamp": str(dbRecord.timestamp),
        "score": str(dbRecord.score),
        "records_analyzed": str(dbRecord.records_analyzed),
        "report type": str(type),
        "sorted by": str(dbRecord.sort_type)
    }

    return json.dumps(data)

def __readEnvFile() -> dict:
    with open(__ENV_FILE) as f:
        return json.load(f)

def getCohereApiKey() -> str:
    """Returns the cohere api key."""
    return __readEnvFile()["cohereKey"]

def getDbUsername() -> str:
    """Returns the db username."""
    return __readEnvFile()["db_username"]   

def getDbPassword() -> str:
    """Returns the db password"""
    return __readEnvFile()["db_password"]
    
def getDbName() -> str:
    """Returns the name of the db"""    
    return __readEnvFile()["db_name"]

def getDbServer() -> str:
    """Returns the name of the db"""
    return __readEnvFile()["db_server"]        
def getRedditAuth() -> Dict[str, str]:
    """Returns the redit auth info"""
    return __readEnvFile()["redditAuth"]
