alias kdall="kubectl delete --all deployments && kubectl delete --all services && kubectl delete --all pods"
alias kgp='kubectl get pods'
alias kgs='kubectl get services'
alias kgin='kubectl get pods -n ingress-nginx'
alias kgi='kubectl get ingress'
alias k='f(){ kubectl "$@" }; f'
alias kan='f(){ kubectl "$@" --all-namespaces -o wide;  unset -f f; }; f'
