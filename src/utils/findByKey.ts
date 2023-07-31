export function findByKey<T, K extends keyof T>(arr: T[], key: K, value: any) {
    return arr?.find(item => item[key] === value)
}