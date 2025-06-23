VERSION_FILE=version.txt
VERSION=$(shell cat $(VERSION_FILE))
SPLIT_VERSION=$(subst ., ,$(VERSION))
MAJOR=$(word 1,$(SPLIT_VERSION))
MINOR=$(word 2,$(SPLIT_VERSION))
PATCH=$(word 3,$(SPLIT_VERSION))

apply-migrations:
	docker compose run --rm backend python manage.py makemigrations
	docker compose run --rm backend python manage.py migrate

push:
	@bash ./push.sh "$(filter-out push,$(MAKECMDGOALS))"