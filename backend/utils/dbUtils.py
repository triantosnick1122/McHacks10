import pyodbc
import utils


server = getDbServer()
name = getDbName()
username = getDbUsername()
password = getDbPassword()

def select_query(query):
    connection = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+server+';DATABASE='+name+';ENCRYPT=yes;UID='+username+';PWD='+ password)
    cursor = connection.cursor() # the actual object we use to query
    cursor.execute(query)
    results = cursor.fetchall()
    connection.close()
    # return all records
    return results

def insert(statement):
    connection = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+server+';DATABASE='+name+';ENCRYPT=yes;UID='+username+';PWD='+ password)
    cursor = connection.cursor() # the actual object we use to query
    cursor.execute(statement)
    connection.commit()
    connection.close()