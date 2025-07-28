#!/bin/sh

npx npm run db:deploy || exit 1
npx npm run db:generate || exit 1
npx npm run seed
npm run start:dev
