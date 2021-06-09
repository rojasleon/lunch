1. Manager press a button to order a dish
2. In the kitchen there're 6 recipies
   All ingredients have to be used in at least ONE recipe

3. Cook has to pick up from the 6 recipies to prepare a dish
4.

// restart deployment
k rollout restart deployment storage-depl

delete all containers including its volumes
docker rm -vf $(docker ps -a -q)

docker rmi -f $(docker images -a -q)
docker rmi -f $(docker images -a -q)

Delete all pods and services in namespace my-ns,
kubectl -n [namespace] delete pod,svc --all
