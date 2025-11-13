export interface MongoServerError extends Error {
    errmsg: string;
    code: number;
    keyValue: Record<string, unknown>;
}
