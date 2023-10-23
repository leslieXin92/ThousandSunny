class LocalCache {
  set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) return JSON.parse(value)
  }

  delete(key: string) {
    window.localStorage.removeItem(key)
  }

  clear() {
    window.localStorage.clear()
  }
}

class SessionCache {
  set(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string) {
    const value = window.sessionStorage.getItem(key)
    if (value) return JSON.parse(value)
  }

  delete(key: string) {
    window.sessionStorage.removeItem(key)
  }

  clear() {
    window.sessionStorage.clear()
  }
}

export const localCache = new LocalCache()

export const sessionCache = new SessionCache()
