export default class SimpleCache {
    static #cache = {};

    static get = function (key, default_value = undefined) {
        SimpleCache.#removeExpiredValues();
        return SimpleCache.#cache[key]?.value ?? default_value;
    }

    static set = function (key, value, ttl = null) {
        SimpleCache.#removeExpiredValues();
        let ttlDate = null;
        if (ttl > 0) {
            ttlDate = new Date();
            ttlDate.setSeconds(ttlDate.getSeconds() + ttl);
        }
        SimpleCache.#cache[key] = {
            value,
            ttl: ttlDate,
        };
    }

    static unset = function (key) {
        delete SimpleCache.#cache[key];
    }

    static isset = function (key) {
        return !!SimpleCache.#cache[key]?.value;
    }

    static clear = function () {
        SimpleCache.#cache = {};
    }

    static getAllKeyValues () {
        let mappedValues = Object.entries(SimpleCache.#cache)
            .map(([key, { value }]) => [key, value]);
        return Object.fromEntries(mappedValues);
    }

    static #removeExpiredValues = function () {
        const now = new Date();
        for (const [key, { value, ttl }] of Object.entries(SimpleCache.#cache)) {
            if (ttl && ttl <= now) {
                delete SimpleCache.#cache[key];
            }
        }
    }
}