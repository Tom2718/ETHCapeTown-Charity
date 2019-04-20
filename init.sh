# Simple script to initialise the app
# after git clone

echo "Initialising Repo"
npm i
ganache-cli --secure -u 0 -u 1 -u 2 --deterministic &
zos init zepkit

echo "Building client"
cd client
npm i
npm run start
