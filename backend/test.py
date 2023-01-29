import utils.dbUtils as dbu
import random
import datetime
import server



if __name__ == '__main__':
    # ingest a bunch of nonsense
    subreddits={'all', 'amitheasshole', 'amitheasshole', 'cars', 'porn'
    , 'poop', 'food', 'amitheasshole', 'relationship_advice'}


    for i in range (0, 100):

        for subreddit in subreddit:
            records_analyzed = random.randint(10, 9999)
            is_post = random.randint(0, 1)
            is_current = 1
            score = random.uniform(0, 100.0)
            now = datetime.datetime.now()
            timestamp = now.strftime('%Y-%m-%d %H:%M:%S')
            server.saveGeneratedReport(subreddit, timestamp, score, records_analyzed, is_current, is_post)

        


