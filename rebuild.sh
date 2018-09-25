#!/usr/bin/env bash
rm -rf static/ang
cd frontend/
npm run build
cd ..
mkdir static/ang
cp frontend/dist/* static/ang/
rm frontend/dist -rf
