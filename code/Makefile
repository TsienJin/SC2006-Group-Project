

next:
	cd ./nextjs; npm install; yarn dev

django:
	cd ./myDjango; \
	pip3 install -r requirements.txt; \
	python3 manage.py makemigrations; \
	python3 manage.py migrate; \
	python3 manage.py runserver





runserver: django next

# Needs to run with -j2 flag in order to run both client and server.
.DEFAULT_GOAL := runserver