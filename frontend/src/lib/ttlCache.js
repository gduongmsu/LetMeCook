// Enhanced in-memory TTL cache for Spoonacular API data.
// Supports different lifetimes per endpoint and logs cache hits/misses for development.

class TTLCache {
    constructor() {
        this.map = new Map(); // key -> { value, expiresAt }
    }

    // Internal helper: determine default TTL by key pattern
    _getTTLForKey(key) {
        if (key.startsWith("ingredients:")) return 6 * 60 * 60 * 1000;   // 6 hours
        if (key.startsWith("recipes:")) return 2 * 60 * 60 * 1000;       // 2 hours
        if (key.startsWith("recipe:")) return 24 * 60 * 60 * 1000;       // 24 hours (single recipe details)
        return 60 * 60 * 1000;                                           // 1 hour fallback
    }

    get(key) {
        const entry = this.map.get(key);
        if (!entry) {
            console.log(`[CACHE] MISS → ${key}`);
            return null;
        }
        if (entry.expiresAt && Date.now() > entry.expiresAt) {
            console.log(`[CACHE] EXPIRED → ${key}`);
            this.map.delete(key);
            return null;
        }
        console.log(`[CACHE] HIT → ${key}`);
        return entry.value;
    }

    set(key, value, ttlMs = null) {
        const ttl = ttlMs ?? this._getTTLForKey(key);
        const expiresAt = ttl ? Date.now() + ttl : 0;
        this.map.set(key, { value, expiresAt });
        console.log(`[CACHE] SET → ${key} (expires in ${(ttl / 1000 / 60).toFixed(1)} min)`);
    }

    delete(key) {
        this.map.delete(key);
        console.log(`[CACHE] DELETE → ${key}`);
    }

    clear() {
        this.map.clear();
        console.log(`[CACHE] CLEARED]`);
    }
}

const cache = new TTLCache();
export default cache;