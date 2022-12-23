class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) return JSON.parse(value)
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

class SessionCache {
  setCache(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = window.sessionStorage.getItem(key)
    if (value) return JSON.parse(value)
  }

  deleteCache(key: string) {
    window.sessionStorage.removeItem(key)
  }

  clearCache() {
    window.sessionStorage.clear()
  }
}

const localCache = new LocalCache()
const sessionCache = new SessionCache()

export { localCache, sessionCache }
