const TwetchCrypto = require("../crypto");

test('ephemeral ecies', () => {
    const msg = "hello";
    const priv = "KwjURBciGgHp7iyrcdreMYM641yYbZ9TAZLSEnmmKnkMUZKyXgJv";
    const pub = "02dae575a43c9fd8b9b070a65ee817e0b98087e526b30f8c83534e0b56b9d929b5";

    const encrypted = TwetchCrypto.eciesEphemeralEncrypt(msg, pub);
    const decrypted = TwetchCrypto.eciesDecrypt(Buffer.from(encrypted.message, 'hex').toString('base64'), priv);

    console.log(encrypted);
    console.log(decrypted);

    expect(decrypted).toBe(msg);
});