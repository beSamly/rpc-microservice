<!-- Run docker container -->
docker run -p 4222:4222 -p 6222:6222 -p 8222:8222 nats-streaming --user admin --pass password -m 8222


<!-- Change current namespace -->
kubectl config set-context --current --namespace=my-namespace

<!-- Get current namespace -->
kubectl config view | grep namespace

<!-- GCP service account secret key -->
b8d491b8b9a99bc19d378eeaffa8648749852ba1