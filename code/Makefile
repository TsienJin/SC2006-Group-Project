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
	echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('naviloo', 'naviloo@test.com', '123')" | python manage.py shell; \
	python3 manage.py runserver

runserver: django next

flush_runserver: django_flush next

# Needs to run with -j2 flag in order to run both client and server.
.DEFAULT_GOAL := runserver