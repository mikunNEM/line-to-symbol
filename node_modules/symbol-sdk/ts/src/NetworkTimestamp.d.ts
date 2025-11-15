/**
 * Represents a network timestamp.
 */
export class NetworkTimestamp {
    /**
     * Creates a timestamp.
     * @param {number|bigint} timestamp Raw network timestamp.
     */
    constructor(timestamp: number | bigint);
    /**
     * Underlying timestamp.
     * @type {bigint}
     */
    timestamp: bigint;
    /**
     * Determines if this is the epochal timestamp.
     * @returns {boolean} \c true if this is the epochal timestamp.
     */
    get isEpochal(): boolean;
    /**
     * Adds a specified number of seconds to this timestamp.
     * @abstract
     * @param {number|bigint} count Number of seconds to add.
     * @returns {NetworkTimestamp} New timestamp that is the specified number of seconds past this timestamp.
     */
    addSeconds(count: number | bigint): NetworkTimestamp;
    /**
     * Adds a specified number of minutes to this timestamp.
     * @param {number|bigint} count Number of minutes to add.
     * @returns {NetworkTimestamp} New timestamp that is the specified number of minutes past this timestamp.
     */
    addMinutes(count: number | bigint): NetworkTimestamp;
    /**
     * Adds a specified number of hours to this timestamp.
     * @param {number|bigint} count Number of hours to add.
     * @returns {NetworkTimestamp} New timestamp that is the specified number of hours past this timestamp.
     */
    addHours(count: number | bigint): NetworkTimestamp;
    /**
     * Returns string representation of this object.
     * @returns {string} String representation of this object
     */
    toString(): string;
}
/**
 * Provides utilities for converting between network timestamps and datetimes.
 */
export class NetworkTimestampDatetimeConverter {
    /**
     * Creates a converter given an epoch and base time units.
     * @param {Date} epoch Date at which network started.
     * @param {string} timeUnits Time unit the network uses for progressing.
     */
    constructor(epoch: Date, timeUnits: string);
    /**
     * Date at which network started
     * @type {Date}
     */
    epoch: Date;
    /**
     * Number of milliseconds per time unit.
     * @type {number}
     */
    timeUnits: number;
    /**
     * Converts a network timestamp to a datetime.
     * @param {number} rawTimestamp Raw network timestamp.
     * @returns {Date} Date representation of the network timestamp.
     */
    toDatetime(rawTimestamp: number): Date;
    /**
     * Subtracts the network epoch from the reference date.
     * @param {Date} referenceDatetime Reference date.
     * @returns {number} Number of network time units between the reference date and the network epoch.
     */
    toDifference(referenceDatetime: Date): number;
}
