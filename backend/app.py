from flask import Flask, Response, request
import pyodbc
import utils.server as server

app = Flask(__name__)

@app.route("/")
def confirmWorking():
    return "Working"

@app.route("/hello")
def helloWorld():
    return "Hello World!"

# type can be 'posts' or 'comments'
# will not return anything? just send a request to generate this report?
# or could wait for it
@app.route("/reports/generate/<subreddit>/<type>/<n>")
def generateReport(subreddit, type, n):
    # call saveGeneratedReport with the info from the report
    print ('IMPLEMENT NOW!!!!')

# type can be 'posts' or 'comments'
@app.route("/reports/retrieve/<subreddit>/<type>")
def getPreviouslyGeneratedReport(subreddit, type):
    if (type == 'posts'):
        allCurrent = server.getAllCurrentGeneratedReportsForSubreddit(subreddit, 1)
    else:
        allCurrent = server.getAllCurrentGeneratedReportsForSubreddit(subreddit, 0)

    


if __name__ == '__main__':
    app.run()