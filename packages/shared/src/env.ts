import { throwError } from "./logging";

/**
 * Get an environment variable
 *
 * If the environment variable is not found, it will log and throw an error.
 *
 * @param key - The environment variable key
 * @returns The environment variable value
 */
export const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throwError(`${key} is not set`);
  }

  return value as string;
};
