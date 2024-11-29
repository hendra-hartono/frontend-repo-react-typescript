import crypto from "crypto";
const { VITE_SECRET_KEY, VITE_SECRET_IV, VITE_ENCRYPTION_METHOD } = import.meta
  .env;

if (!VITE_SECRET_KEY || !VITE_SECRET_IV || !VITE_ENCRYPTION_METHOD) {
  throw new Error("SECRET_KEY, SECRET_IV, ENCRYPTION_METHOD must be defined.");
}

const key = crypto
  .createHash("sha512")
  .update(VITE_SECRET_KEY)
  .digest("hex")
  .substring(0, 32);

const encryptionIV = crypto
  .createHash("sha512")
  .update(VITE_SECRET_IV)
  .digest("hex")
  .substring(0, 16);

export function decryptData<T>(encryptedData: T) {
  const buff = Buffer.from(encryptedData as string, "base64");
  const decipher = crypto.createDecipheriv(
    VITE_ENCRYPTION_METHOD!,
    key,
    encryptionIV
  );
  return JSON.parse(
    decipher.update(buff.toString("utf8"), "hex", "utf8") +
      decipher.final("utf8")
  );
}
