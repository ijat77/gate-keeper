const encoder = new TextEncoder('utf-8');
const decoder = new TextDecoder('utf-8');

const toBase64 = buffer =>
    btoa(String.fromCharCode(...new Uint8Array(buffer)));

const fromBase64 = buffer =>
    Uint8Array.from(atob(buffer), c => c.charCodeAt(0));

var cryptoApi = {
    //encoder: new TextEncoder(),

    toBase64: buffer =>
        btoa(String.fromCharCode(...new Uint8Array(buffer))),

    PBKDF2: async(
        password, salt, iterations,
        length, hash, algorithm = 'AES-GCM') => {

        keyMaterial = await window.crypto.subtle.importKey(
            'raw',
            encoder.encode(password), { name: 'PBKDF2' },
            false, ['deriveKey']
        );

        return await window.crypto.subtle.deriveKey({
                name: 'PBKDF2',
                salt: encoder.encode(salt),
                iterations,
                hash
            },
            keyMaterial, { name: algorithm, length },
            false, // we don't need to export our key!!!
            ['encrypt', 'decrypt']
        );
    },

    encrypt: async function(text, password) {
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const iv = window.crypto.getRandomValues(new Uint8Array(16));
        const plain_text = encoder.encode(text);
        const key = await this.PBKDF2(password, salt, 100000, 256, 'SHA-256');

        const encrypted = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv },
            key,
            plain_text
        );

        const hashedstring = toBase64([
            ...salt,
            ...iv,
            ...new Uint8Array(encrypted)
        ]);

        return hashedstring;
    },

    decrypt: async function(text, password) {
        const salt_len = iv_len = 16;

        const encrypted = fromBase64(text);

        const salt = encrypted.slice(0, salt_len);
        const iv = encrypted.slice(0 + salt_len, salt_len + iv_len);
        const key = await this.PBKDF2(password, salt, 100000, 256, 'SHA-256');

        const decrypted = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv },
            key,
            encrypted.slice(salt_len + iv_len)
        );

        return decoder.decode(decrypted);
    }


}