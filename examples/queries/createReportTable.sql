CREATE TABLE report
(
    id int IDENTITY(1, 1) PRIMARY KEY,
    subreddit VARCHAR(128),
    timestamp DATETIME NOT NULL,
    score DECIMAL (7, 4) NOT NULL,
    records_analyzed int NOT NULL,
    is_current BIT NOT NULL,
    is_post BIT NOT NULL -- will tell us whether the report was run on posts or comments
)

