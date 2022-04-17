# Simple Cache
The package that give you a runtime cache as simple as possible.

### Usage Example
```JS
import SimpleCache from 'simple-cache';

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
SimpleCache.getAllKeyValues()
```

### NPM Module is coming soon
The example code uses the import in package form, but we have not publicated the npm package yet.
If you already want to use our code, you should to import the index file directly.