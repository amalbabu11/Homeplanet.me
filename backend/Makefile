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

SRC = src
SERVER = $(SRC)/server.py

DOCKER_NAME = backend
INNER_PORT = 8000
OUTTER_PORT = 8000

run:
	$(PYTHON) $(SERVER)

docker:
	docker build . -t $(DOCKER_NAME)

docker_run: docker
	docker run -itd -p $(INNER_PORT):$(OUTTER_PORT) $(DOCKER_NAME) python3 /usr/src/backend/src/server.py

clean:
	rm -rf __pycache__