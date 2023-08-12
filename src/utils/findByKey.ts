export function findByKey<T, K extends keyof T>(arr: T[], key: K, value: string | number | boolean) {
    return arr?.find(item => item[key] === value)
}