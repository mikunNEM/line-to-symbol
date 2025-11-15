declare namespace _default {
    export { encode };
    export { decode };
}
export default _default;
/**
 * Base32 encodes a binary buffer.
 * @param {Uint8Array} data Binary data to encode.
 * @returns {string} Base32 encoded string corresponding to the input data.
 */
declare function encode(data: Uint8Array): string;
/**
 * Base32 decodes a base32 encoded string.
 * @param {string} encoded Base32 encoded string to decode.
 * @returns {Uint8Array} Binary data corresponding to the input string.
 */
declare function decode(encoded: string): Uint8Array;
