import praw

def getTopNPostsFromSubreddit(reddit, subredditName, n):
    sub = reddit.subreddit(subredditName)
    return sub.top(limit=n)

def getTopNCommentsFromSubreddit(reddit, subredditName, n):
    sub = reddit.subreddit(subredditName)
    return sub.comments(limit=n)

def initReddit(clientId, secret, pw, userAgent, user):
    reddit = praw.Reddit(
        client_id=clientId,
        client_secret=secret,
        password=pw,
        user_agent=userAgent,
        username=user,
    )
    return reddit