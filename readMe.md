<!-- Run nats streaming docker container for testing on local -->

docker run -p 4222:4222 -p 6222:6222 -p 8222:8222 nats-streaming --user admin --pass password -m 8222

<!-- git commands -->

git clean -f/fd
git reset HEAD --hard

<!-- Gcloud describe cluster -->

Detail of cluster    : gcloud container clusters describe my-private-cluster
Get context          : gcloud container clusters get-credentials private-cluster
Get list of config   : gcloud config configurations list
Sign out all account : gcloud auth revoke --all
Switch config        : gcloud config configurations activate [myprivatecluster]

<!-- Kubectl commands -->

Delete context           : kubectl config delete-context [project name]
Delete ingress-admission : kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
for private cluster
Install ingress on GCP   : kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml
Details of hpa           : describe hpa.v2beta2.autoscaling hpa-name

<!-- Helm -->

helm repo add stable https://charts.helm.sh/stable

<!-- Install prometheus: https://github.com/prometheus-community/helm-charts -->

<!-- Linkerd with private cluster : GKE private clutser require extra set up for using linkerd -->
Follow the steps below:
https://linkerd.io/2/reference/cluster-configuration/#private-clusters

<!-- Apply Linkerd to the cluster  -->
1.Install linkerd       : brew install linkerd
2.Check installation    : linkerd version
3.Install linkerd onto the cluster : linkerd install | kubectl apply -f -
4.Validate installation : linkerd check
5.Create mesh service: 
kubectl get [-n emojivoto] deploy -o yaml \
  | linkerd inject - \
  | kubectl apply -f -
6.Check proxy : linkerd -n emojivoto check --proxy
