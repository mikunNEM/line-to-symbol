/**
 * Generates a metadata key from a string.
 * @param {string} seed Metadata key seed.
 * @returns {bigint} Metadata key.
 */
export function metadataGenerateKey(seed: string): bigint;
/**
 * Creates a metadata payload for updating old value to new value.
 * @param {Uint8Array|undefined} oldValue Old metadata value.
 * @param {Uint8Array} newValue New metadata value.
 * @returns {Uint8Array} Metadata payload for updating old value to new value.
 */
export function metadataUpdateValue(oldValue: Uint8Array | undefined, newValue: Uint8Array): Uint8Array;
