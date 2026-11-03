#!/usr/bin/env bash
set -Eeuo pipefail

# Build the Logseq publishing SPA in Cloudflare Workers Builds without root access.
# The frontend and graph parser are pinned to Logseq 0.10.6 for reproducibility.

TOOLS="$HOME/.local"
mkdir -p "$TOOLS/jdk" "$TOOLS/bin"

curl -fsSL "https://api.adoptium.net/v3/binary/latest/17/ga/linux/x64/jdk/hotspot/normal/eclipse" -o /tmp/jdk.tar.gz
tar -xzf /tmp/jdk.tar.gz --strip-components=1 -C "$TOOLS/jdk"
export JAVA_HOME="$TOOLS/jdk"
export PATH="$JAVA_HOME/bin:$TOOLS/bin:$PATH"
java -version
node --version
npm --version

# Install Clojure CLI in the build user's home directory.
curl -fsSL https://download.clojure.org/install/linux-install-1.11.1.1182.sh -o /tmp/install-clojure.sh
chmod +x /tmp/install-clojure.sh
/tmp/install-clojure.sh --prefix "$TOOLS"
export PATH="$TOOLS/bin:$PATH"
clojure -Sdescribe

# Yarn is invoked through npx so no global write permission is needed.
yarn() { npx --yes yarn@1.22.22 "$@"; }

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
