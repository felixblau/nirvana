#!/bin/bash
set -e
for app in pt-checkin clear1 clear1-demo health-ai wallet-e2e invite gemmd chatpcp lifestance lifestance-demo sagent sagent-demo nehs nehs-demo pledge; do
  cd "$app" && npm install && npm run build && cd ..
done

for app in pt-checkin clear1 clear1-demo wallet-e2e lifestance lifestance-demo sagent sagent-demo nehs nehs-demo; do
  mkdir -p "dist/$app"
  cp -r "$app/dist/"* "dist/$app/"
done

mkdir -p "dist/amazon"
cp -r "health-ai/dist/"* "dist/amazon/"

mkdir -p "dist/invite"
cp -r "invite/dist/"* "dist/invite/"

mkdir -p "dist/gemmd"
cp -r "gemmd/dist/"* "dist/gemmd/"

mkdir -p "dist/chatpcp"
cp -r "chatpcp/dist/"* "dist/chatpcp/"

mkdir -p "dist/nav"
cp nav/index.html "dist/nav/index.html"

mkdir -p "dist/chatgpt-work"
cp -r chatgpt-work/* "dist/chatgpt-work/"

mkdir -p "dist/pledge"
cp -r "pledge/dist/"* "dist/pledge/"
