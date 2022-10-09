FROM ubuntu

ENTRYPOINT [ "make", "run" ]
WORKDIR /usr/src/backend/

RUN apt update && apt install -y python3 python3-pip make
COPY ./requirements.txt ../
RUN pip3 install -r ../requirements.txt && pip3 install pylint
