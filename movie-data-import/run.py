from movie_import.data_import import DataImport

user = 'root'
password = ''
host = '127.0.0.1'
database = "movies"

data = "../data/movie_plots.csv"

if __name__ == "__main__":
    DataImport(
        user=user,
        password=password,
        host=host,
        database=database,
        data=data
    ).run()
