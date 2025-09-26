/**
 * Buffer view.
 */
export default class BufferView {
    /**
     * Creates buffer view around a buffer.
     * @param {Uint8Array<ArrayBuffer>} buffer Initial buffer view.
     */
    constructor(buffer: Uint8Array<ArrayBuffer>);
    /**
     * Underlying buffer view.
     * @type {Uint8Array<ArrayBuffer>}
     */
    buffer: Uint8Array<ArrayBuffer>;
    /**
     * Moves view right.
     * @param {number} size Amount of bytes to shift.
     */
    shiftRight(size: number): void;
    /**
     * Returns new limited view.
     * @param {number} size Length in bytes.
     * @returns {Uint8Array<ArrayBuffer>} View limited to specified size.
     */
    window(size: number): Uint8Array<ArrayBuffer>;
    /**
     * Shrinks view to specified size
     * @param {number} size New length in bytes.
     */
    shrink(size: number): void;
}
