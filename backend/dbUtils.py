import pyodbc



def select_query(query):
    server = 'toxicity-analyzer.database.windows.net'
    database = 'toxicity-analyzer-db'
    username = 'nick'
    password = 'FuozZy4DK'
    connection = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+server+';DATABASE='+database+';ENCRYPT=yes;UID='+username+';PWD='+ password)
    cursor = connection.cursor() # the actual object we use to query
    cursor.execute(query)
    results = cursor.fetchall()
    connection.close()
    # return all records
    return results

def insert(statement):
    server = 'toxicity-analyzer.database.windows.net'
    database = 'toxicity-analyzer-db'
    username = 'nick'
    password = 'FuozZy4DK'
    connection = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+server+';DATABASE='+database+';ENCRYPT=yes;UID='+username+';PWD='+ password)
    cursor = connection.cursor() # the actual object we use to query
    cursor.execute(statement)
    connection.commit()
    connection.close()