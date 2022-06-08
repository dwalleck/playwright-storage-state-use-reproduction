const { test, expect } = require('@playwright/test');
const path = require('path')
const fs = require('fs')
const { v4 } = require('uuid')

const generateStorageStateFile = (filename) => {
  const currentPathSegments = filename.split(path.sep)
  const storageStatePath = `storage-states/state-${currentPathSegments[currentPathSegments.length - 1]
    }-${v4()}.json`
  if (fs.existsSync(storageStatePath)) {
    fs.unlinkSync(storageStatePath)
  }
  return storageStatePath
}

const deleteStorageStateFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

const storageStatePath = generateStorageStateFile(__filename)

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage()
  await page.goto('https://demo.playwright.dev/todomvc');
  console.log(`Setting storage state to ${storageStatePath}`)
  await page.context().storageState({ path: storageStatePath })
  await page.close()
})

test.describe('New Todo', () => {
  console.log(`test.use called with storageState ${storageStatePath}`)
  test.use({ storageState: storageStatePath })

  test('should allow me to add todo items', async () => { console.log('In test') })
})