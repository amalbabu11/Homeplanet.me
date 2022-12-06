ifeq ($(findstring pip, $(shell pip3 --version)), pip)
	PIP = pip3
else
	PIP = pip
endif

ifeq ($(findstring Python 3, $(shell python3 --version)), Python 3)
	PYTHON = python3
else
	PYTHON = python
endif

SERVER = app.py
# Add new py files into this item.
FILES = app.py
TESTS = tests.py
POSTMAN = homeplanet.postman_collection.json
REQ = requirements.txt

DOCKER_NAME = backend
INNER_PORT = 8000
OUTTER_PORT = 8000
WORKDIR = /usr/src/backend

.PHONY: run test

# run: check
run:
	$(PYTHON) $(SERVER)

check: $(FILES)
	pylint $^

format: $(FILES)
	black $^

$(REQ):
	pipreqs . --force

docker: $(REQ)
	docker build . -t $(DOCKER_NAME)

docker_run: docker
	docker run -itd -p $(INNER_PORT):$(OUTTER_PORT) -v $(shell pwd):$(WORKDIR) $(DOCKER_NAME)

test:
	@curl "http://localhost:8000/"
	newman run $(POSTMAN) --env-var "url=http://localhost:8000"
	$(PYTHON) $(TESTS)

clean:
	rm -rf __pycache__