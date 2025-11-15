/**
 * Represents a base integer.
 */
export default class BaseValue {
    /**
     * Creates a base value.
     * @param {number} size Size of the integer.
     * @param {number|bigint} value Value.
     * @param {boolean} isSigned \c true if the value should be treated as signed.
     */
    constructor(size: number, value: number | bigint, isSigned?: boolean);
    /**
     * Size of the integer.
     * @type {number}
     */
    size: number;
    /**
     * \c true if the value should be treated as signed.
     * @type {boolean}
     */
    isSigned: boolean;
    /**
     * Value.
     * @type {number|bigint}
     */
    value: number | bigint;
    /**
     * Converts base value to string.
     * @returns {string} String representation.
     */
    toString(): string;
    /**
     * Returns representation of this object that can be stored in JSON.
     * @returns {string|number} JSON-safe representation of this object.
     */
    toJson(): string | number;
}
