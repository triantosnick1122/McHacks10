import cohere
from cohere.classify import Example
import random
import utils.generalUtils as utils
import utils.dbUtils as dbUtils
import csv
from typing import List


'''cohereClient = cohere.Client(utils.getCohereApiKey())


def get_examples(dataset_percentage: float = 1, random_state: int = 13) -> cohere.classify.Example:
    """Read toxicity dataset entries and loads it up as a list of examples."""
    assert dataset_percentage >= 0 and dataset_percentage <= 1, "Percentage must be between 0 and 1."
    random.seed(random_state)
    toxic_examples = []
    non_toxic_examples = []
    with open("../data/Social Media Toxicity Dataset.csv", "r", encoding="utf-8") as toxicity_dataset:
        reader = csv.DictReader(toxicity_dataset)

        for row in reader:
            if row["Is this text toxic?"] == "Toxic":
                toxic_examples.append(Example(row["text"], "Toxic"))
            else:
                non_toxic_examples.append(Example(row["text"], "Not Toxic"))

    num_entries = int(len(toxic_examples) * dataset_percentage)
    
    examples = random.sample(toxic_examples, num_entries) + random.sample(non_toxic_examples, num_entries)

    return examples


def get_classifications(inputs: List[str]):
    """Output the model's predictions on whether inputs are toxic or not."""
    assert len(inputs) > 0, "Must have at least one input."
    response = cohereClient.classify(  
        model="large",  
        inputs=inputs,  
        examples=examples
    )
    return response.classifications


def get_subreddit_toxicity(inputs): # Ideally would be a subreddit name here but for now it will be inputs
    """
    Find the toxicity value of the specified subreddit.
    Adds 96 since that is the maximum number of inputs accepted in one request to cohere API.
    """
    # Launch reddit API and retrieve list of text inputs
    start_index = 0
    total_toxicity_val = 0
    while start_index < len(inputs):
        print("Making a request to Cohere API")
        classifications = get_classifications(inputs[start_index:start_index + 96])
        for classification in classifications:
            total_toxicity_val += classification.labels["Toxic"].confidence
        start_index += 96
    
    return total_toxicity_val / len(inputs)
'''


"""Saves a generated report to the db"""
def saveGeneratedReport(subreddit, timestamp, score, records_analyzed, is_current, is_post):
    dbUtils.executeInsertOrUpdate(dbUtils.generateFullInsertStmt(subreddit, timestamp, score, records_analyzed, is_current, is_post))    
    setAllReportsNotCurrentExceptForNewest(subreddit, is_post)

def getAllGeneratedReports():
    return dbUtils.select_query('SELECT * from report;')

def getGeneratedReport(id):
    return dbUtils.select_query('SELECT * from report where id = ' + str(id) + ";")

def getAllCurrentGeneratedReports():
    return dbUtils.select_query("SELECT * from report where is_current = 1;")

def getAllGeneratedReportsForSubreddit(sub_name):
    return dbUtils.select_query("SELECT * from report where subreddit = '" + sub_name + "';")

def getAllCurrentGeneratedReportsForSubreddit(sub_name):
    return dbUtils.select_query("SELECT * from report where subreddit = '" + sub_name + "' AND is_current = 1;")

def setAllReportsNotCurrentExceptForNewest(sub_name, is_post):
    newestId = getNewestReportForSubreddit(sub_name, is_post)
    setAllReportsNotCurrentExceptForOne(sub_name, is_post, newestId)  

def setAllReportsNotCurrentExceptForOne(sub_name, is_post, idOfOneToKeepCurrent):
    dbUtils.executeInsertOrUpdate(dbUtils.generateUpdateStmtToSetNotCurrent(sub_name, is_post, idOfOneToKeepCurrent))

def getNewestReportForSubreddit(sub_name, is_post):
    query = "SELECT * from report where subreddit = '" + sub_name + "' AND is_post = " + str(is_post) + "\n ORDER BY timestamp DESC;"    
    print(query)
    # print (dbUtils.select_query(query))[0]
    return dbUtils.select_query(query)[0].id
    
'''
# TESTING ================================================================



examples = get_examples(0.1)

# examples = [
#   Example("you are hot trash", "Toxic"),  
#   Example("go to hell", "Toxic"),
#   Example("get rekt moron", "Toxic"),  
#   Example("get a brain and use it", "Toxic"), 
#   Example("say what you mean, you jerk.", "Toxic"), 
#   Example("Are you really this stupid", "Toxic"), 
#   Example("I will honestly kill you", "Toxic"),  
#   Example("yo how are you", "Not Toxic"),  
#   Example("I'm curious, how did that happen", "Not Toxic"),  
#   Example("Try that again", "Not Toxic"),  
#   Example("Hello everyone, excited to be here", "Not Toxic"), 
#   Example("I think I saw it first", "Not Toxic"),  
#   Example("That is an interesting point", "Not Toxic"), 
#   Example("I love this", "Not Toxic"), 
#   Example("We should try that sometime", "Not Toxic"), 
#   Example("You should go for it", "Not Toxic")
# ]

inputs = [
#   "Title: falling asleep in class content: b'I just want to know if anyone else struggles with this and what they do to fix it. Basically I think that my brain is wired to think that class time is the time to take a nap. No matter how many hours of sleep i get the night before i always end up getting sleepy/falling asleep during my classes and it\xe2\x80\x99s getting really frustrating. Most of my class notes end up being gibberish bc i\xe2\x80\x99m always half asleep when type them\xf0\x9f\x98\xad.'",
#   "Asshole",
#   "Dumbass",
#   "Ok",
#   "The quizzes are HORRIBLE. 45 mins to write 5 multiple choice questions and 2 written out answers that seem so random and vague it makes me want to pull my hair out. The grading rubric is literally the most unfair thing I�ve ever seen in any class: short answer questions are worth 2 pts out of 12.5 and if ANYTHING is wrong in your answer, automatic 0 on the question. I�ll give an example: I had the correct answer and explanation but put the wrong abbreviation for one of the enzymes, lost all the points (that�s 16% of the grade!). Not to mention they use lockdown browser, which is a whole other issue.",
    "I hate this program"
]

from time import time
start = time()
print(get_subreddit_toxicity(inputs))
end = time()
print(f"Time taken: {end - start}")
'''