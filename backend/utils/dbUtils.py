import pyodbc
import utils.generalUtils as gu


server = gu.getDbServer()
name = gu.getDbName()
username = gu.getDbUsername()
password = gu.getDbPassword()

def select_query(query):
    print ('username: ' + str(username) + 'password: ' + str(password))
    connection = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+server+';DATABASE='+name+';ENCRYPT=yes;UID='+username+';PWD='+ password)
    cursor = connection.cursor() # the actual object we use to query
    cursor.execute(query)
    results = cursor.fetchall()
    connection.close()
    # return all records
    return results

def executeInsertOrUpdate(statement):
    print ('username: ' + str(username) + 'password: ' + str(password))
    connection = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+server+';DATABASE='+name+';ENCRYPT=yes;UID='+username+';PWD='+ password)
    cursor = connection.cursor() # the actual object we use to query
    cursor.execute(statement)
    connection.commit()
    connection.close()  

def generateFullInsertStmt(subreddit, timestamp, score, records_analyzed, is_current, is_post):
    stmt = ("INSERT INTO report (subreddit, timestamp, score, records_analyzed, is_current, is_post) VALUES ('" 
            + str(subreddit) + "','" + str(timestamp) + "'," 
            + str(score) + "," + str(records_analyzed) + "," + str(is_current) + "," 
            + str(is_post) + ");")
    print ('here')
    print(stmt) 
    return stmt             

""" Sets all reports for this subreddit to not current except for the one with the id to keep"""
def generateUpdateStmtToSetNotCurrent(sub_name, is_post, idToKeep):
    stmt = "UPDATE report SET is_current = 0 WHERE subreddit = '" + str(sub_name) + "' AND id != " + str(idToKeep) + " AND is_post = " + str(is_post) + ";"
    print (stmt)
    return stmt

