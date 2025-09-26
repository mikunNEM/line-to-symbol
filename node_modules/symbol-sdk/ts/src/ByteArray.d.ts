/**
 * Represents a fixed size byte array.
 */
export default class ByteArray {
    /**
     * Byte array name (required because `constructor.name` is dropped during minification).
     * @type {string}
     */
    static NAME: string;
    /**
     * Creates a byte array.
     * @param {number} fixedSize Size of the array.
     * @param {Uint8Array|string} arrayInput Byte array or hex string.
     */
    constructor(fixedSize: number, arrayInput: Uint8Array | string);
    /**
     * Underlying bytes.
     * @type {Uint8Array<ArrayBuffer>}
     */
    bytes: Uint8Array<ArrayBuffer>;
    /**
     * Returns string representation of this object.
     * @returns {string} String representation of this object
     */
    toString(): string;
    /**
     * Returns representation of this object that can be stored in JSON.
     * @returns {string} JSON-safe representation of this object.
     */
    toJson(): string;
}
