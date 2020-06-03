#!/usr/bin/env bash
rm -rf build
npm run build
aws s3 cp ./build s3://sam-ranks/ --recursive --acl public-read