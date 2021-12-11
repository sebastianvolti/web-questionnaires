#!/usr/bin/env bash

# Read arguments passed to the script.
if [ -z "$1" ]; then
  ENVIRONMENT='development'
else
  ENVIRONMENT="$1"
fi

echo ""
echo "Seeding for environment: $ENVIRONMENT"
echo ""

echo " -> Step 1/2: Compiling seeders scripts."
echo ""
for filename in ./src/db/seeders/*.ts; do
  yarn tsc -t es2017 --module CommonJS --outDir ./build-seeders/db/seeders/ $filename
done
echo ""
echo " -> Compilation completed."
echo ""

echo ""
echo " -> Step 2/2: Starting seeders."
echo ""
npx ts-node ./node_modules/.bin/sequelize db:seed:all --env $ENVIRONMENT
echo ""
echo " -> Seeders completed."
echo ""
