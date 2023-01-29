import dbUtils

"""Saves a generated report to the db"""
def saveGeneratedReport(subreddit, timestamp, score, records_analyzed, is_current, is_post):
    insert_stmt(generateInsertStmt(subreddit, timestamp, score, records_analyzed, is_current, is_post))

def generateInsertStmt(subreddit, timestamp, score, records_analyzed, is_current, is_post):
    return "INSERT INTO report (subreddit, timestamp, score, records_analyzed, is_current, is_post) VALUES ('"
    + subreddit + "','" + timestamp + "'," + score + "," + records_analyzed + "," + is_current + "," + is_post
    + ");" 
