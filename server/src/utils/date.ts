export function getExpiresDate(days: number): Date {
    const date = new Date();
    return new Date(date.setDate(date.getDate() + days));
}
