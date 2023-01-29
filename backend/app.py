from flask import Flask, Response, request
import pyodbc
import server
import generalUtils as gu
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
def generatePostsReport(subreddit, sort_type, n):
    percentage = server.get_subreddit_toxicity(subreddit, sort_type, n) * 100
    # generate report
    server.saveGeneratedReport(subreddit, percentage)
    # save in db
    # retrieve from db and return as json
    report = server.getNewestReportForSubreddit(subreddit, 1)
    return gu.__reportFromDbToJson(report)

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

