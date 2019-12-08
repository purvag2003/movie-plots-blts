# Import the Flask package
from flask import Flask
from .movie_store import MovieStore
import json
from flask_cors import CORS

# Initialize Flask
app = Flask(__name__)

# TODO: Limit access to certain domains and allow for dev only
CORS(app)

store = MovieStore()


# Define the index route
@app.route("/")
def index():
    return "Hello from Flask!"


# Define the index route
@app.route("/movies", methods=['GET'])
def movies():
    movies_records = store.list(
        page=0,
        limit=10
    )
    return _movies_to_json(movies_records)


# TODO: quick hack, there are more elegant way of handling this.
def _movies_to_json(movies_records):
    movies_json = []

    for movie in movies_records:
        movies_json.append(
            movie.__dict__
        )

    return json.dumps(movies_json)
