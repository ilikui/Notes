#!/usr/bin/env bash
set -Eeuo pipefail

# Reproduce the official logseq/publish-spa GitHub Action in Cloudflare Builds.
# Keep the Logseq frontend version pinned for reproducible publishing.

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y --no-install-recommends openjdk-17-jdk-headless git curl ca-certificates
java -version
node --version
npm install --global yarn@1.22.22

curl -fsSL https://download.clojure.org/install/linux-install-1.11.1.1182.sh -o /tmp/install-clojure.sh
chmod +x /tmp/install-clojure.sh
/tmp/install-clojure.sh --prefix /usr/local
clojure -Sdescribe

git clone --depth 1 --branch 0.10.6 https://github.com/logseq/logseq.git .logseq-logseq
git clone --depth 1 https://github.com/logseq/publish-spa.git .logseq-publish-spa

pushd .logseq-logseq
yarn install --frozen-lockfile --network-timeout 240000
yarn gulp:build
clojure -M:cljs release publishing
popd

pushd .logseq-publish-spa
yarn install --frozen-lockfile --network-timeout 240000
yarn nbb-logseq -e ':fetching-deps'
node publish_spa.mjs ../www --static-directory ../.logseq-logseq/static --directory .. --theme-mode light --accent-color blue
popd

touch www/.nojekyll
test -s www/index.html
test -d www/static
echo "Logseq publishing output is ready in ./www"
