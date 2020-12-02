<!-- Run nats streaming docker container for testing on local -->
docker run -p 4222:4222 -p 6222:6222 -p 8222:8222 nats-streaming --user admin --pass password -m 8222

<!-- git commands -->
git clean -f/fd
git reset HEAD --hard

<!-- Gcloud describe cluster -->
Detail of cluster    : gcloud container clusters describe my-private-cluster
Get context          : gcloud container clusters get-credentials private-cluster
Sign out all account : gcloud revoke --all

<!-- Kubectl commands -->
Delete context : kubectl config delete-context [project name] 
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
Install ingress on GCP : kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml
