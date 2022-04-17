# Simple Cache
The package that give you a runtime cache as simple as possible.

### Usage Example
```JS
import SimpleCache from '@arlandantas/simple-cache';

// Populates cache
SimpleCache.set('key', 'value');

// Populates cache with an specific TTL (in seconds)
SimpleCache.set('key', 'value', 30);

// Get cache value
SimpleCache.get('key');

// Get cache value with fallback value, that will be returned if the key is not set
SimpleCache.get('key', 'default value');

// Unset cache value
SimpleCache.unset('key');

// Get an object with entire cache key values
SimpleCache.getAllKeyValues();
```

### Installation
```
# NPM
npm i @arlandantas/simple-cache

# YARN
yarn add @arlandantas/simple-cache
```