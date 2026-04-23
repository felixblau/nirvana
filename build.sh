#!/bin/bash
set -e
for app in pt-checkin clear1 health-ai; do
  cd "$app" && npm install && npm run build && cd ..
  mkdir -p "dist/$app"
  cp -r "$app/dist/"* "dist/$app/"
done
