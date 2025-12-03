export type Environment = {
  SECRET_KEY: string;
  SALT_ROUNDS: number;
  DB_URL: string;
  PORT: number;
};

export const env = process.env as unknown as Environment;
