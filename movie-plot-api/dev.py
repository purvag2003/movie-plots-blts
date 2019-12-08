from app.movie_plot import app

# Run Flask if the __name__ variable is equal to __main__
if __name__ == "__main__":
    app.config.from_pyfile('../config.cfg')
    app.run()
