import praw
from typing import List
from praw.models import MoreComments

def initReddit(clientId, secret, pw, userAgent, user):
    # reddit = praw.Reddit(
    #     client_id=clientId,
    #     client_secret=secret,
    #     password=pw,
    #     user_agent=userAgent,
    #     username=user,
    # )
    reddit = praw.Reddit(
        client_id="wbFt0yKkHjR6CpVp0OYoPA",
        client_secret="bw_4WuZbGzNEACbtpBYTDzXixM9YGw",
        user_agent="testAPI-python",
    )
    return reddit

    

def get_posts_info(subreddit_name: str, post_sort_type: str, num_posts: int) -> List:
    ''' returns list of praw objects representing posts'''
    reddit = initReddit(0, 0, 0, 0, 0)
    sub = reddit.subreddit(subreddit_name)
    if post_sort_type == "new":
        return sub.new(limit = num_posts)
    elif post_sort_type == "top": 
        return sub.top(limit = num_posts)
    elif post_sort_type == "hot": 
        return sub.hot(limit = num_posts)
    elif post_sort_type == "controversial": 
        return sub.controversial(limit = num_posts)


def get_posts(subreddit_name: str, post_sort_type: str, num_posts: int) -> List[str]: 
    '''returns list of post titles and contents'''
    posts = []
    for submission in get_posts_info(subreddit_name, post_sort_type, num_posts):
        posts.append(submission.title)
        if len(submission.selftext) > 0: 
            posts.append(submission.selftext)

    return posts


def get_comments(subreddit_name: str, post_sort_type: str, num_posts: int, num_comments_per_post:int) -> List[str]: 
    '''returns list of comments. Total num comments <= num_posts * num_comments_per_post'''
    comments_list = []
    posts = get_posts_info(subreddit_name, post_sort_type, num_posts)
    for post in posts: 
        post.comments.replace_more(limit=None) # None -> only keep top level comments
        for i in range(num_comments_per_post):
            try:
                comments_list.append(post.comments[i].body)
            except IndexError:
                pass
    return comments_list


from time import time

start = time()
com_list = get_comments("mcgill", "new", 30, 2)
end = time()

for line in com_list:
    print("New piece of text:", line)
print(end - start)
