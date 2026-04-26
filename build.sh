#!/bin/bash
set -e
for app in pt-checkin clear1 clear1-demo health-ai wallet-e2e invite gemmd lifestance lifestance-demo; do
  cd "$app" && npm install && npm run build && cd ..
done

for app in pt-checkin clear1 clear1-demo wallet-e2e lifestance lifestance-demo; do
  mkdir -p "dist/$app"
  cp -r "$app/dist/"* "dist/$app/"
done

mkdir -p "dist/amazon"
cp -r "health-ai/dist/"* "dist/amazon/"

mkdir -p "dist/invite"
cp -r "invite/dist/"* "dist/invite/"

mkdir -p "dist/gemmd"
cp -r "gemmd/dist/"* "dist/gemmd/"

cp index.html "dist/index.html"
