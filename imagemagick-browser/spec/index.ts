jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

require('../../node_modules/jasmine-expect/src/index.js') // hack to load jasmine-matchers before out specs so it gets bundled

export * from './testAssetsSpec'
