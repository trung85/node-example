
### Build docker image

docker build -t test_node_example .

docker run -p 7500:7500 test_node_example bash -c "PORT=7500 npm start"


### Push docker image

docker login

docker tag test_node_example:latest minhtrung/node-example:dynamic

docker push minhtrung/node-example:dynamic
