import { STORAGE } from '../constants';

class StorageService {
    saveUser(user) {
        localStorage.setItem(STORAGE.USER, JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem(STORAGE.USER);
    }

    getUser() {
        return JSON.parse(localStorage.getItem(STORAGE.USER));
    }
}

export default new StorageService();