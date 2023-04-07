next:
	echo "$$PATH"; \
	cd nextjs; npm install; yarn dev

django:
	cd myDjango; \
	pip3 install -r requirements.txt; \
	python3 manage.py makemigrations singlepage; \
	python3 manage.py migrate singlepage; \
	python3 manage.py runserver

django_flush:
	cd myDjango; \
	pip3 install -r requirements.txt; \
	python3 manage.py makemigrations singlepage; \
	python3 manage.py migrate singlepage; \
	python3 manage.py flush --noinput; \
	python3 manage.py migrate singlepage; \
	DJANGO_SUPERUSER_USERNAME=naviloo DJANGO_SUPERUSER_EMAIL=admin@naviloo.com DJANGO_SUPERUSER_PASSWORD=123 ./manage.py createsuperuser --noinput; \
	python3 manage.py runserver

runserver: django next

flush_runserver: django_flush next

# Needs to run with -j2 flag in order to run both client and server.
.DEFAULT_GOAL := runserver