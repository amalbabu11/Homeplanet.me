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
# Add new py files into this item.
FILES = $(SRC)/server.py
REQ = requirements.txt

DOCKER_NAME = backend
INNER_PORT = 8000
OUTTER_PORT = 8000
WORKDIR = /usr/src/backend

run: check
	$(PYTHON) $(SERVER)

check: $(FILES)
	pylint $(FILES)

$(REQ):
	pipreqs .

docker: $(REQ)
	docker build . -t $(DOCKER_NAME)

docker_run: docker
	docker run -itd -p $(INNER_PORT):$(OUTTER_PORT) -v $(shell pwd):$(WORKDIR) $(DOCKER_NAME)

clean:
	rm -rf __pycache__