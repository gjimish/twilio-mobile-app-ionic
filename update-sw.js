const { readFileSync, writeFileSync } = require('fs');

const SERVICE_WORKER_FILENAME = './build/service-worker.js';
const generatedSw = readFileSync(SERVICE_WORKER_FILENAME);
const updatedSw = `importScripts("https://js.pusher.com/beams/service-worker.js");\n${generatedSw}`;
writeFileSync(SERVICE_WORKER_FILENAME, updatedSw);
