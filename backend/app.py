from flask import Flask, Response, request
import pyodbc

app = Flask(__name__)

@app.route("/hello")
def helloWorld():
    return "Hello World!"

if __name__ == '__main__':
    # app.run(host="127.0.0.1",port="8080", debug=True)
