docker build -t test_node_example .

docker run -p 7500:7500 test_node_example bash -c "PORT=7500 npm start"
