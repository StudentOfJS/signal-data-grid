type SortableType = string | number | Date | boolean;

// Cache for memoization
const cache = new Map<string, any[]>();
const CACHE_SIZE_LIMIT = 100;

/**
 * Creates a cache key from the sorting parameters
 */
function createCacheKey<T>(arr: T[], prop: keyof T, isDsc?: boolean): string {
  return `${JSON.stringify(arr)}-${String(prop)}-${isDsc}`;
}

/**
 * Sorts an array of objects by a specified property with memoization
 * @template T - The type of objects in the array
 * @template K - The key type of the property to sort by
 * @param {T[]} arr - The array to sort
 * @param {K} prop - The property key to sort by
 * @param {boolean} [isDsc] - Sort in descending order if true
 * @returns {T[]} A new sorted array
 */
export function sort<T extends Record<K, SortableType | null | undefined>, K extends keyof T>(
  arr: T[],
  prop: K,
  isDsc?: boolean
): T[] {
  const cacheKey = createCacheKey(arr, prop, isDsc);
  
  // Check cache first
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) {
    return [...cachedResult];
  }

  // Perform sorting if not in cache
  const result = [...arr].sort((a, b) => {
    // Handle null/undefined values
    if (a[prop] == null && b[prop] == null) return 0;
    if (a[prop] == null) return isDsc ? -1 : 1;
    if (b[prop] == null) return isDsc ? 1 : -1;

    // Handle different data types
    const valueA = a[prop] as SortableType;
    const valueB = b[prop] as SortableType;
    if (!isNaN(Date.parse(valueA as string)) && !isNaN(Date.parse(valueB as string))) {
      const dateA = Date.parse(valueA as string);
      const dateB = Date.parse(valueB as string);
      return isDsc
        ? dateB - dateA
        : dateA - dateB;
    }

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return isDsc
        ? valueB.localeCompare(valueA)
        : valueA.localeCompare(valueB);
    }

    // Handle numbers and booleans
    return isDsc
      ? (valueB as number) - (valueA as number)
      : (valueA as number) - (valueB as number);
  });

  // Manage cache size
  if (cache.size >= CACHE_SIZE_LIMIT) {
    const firstKey = cache.keys().next().value;
    if (firstKey !== undefined) {
      cache.delete(firstKey);
    }
  }

  // Store result in cache
  cache.set(cacheKey, result);
  return result;
}

/**
 * Clears the sort cache
 */
export function clearSortCache(): void {
  cache.clear();
}
