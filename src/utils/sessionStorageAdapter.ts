import { StorageAdapter } from "../context/auth";

class SessionStorageAdapter implements StorageAdapter {
  private SESSION_STORAGE_KEY = "app_token";

  set(value: string) {
    sessionStorage.setItem(this.SESSION_STORAGE_KEY, value);
  }

  get() {
    return sessionStorage.getItem(this.SESSION_STORAGE_KEY) || "";
  }

  delete() {
    sessionStorage.removeItem(this.SESSION_STORAGE_KEY);
  }
}

export default new SessionStorageAdapter();
