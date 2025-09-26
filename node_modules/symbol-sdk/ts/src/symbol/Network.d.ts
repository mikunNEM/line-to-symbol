/**
 * Represents a Symbol network timestamp with millisecond resolution.
 */
export class NetworkTimestamp extends BasicNetworkTimestamp {
    /**
     * Adds a specified number of milliseconds to this timestamp.
     * @param {number|bigint} count Number of milliseconds to add.
     * @returns {NetworkTimestamp} New timestamp that is the specified number of milliseconds past this timestamp.
     */
    addMilliseconds(count: number | bigint): NetworkTimestamp;
    /**
     * Adds a specified number of seconds to this timestamp.
     * @override
     * @param {number|bigint} count Number of seconds to add.
     * @returns {NetworkTimestamp} New timestamp that is the specified number of seconds past this timestamp.
     */
    override addSeconds(count: number | bigint): NetworkTimestamp;
}
/**
 * Represents a Symbol address.
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
     * Creates an address from a decoded address hex string (typically from REST).
     * @param {string} hexString Decoded address hex string.
     * @returns {Address} Equivalent address.
     */
    static fromDecodedAddressHexString(hexString: string): Address;
    /**
     * Creates an address from a namespace id.
     * @param {NamespaceId} namespaceId Namespace id.
     * @param {number} networkIdentifier Network identifier byte.
     * @returns {Address} Address referencing namespace id.
     */
    static fromNamespaceId(namespaceId: NamespaceId, networkIdentifier: number): Address;
    /**
     * Creates a Symbol address.
     * @param {Uint8Array|string|Address} addressInput Input string, byte array or address.
     */
    constructor(addressInput: Uint8Array | string | Address);
    /**
     * Attempts to convert this address into a namespace id.
     * @returns {NamespaceId|undefined} Namespace id if this adresss is an alias, undefined otherwise.
     */
    toNamespaceId(): NamespaceId | undefined;
}
/**
 * Represents a Symbol network.
 */
export class Network extends BasicNetwork<any, any> {
    /**
     * Symbol main network.
     * @type {Network}
     */
    static MAINNET: Network;
    /**
     * Symbol test network.
     * @type {Network}
     */
    static TESTNET: Network;
    /**
     * Symbol well known networks.
     * @type {Array<Network>}
     */
    static NETWORKS: Array<Network>;
    /**
     * Creates a new network with the specified name, identifier byte and generation hash seed.
     * @param {string} name Network name.
     * @param {number} identifier Network identifier byte.
     * @param {Date} epochTime Network epoch time.
     * @param {Hash256} generationHashSeed Network generation hash seed.
     */
    constructor(name: string, identifier: number, epochTime: Date, generationHashSeed: Hash256);
    /**
     * Network generation hash seed.
     * @type {Hash256}
     */
    generationHashSeed: Hash256;
}
import { NetworkTimestamp as BasicNetworkTimestamp } from '../NetworkTimestamp.js';
import ByteArray from '../ByteArray.js';
import { NamespaceId } from './models.js';
import { Network as BasicNetwork } from '../Network.js';
import { Hash256 } from '../CryptoTypes.js';
