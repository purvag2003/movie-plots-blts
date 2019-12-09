## Setup 

setup virtual env

```shell script
virtualenv --python=python3 venv
```

Activate virtual env

```shell script
source venv/bin/activate
```

Install dependencies

```
pip3 install -r requirements.txt
```

## Development

Update database connection strings in `run.py`

```python
user = 'root'
password = ''
host = '127.0.0.1'
database = "movies"
```

Provide file location in `run.py`. `movie_plots.csv` is not committed with this code. 
Download the file from google docs or provide full path to existing file

```python
data = "../data/movie_plots.csv"
```

Start development server from ``movie-plot-api`` dir.
```shell script
python3 run.py
``` 

## Production

TODO: use http server such as Gunicorn https://gunicorn.org/


