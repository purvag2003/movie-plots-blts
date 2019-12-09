import mysql.connector
from flask import current_app as app

from .model.movie import Movie


class MovieStore:
    # TODO: Ideally select only the required fields explicitly
    SELECT_QUERY = "SELECT * FROM movies.movie title"

    UPDATE_QUERY = "UPDATE `movies`.`movie` " \
                   "SET `release_year` = %(release_year)s, " \
                   "`title` =  %(title)s, " \
                   "`origin` = %(origin)s, " \
                   "`director` = %(director)s, " \
                   "`cast` =  %(cast)s, " \
                   "`genre` = %(genre)s, " \
                   "`wiki` =  %(wiki)s, " \
                   "`plot` = %(plot)s" \
                   "WHERE (`id` = %(id)s);"

    def __init__(self):
        self.cnx = None

    def list(self, page, limit, title=None):
        cursor = self.get_connection().cursor()
        offset = page * limit

        sql = MovieStore.SELECT_QUERY

        # filter if required
        if title is not None:
            sql += " WHERE title LIKE '%{}%'".format(title)

        # add limit
        sql += " LIMIT {} OFFSET {} ".format(limit, offset)

        # TODO: Delete this log
        print(sql)

        cursor.execute(sql)
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

    def save(self, id, movie_record):
        print("{}, {}".format(id, movie_record))

        update_record = {
            'id': id,
            'release_year': movie_record['release_year'],
            'title': movie_record['title'],
            'origin': movie_record['origin'],
            'director': movie_record['director'],
            'cast': movie_record['cast'],
            'genre': movie_record['genre'],
            'wiki': movie_record['wiki'],
            'plot': movie_record['plot'],
        }

        cnx = self.get_connection()
        cursor = cnx.cursor()
        cursor.execute(MovieStore.UPDATE_QUERY, update_record)

        # TODO: Needs research on what's the proper way to handle connections and cursors
        cnx.commit()
        cursor.close()

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
