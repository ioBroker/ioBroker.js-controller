echo START
call npm install --production
echo TESTE
node iobroker.js setup
node iobroker.js add admin --enabled --host 0.0.0.0
node 