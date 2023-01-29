from flask import Flask, Response, request
import pyodbc
import server
import generalUtils as gu
from flask_cors import CORS, cross_origin
import dbUtils as dbu
import operator
import json

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def confirmWorking():
    return "Working"

@app.route("/hello")
def helloWorld():
    return "Hello World!"

# type can be 'posts' or 'comments'
# will not return anything? just send a request to generate this report?
# or could wait for it
@app.route("/reports/comments/generate/<subreddit>/<sort>/<nPosts>/<nComments>")
def generateCommentsReport(subreddit, sort, nPosts, nComments):
    # create a report based on comments
    # save
    # return json based on the newly generated report (one tuple in db)
    print ('IMPLEMENT NOW!!!!')

@app.route("/reports/posts/generate/<subreddit>/<sort_type>/<n>")
@cross_origin()
def generatePostsReport(subreddit, sort_type, n):
    try: 
        n = int(n)
        percentage = server.get_subreddit_toxicity(subreddit, sort_type, n) * 100
        server.saveGeneratedReport(subreddit, percentage, n, sort_type)
        report = server.getNewestReportForSubreddit(subreddit, 1)
    except Exception: 
        return None
    # percentage = server.get_subreddit_toxicity(subreddit, sort_type, n) * 100
    # generate report
    server.saveGeneratedReport(subreddit, percentage, n, sort_type)
    # save in db
    # retrieve from db and return as json
    report = server.getNewestReportForSubreddit(subreddit, 1)
    return gu.__reportFromDbToJson(report)

@app.route("/scoreboard")
@cross_origin()
def getHighestScores():
    allOfEm = server.getAllGeneratedReports()
    l = list()
    counter = 0
    for item in allOfEm:
        poop = gu.__reportFromDbToJson(item)
        strang = str(poop)
        l.append(json.loads(strang))
        print(json.loads(strang))
        counter = counter + 1
        if (counter > 100):
            break
        # l.append(gu.__reportFromDbToJson(item))
    l.sort(key=operator.itemgetter('score'))
    l.reverse()
    ret = {}
    ret["board"] = l
    return ret

# type can be 'posts' or 'comments'
@app.route("/reports/posts/retrieve/<subreddit>")
def getPreviouslyGeneratedPostsReport(subreddit):
    allCurrent = server.getAllCurrentGeneratedReportsForSubreddit(subreddit, 1)
    report = allCurrent[0] # if none, need to do something
    if report == None:
        # TODO: what to do?
        pass
    else:
        return gu.__reportFromDbToJson(report)

@app.route("/reports/comments/retrieve/<subreddit>")
def getPreviouslyGeneratedCommentsReport(subreddit):
    allCurrent = server.getAllCurrentGeneratedReportsForSubreddit(subreddit, 0)
    report = allCurrent[0] # if none, need to do something
    if report == None:
        # TODO: what to do?    
        pass
    else:
        return gu.__reportFromDbToJson(report)
    # put into a json


 

