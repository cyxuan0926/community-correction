#!/usr/bin/env sh

# 当发生错误时中止脚本

set -e

# 构建
npm run build:dev

#cd 到构建目录下
cd dist

git add .
git commit --no-verify -m "deploy"

git push -f cyxuan-correction gh-pages:dev

cd -