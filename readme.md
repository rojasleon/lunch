// restart deployment
k rollout restart deployment storage-depl

delete all containers including its volumes
docker rm -vf $(docker ps -a -q)

docker rmi -f $(docker images -a -q)
docker rmi -f $(docker images -a -q)

Delete all pods and services in namespace my-ns,
kubectl -n [namespace] delete pod,svc --all
