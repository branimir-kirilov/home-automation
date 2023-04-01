export default class StorageService {
    static setData(key: string, value: any): void {
        try {
            localStorage.setItem(key, value);
        } catch (err) {
            console.log(err);
        }
    }
    
    static getData(key: string, value: any): string | null {
        try {
            return localStorage.getItem(key);
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
