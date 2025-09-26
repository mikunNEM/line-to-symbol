/**
 * Hashes payload with keccak 256 and then hashes the result with ripemd160.
 * @param {Uint8Array} payload Input buffer to hash.
 * @returns {Uint8Array} Hash result.
 */
export function ripemdKeccak256(payload: Uint8Array): Uint8Array;
