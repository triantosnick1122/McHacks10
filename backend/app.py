from flask import Flask, Response, request
import pyodbc
import utils.server as server
import utils.generalUtils as gu

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
@app.route("/reports/comments/generate/<subreddit>/<sort>/<nPosts>/<nComments>")
def generateCommentsReport(subreddit, sort, nPosts, nComments):
    # create a report based on comments
    # save
    # return json based on the newly generated report (one tuple in db)
    print ('IMPLEMENT NOW!!!!')

@app.route("/reports/posts/generate/<subreddit>/<sort>/<n>")    
def generatePostsReport(subreddit, sort, n):
    print("poop")
    # create a report based on posts
    # save
    # return json based on the newly generated report (one tuple in db)


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







if __name__ == '__main__':
    app.run()