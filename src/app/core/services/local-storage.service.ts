import { Injectable } from '@angular/core'

export enum LocalStorageKeyItem {
    auth = 'auth'
}
const LOCAL_STORAGE_KEY = 'ch-ls_'

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    setItem<T>(key: LocalStorageKeyItem, value: T): void {
        window.localStorage.setItem(this.getKey(key), JSON.stringify(value))
    }

    getItem<T>(key: LocalStorageKeyItem): T | null {
        const data: string | null = window.localStorage.getItem(this.getKey(key))
        return data ? JSON.parse(data) : null
    }

    private getKey(key: LocalStorageKeyItem): string {
        return LOCAL_STORAGE_KEY + key
    }
}
