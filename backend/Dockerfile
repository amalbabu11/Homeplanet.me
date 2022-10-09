FROM ubuntu

RUN apt update && apt install -y python3 python3-pip make
RUN pip3 install flask
ADD ./ /usr/src/backend/
