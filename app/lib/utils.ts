export function getEnvSafe(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export function getPublicEnvSafe(value?: string) {
  if (!value) {
    throw new Error("Missing public environment variable");
  }
  return value;
}
