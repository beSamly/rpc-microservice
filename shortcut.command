alias kdall="kubectl delete --all deployments && kubectl delete --all services && kubectl delete --all pods"
alias kgp='kubectl get pods'
alias k='f(){ kubectl "$@" -o wide;  unset -f f; }; f'
alias kan='f(){ kubectl "$@" --all-namespaces -o wide;  unset -f f; }; f'
