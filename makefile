VERSION_FILE=version.txt
VERSION=$(shell cat $(VERSION_FILE))
SPLIT_VERSION=$(subst ., ,$(VERSION))
MAJOR=$(word 1,$(SPLIT_VERSION))
MINOR=$(word 2,$(SPLIT_VERSION))
PATCH=$(word 3,$(SPLIT_VERSION))

apply-migrations:
	docker compose run --rm backend python manage.py makemigrations
	docker compose run --rm backend python manage.py migrate

db-shell:
	docker compose exec db bash

build-backend:
	docker compose build --no-cache backend

version-ts:
	@echo "export const APP_VERSION = '$(VERSION)'" > frontend/src/version.ts
	@echo "📝 Updated frontend/src/version.ts to v$(VERSION)"
	
push: version-ts
	@bash ./push.sh $(filter-out $@,$(MAKECMDGOALS))

%:
	@:

frontend:
	docker compose build --no-cache frontend