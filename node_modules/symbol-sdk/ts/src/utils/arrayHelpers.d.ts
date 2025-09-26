/**
 * Deeply compares two array elements.
 * @param {object} lhs Left object to compare.
 * @param {object} rhs Right object to compare.
 * @returns {number} 1 if lhs is greater than rhs; -1 if lhs is less than rhs; 0 if lhs and rhs are equal.
 */
export function deepCompare(lhs: object, rhs: object): number;
/**
 * Calculates aligned size.
 * @param {number} size Size.
 * @param {number} alignment Alignment.
 * @returns {number} Size rounded up to alignment.
 */
export function alignUp(size: number, alignment: number): number;
/**
 * Calculates size of variable size objects.
 * @param {Array<object>} elements Serializable elements.
 * @param {number} alignment Alignment used for calculations.
 * @param {boolean} skipLastElementPadding \c true if last element should not be aligned.
 * @returns {number} Computed size.
 */
export function size(elements: Array<object>, alignment?: number, skipLastElementPadding?: boolean): number;
/**
 * Reads array of objects.
 * @param {Uint8Array} bufferInput Buffer input.
 * @param {{deserialize: Function}} FactoryClass Factory used to deserialize objects.
 * @param {Function|undefined} accessor Optional accessor used to check objects order.
 * @returns {Array<object>} Array of deserialized objects.
 */
export function readArray(bufferInput: Uint8Array, FactoryClass: {
    deserialize: Function;
}, accessor?: Function | undefined): Array<object>;
/**
 * Reads array of deterministic number of objects.
 * @param {Uint8Array} bufferInput Buffer input.
 * @param {{deserialize: Function}} FactoryClass Factory used to deserialize objects.
 * @param {number} count Number of object to deserialize.
 * @param {Function|undefined} accessor Optional accessor used to check objects order.
 * @returns {Array<object>} Array of deserialized objects.
 */
export function readArrayCount(bufferInput: Uint8Array, FactoryClass: {
    deserialize: Function;
}, count: number, accessor?: Function | undefined): Array<object>;
/**
 * Reads array of variable size objects.
 * @param {Uint8Array<ArrayBuffer>} bufferInput Buffer input.
 * @param {{deserialize: Function}} FactoryClass Factory used to deserialize objects.
 * @param {number} alignment Alignment used to make sure each object is at boundary.
 * @param {boolean} skipLastElementPadding \c true if last element is not aligned/padded.
 * @returns {Array<object>} Array of deserialized objects.
 */
export function readVariableSizeElements(bufferInput: Uint8Array<ArrayBuffer>, FactoryClass: {
    deserialize: Function;
}, alignment: number, skipLastElementPadding?: boolean): Array<object>;
/**
 * Writes array of objects.
 * @param {{write: Function}} output Output sink.
 * @param {Array<object>} elements Serializable elements.
 * @param {Function|undefined} accessor Optional accessor used to check objects order.
 */
export function writeArray(output: {
    write: Function;
}, elements: Array<object>, accessor?: Function | undefined): void;
/**
 * Writes array of deterministic number of objects.
 * @param {{write: Function}} output Output sink.
 * @param {Array<object>} elements Serializable elements.
 * @param {number} count Number of objects to write.
 * @param {Function|undefined} accessor Optional accessor used to check objects order.
 */
export function writeArrayCount(output: {
    write: Function;
}, elements: Array<object>, count: number, accessor?: Function | undefined): void;
/**
 * Writes array of variable size objects.
 * @param {{write: Function}} output Output sink.
 * @param {Array<object>} elements Serializable elements.
 * @param {number} alignment Alignment used to make sure each object is at boundary.
 * @param {boolean} skipLastElementPadding \c true if last element should not be aligned/padded.
 */
export function writeVariableSizeElements(output: {
    write: Function;
}, elements: Array<object>, alignment: number, skipLastElementPadding?: boolean): void;
