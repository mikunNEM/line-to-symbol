/**
 * Represents a NEM network timestamp with second resolution.
 */
export class NetworkTimestamp extends BasicNetworkTimestamp {
    /**
     * Adds a specified number of seconds to this timestamp.
     * @override
     * @param {number} count Number of seconds to add.
     * @returns {NetworkTimestamp} New timestamp that is the specified number of seconds past this timestamp.
     */
    override addSeconds(count: number): NetworkTimestamp;
}
/**
 * Represents a NEM address.
 */
export class Address extends ByteArray {
    /**
     * Byte size of raw address.
     * @type {number}
     */
    static SIZE: number;
    /**
     * Length of encoded address string.
     * @type {number}
     */
    static ENCODED_SIZE: number;
    /**
     * Creates a NEM address.
     * @param {Uint8Array|string|Address} addressInput Input string, byte array or address.
     */
    constructor(addressInput: Uint8Array | string | Address);
}
/**
 * Represents a NEM network.
 */
export class Network extends BasicNetwork<any, any> {
    /**
     * NEM main network.
     * @type {Network}
     */
    static MAINNET: Network;
    /**
     * NEM test network.
     * @type {Network}
     */
    static TESTNET: Network;
    /**
     * NEM well known networks.
     * @type {Array<Network>}
     */
    static NETWORKS: Array<Network>;
    /**
     * Creates a new network with the specified name, identifier byte and generation hash seed.
     * @param {string} name Network name.
     * @param {number} identifier Network identifier byte.
     * @param {Date} epochTime Network epoch time.
     */
    constructor(name: string, identifier: number, epochTime: Date);
}
import { NetworkTimestamp as BasicNetworkTimestamp } from '../NetworkTimestamp.js';
import ByteArray from '../ByteArray.js';
import { Network as BasicNetwork } from '../Network.js';
