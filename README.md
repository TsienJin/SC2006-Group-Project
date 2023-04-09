# SC2006-Group-2 Naviloo

![Naviloo](https://user-images.githubusercontent.com/77908956/230632201-274c5e65-2207-44c5-a8db-307cd286ea50.gif)


## Software requirements

The web application features a TypeScript frontend and a Python Backend.
We utilise a React Meta framework `Next.js` for our front end, and `Django` for our backend.
`PostgreSQL` is used for our database.

1. [Node JS](https://nodejs.org/en/download)
2. [Python 3](https://www.python.org/downloads/)
3. [PostgreSQL](https://www.postgresql.org/download/)




## How to run

The source code in this repo is housed under `/code/` with the following structure.

```
code
 ├── Makefile
 ├─> myDjango
 ├─> nextjs
 └── run.sh
```



### Environment variables

Within this project, there are a few environment `.env` files that require population.

1. `/code/nextjs/.env.local`

```dotenv
NEXT_PUBLIC_MAPBOX_KEY=  # Mapbox public key
NEXT_PUBLIC_MAPBOX_STYLE=mapbox://styles/tsienjin/cldedq01h007c01r0t9ctf0ak
NEXT_PUBLIC_BACKEND=http://localhost:8000  # NOTE no trailing slash
```

2. `/code/myDjango/myDjango/.env`

```dotenv
DATABASE_NAME= # as defined for PostgreSQL
DATABASE_USER= # as defined for PostgreSQL
DATABASE_PASSWORD= # as defined for PostgreSQL
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432

SECRET_KEY= # Django secret key
NEXT_PUBLIC_MAPBOX_KEY=
LTA_API_KEY=

# For SUPER USER in django
USERNAME= 
EMAILADDRESS=
PASSWORD=
```



### Starting the server

There are 3 ways that can be used to run the app, each with their pros and cons.



#### 1. Makefile

The makefile is found at `/code/Makefile`. It is configured to purely run `Next JS` and `Django` in a development environment. However, since to run both the fontend and the backend, it required 2 simultanious jobs. This can be done by passing the `-j 2` flag.



Navigate to `/code/` and execute the following code.

```bash
make -j 2
```



In order to wipe the database of the `PostgreSQL` server for a reset, the target `flush_runserver` has to be specified.

```bash
make flush_runserver -j 2
```



Both of these methods contain the commands required to install dependencies for `Next.js` and `Django`, and also makes the necesarry databse migrations for `Django`. 



#### 2. Bash script

To simplify the earlier process, a `bash` script can be found as `/code/run.sh` that executes the command `make -j 2`. This file has to be made executable.

```bash
bash ./run.sh
```



#### 3. Natively starting each component

For this method, two separate terminal sessions are required.



**Starting `Next.js`**

This process is much easier than the backend due to `npm` and packages in the directory of the application.

```bash
cd code
npm install
npm run dev # OR yarn dev
```



**Starting `Django`**

This requires considerably more steps in order to manage the database.

```bash
cd myDjango
pip3 install -r requirements.txt
python3 manage.py makemigrations singlepage
python3 manage.py migrate singlepage
python3 manage.py runserver
```



The following steps can be used to flush the database and add an admin user for PostgreSQL Database.

```bash
cd myDjango
pip3 install -r requirements.txt
python3 manage.py makemigrations singlepage
python3 manage.py migrate singlepage
python3 manage.py flush --noinput
python3 manage.py migrate singlepage
DJANGO_SUPERUSER_USERNAME=naviloo DJANGO_SUPERUSER_EMAIL=admin@naviloo.com DJANGO_SUPERUSER_PASSWORD=123 ./manage.py createsuperuser --noinput
python3 manage.py runserver
```
