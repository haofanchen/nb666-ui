#!/usr/bin/env bash
set -e

MSG="${1:-chore: update aurora-ui}"

echo "==> 1/3 构建组件库 (dist)"
npm run build:lib

echo "==> 2/3 构建文档站 (docs-dist)"
npm run build

echo "==> 3/3 提交并推送到 GitHub"
git add -A
git commit -m "$MSG" || echo "没有需要提交的变更"
git push origin main

echo "==> 完成：组件库与文档已推送，文档站将自动部署"
