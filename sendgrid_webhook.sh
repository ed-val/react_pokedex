localtunnel (){
  ssh -R wzextycugae5sdtufy:80:localhost:5000 serveo.net
}
until localtunnel; do
echo "serveo.net server crashed"
sleep 2
done
