import mysql.connector
from flask import current_app as app
from mysql.connector import errorcode

from .model.movie import Movie


class MovieStore:
    # TODO: Ideally select only the required fields explicitly
    SELECT_QUERY = "SELECT * FROM movies.movie LIMIT {} OFFSET {}"

    def __init__(self):
        self.cnx = None

    def list(self, page, limit):
        cursor = self.get_connection().cursor()
        offset = page * limit

        cursor.execute(MovieStore.SELECT_QUERY.format(limit, offset))
        movies = []

        for (id, release_year, title, origin, director, cast, genre, wiki, plot) in cursor:
            print("{}, {}, ()".format(id, release_year, title))
            movie = Movie(
                id=id,
                release_year=release_year,
                title=title,
                origin=origin,
                director=director,
                cast=cast,
                genre=genre,
                wiki=wiki,
                plot=plot
            )
            movies.append(movie)

        cursor.close()
        return movies

    def get_connection(self):
        # TODO: Better way to manage and close connection
        cnx = self.cnx
        if cnx is None:
            cnx = mysql.connector.connect(
                user=app.config['USER'],
                password=app.config['PASSWORD'],
                host=app.config['HOST'],
                database=app.config['DATABASE']
            )

            self.cnx = cnx

        return cnx
