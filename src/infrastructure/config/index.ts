import * as dotenv from 'dotenv';
dotenv.config();

export type ConfigType = {
  APP_PORT: number;
  DB_URL: string;
  ACCESS_SECRET: string;
  ACCESS_TIME: string;
  REFRESH_SECRET: string;
  REFRESH_TIME: string;
};

const requiredVariables = [
  'APP_PORT',
  'DB_URL',
  'JWT_ACCESS_SECRET',
  'JWT_ACCESS_TIME',
  'JWT_REFRESH_SECRET',
  'JWT_REFRESH_TIME',
];

const missingVariables = requiredVariables.filter((variable) => {
  const value = process.env[variable];
  return !value || value.trim() === '';
});

if (missingVariables.length > 0) {
  console.error(`Missing or empty environment variables`);
  process.exit(1);
}

export const config: ConfigType = {
  APP_PORT: +process.env.APP_PORT,
  DB_URL: process.env.DB_URL,
  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  ACCESS_TIME: process.env.JWT_ACCESS_TIME,
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  REFRESH_TIME: process.env.JWT_REFRESH_TIME,
};
