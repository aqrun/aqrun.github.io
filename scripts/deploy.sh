#!/usr/bin/env bash

echo "内容打包打布: [num run deply]"
npm run deploy

echo "--------------------------------"
echo "代码推送: [git push origin master]"
git push origin master -f