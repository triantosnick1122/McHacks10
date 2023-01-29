from flask import Flask, Response, request
import pyodbc

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
    print ('IMPLEMENT NOW!!!!')

# type can be 'posts' or 'comments'
@app.route("/reports/retrieve/<subreddit>/<type>")
def getPreviouslyGeneratedReport(subreddit, type):
    print ('IMPLEMENT NOW!!!!')

    


if __name__ == '__main__':
    app.run()