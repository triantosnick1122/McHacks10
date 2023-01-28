import praw

def init():
    # read secret from first line of config file
    secretConfig = open("secret.config", "r")
    secret = secretConfig.readline()
    secretConfig.close()

    userPassConfig = open("userPass.config", "r")
    user = userPassConfig.readline()
    pw = userPassConfig.readline()
    userPassConfig.close()

    clientIdConfig = open("clientId.config", "r")
    clientId = clientIdConfig.readline()
    clientIdConfig.close()

    reddit = praw.Reddit(
        client_id=clientId,
        client_secret=secret,
        password=pw,
        user_agent="AntiCommie-bot",
        username=user,
    )

    return reddit


def post_to_test(text, title):
    testSub = reddit.subreddit("test")
    testSub.submit(title, selftext=text)    

def post_to_sub_by_name(subredditName, title, text):
    sub = reddit.subreddit(subredditName)
    sub.submit(title, selftext=text)

def getTopNPosts(subredditName, n):
    sub = reddit.subreddit(subredditName)
    return sub.top(limit=n)

# this returns comment trees, so I think by iterating we will only see the top-level comments
def getTopNComments(subredditName, n):
    sub = reddit.subreddit(subredditName)
    return sub.comments(limit=n)

# TODO: implement
def getCommentsMentioningWord(commentsList, word):
    l = list()

def getTop10kCommentsFromAll():
    return getTopNComments("all", 10000)           

if __name__ == "__main__":
    # print("running")
    reddit = init()

    # for comment in getTop10kCommentsFromAll():


    for comment in getTopNComments("all", 100):
        print(comment.body)