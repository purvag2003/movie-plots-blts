import mysql.connector
from mysql.connector import errorcode
import csv
import uuid


class DataImport:
    INSERT_RECORD_TMPL = "INSERT INTO `movies`.`movie` (`id`, `release_year`, `title`, `origin`, `director`,`cast`, `genre`, `wiki`, `plot`)" \
                         " VALUES (%(id)s, %(release_year)s, %(title)s, %(origin)s, %(director)s, %(cast)s, %(genre)s, %(wiki)s, %(plot)s);"

    def __init__(self, user, password, host, database, data):
        self.user = user
        self.password = password
        self.host = host
        self.database = database
        self.data = data

    def run(self):
        print("Starting the import")
        try:
            print("connecting to database {}".format(self.database))

            cnx = mysql.connector.connect(
                user=self.user,
                password=self.password,
                host=self.host,
                database=self.database
            )

            cursor = cnx.cursor()

            print("start reading data file")
            with open(self.data) as csv_file:
                csv_reader = csv.reader(csv_file, delimiter=',')
                line_count = 0
                for row in csv_reader:
                    if line_count == 0:
                        print(f'Column names are {", ".join(row)}')
                        line_count += 1
                    else:
                        # print(f'\t{row[0]} works in the {row[1]} department, and was born in {row[2]}.')
                        movie_data = {
                            'id': str(uuid.uuid1()),
                            'release_year': row[0],
                            'title': row[1],
                            'origin': row[2],
                            'director': row[3],
                            'cast': row[4],
                            'genre': row[5],
                            'wiki': row[6],
                            'plot': row[7],
                        }
                        cursor.execute(DataImport.INSERT_RECORD_TMPL, movie_data)
                        if line_count % 10:
                            cnx.commit()
                        line_count += 1

                print(f'Processed {line_count} lines.')

            print("Import process successfully completed")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your user name or password")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(err)
        except Exception as e:
            print(e)
        else:
            cnx.commit()
            cursor.close()
            cnx.close()
