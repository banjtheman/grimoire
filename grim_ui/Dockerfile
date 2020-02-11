FROM docker.io/beevelop/ionic:latest

# Copy dependency definitions
ADD webapp /home/webapp
WORKDIR /home/webapp
RUN npm install
RUN npm install jquery --save
RUN npm install datatables.net --save
RUN npm install datatables.net-dt --save
RUN npm install angular-datatables --save
RUN npm install @types/jquery --save-dev
RUN npm install @types/datatables.net --save-dev

EXPOSE 8100

CMD ["ionic", "serve", "--address", "0.0.0.0", "--port", " 8100"]