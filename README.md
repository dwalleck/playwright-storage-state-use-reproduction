# Change in behavior of storageState/use in Playwright 1.21/1.22

## Steps to reproduce

1. `npm install`
2. `npx playwright install`
3. `npx playwright test`
4. All tests should pass
5. Change the version of @playwright/test to `1.22.2` in `package.json`
6. `npm install`
7. `npx playwright install`
8. `npx playwright test`
9. The test should fail with an error message similar to the one below

```
Error: ENOENT: no such file or directory, open 'C:\Users\dwall\repos\playwright-storage-state-use-reproduction\storage-states\state-repro.test.js-755875be-fbda-41d9-a2d9-9ae5edeba758.json'
```

## What is our scenario?

A new entity is created for each test file with its own admin user.
We had been able to log in with this new admin user and create a storage state file
for the admin of the entity.

Starting with Playwright 1.21.0, I have run into the issue described in the previous section, which has stopped us from using newer versions of Playwright.
Since we do not know the user or credentials ahead of time, we can't rely on static state files as described in [the Authentication section of the docs](https://playwright.dev/docs/test-auth).