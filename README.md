api tests:
- based on axios
- runner mocha
- reporting mochawesome

Command: npm run api_tests


ui tests:
- based on playwright

Command:
ENV=local npx playwright test tests/newborn.spec.js --project chromium --trace on --workers 1 --headed
