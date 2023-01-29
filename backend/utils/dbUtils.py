import pyodbc
import utils


server = utils.getDbServer()
name = utils.getDbName()
username = utils.getDbUsername()
password = utils.getDbPassword()

def select_query(query):
    connection = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+server+';DATABASE='+name+';ENCRYPT=yes;UID='+username+';PWD='+ password)
    cursor = connection.cursor() # the actual object we use to query
    cursor.execute(query)
    results = cursor.fetchall()
    connection.close()
    # return all records
    return results

def executeInsertOrUpdate(statement):
    connection = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+server+';DATABASE='+name+';ENCRYPT=yes;UID='+username+';PWD='+ password)
    cursor = connection.cursor() # the actual object we use to query
    cursor.execute(statement)
    connection.commit()
    connection.close()  

def generateFullInsertStmt(subreddit, timestamp, score, records_analyzed, is_current, is_post):
    return "INSERT INTO report (subreddit, timestamp, score, records_analyzed, is_current, is_post) VALUES ('"
    + subreddit + "','" + timestamp + "'," + score + "," + records_analyzed + "," + is_current + "," + is_post
    + ");"             

""" Sets all reports for this subreddit to not current except for the one with the id to keep"""
def generateUpdateStmtToSetNotCurrent(sub_name, is_post, idToKeep):
    return "UPDATE report SET is_current = 0 WHERE subreddit = '" + sub_name + "' AND id != " + str(idToKeep) + " AND is_post = " + str(is_post) + ";"
