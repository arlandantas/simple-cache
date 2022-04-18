module.exports = class SimpleCache {
    static #cache = {};

    /** 
     * Get cache key value
     * @method get
     * @static
     * @param {string} key - Key of the cached value
     * @param {any} default_value - Value to be returned if the key is not set yet
     * @returns any
     * @example
     * // Get cache value without fallback value
     * SimpleCache.get('key');
     * @example
     * // Get cache value with fallback value
     * SimpleCache.get('key', 'default value');
     */
    static get = function (key, default_value = undefined) {
        SimpleCache.#removeExpiredValues();
        return SimpleCache.#cache[key]?.value ?? default_value;
    }

    /** 
     * Set cache key value
     * @method set
     * @static
     * @param {string} key - Key to set cache
     * @param {any} value - Value to be set
     * @param {(number|null)} ttl - Time in seconds to expire the cache
     * @returns void
     * @example
     * // Populates cache
     * SimpleCache.set('key', 'value');
     * @example
     * // Populates cache with an specific TTL
     * SimpleCache.set('key', 'value', 30);
     */
    static set = function (key, value, ttl = null) {
        SimpleCache.#removeExpiredValues();
        SimpleCache.get()
        let ttlDate = null;
        if (isFinite(ttl) && ttl > 0) {
            ttlDate = new Date();
            ttlDate.setSeconds(ttlDate.getSeconds() + parseFloat(ttl));
        }
        SimpleCache.#cache[key] = {
            value,
            ttl: ttlDate,
        };
    }

    /** 
     * Unset cache key value
     * @method unset
     * @static
     * @param {string} key - Key to set cache
     * @returns void
     * @example
     * // Unset cache
     * SimpleCache.unset('key');
     */
    static unset = function (key) {
        delete SimpleCache.#cache[key];
    }

    /** 
     * Verify whether cache key is setted
     * @method isset
     * @static
     * @param {string} key - Key to verify
     * @returns Boolean
     * @example
     * // Verify cache is set
     * SimpleCache.isset('key');
     */
    static isset = function (key) {
        return !!SimpleCache.#cache[key]?.value;
    }

    /** 
     * Unset every cache key
     * @method clear
     * @static
     * @param {string} key - Key to verify
     * @returns void
     * @example
     * // Verify cache is set
     * SimpleCache.isset('key');
     */
    static clear = function () {
        SimpleCache.#cache = {};
    }

    /** 
     * Unset expired cache keys
     * @method #removeExpiredValues
     * @static
     * @private
     * @returns void
     * @example
     * SimpleCache.#removeExpiredValues();
     */
    static #removeExpiredValues = function () {
        const now = new Date();
        for (const [key, { value, ttl }] of Object.entries(SimpleCache.#cache)) {
            if (ttl && ttl <= now) {
                delete SimpleCache.#cache[key];
            }
        }
    }
}