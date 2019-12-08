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

Start development server from ``movie-plot-api`` dir.
```shell script
python3 dev.py
``` 

## Production

TODO: use http server such as Gunicorn https://gunicorn.org/


