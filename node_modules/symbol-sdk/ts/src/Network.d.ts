/**
 * Represents a network.
 * @template {{bytes: Uint8Array}} TAddress
 * @template {NetworkTimestamp} TNetworkTimestamp
 */
export class Network<TAddress extends {
    bytes: Uint8Array;
}, TNetworkTimestamp extends NetworkTimestamp> {
    /**
     * Creates a new network with the specified name and identifier byte.
     * @param {string} name Network name.
     * @param {number} identifier Network identifier byte.
     * @param {NetworkTimestampDatetimeConverter} datetimeConverter Network timestamp datetime converter associated with this network.
     * @param {Function} addressHasher Gets the primary hasher to use in the public key to address conversion.
     * @param {Function} createAddress Creates an encoded address from an address without checksum and checksum bytes.
     * @param {AddressConstructable} AddressClass Address class associated with this network.
     * @param {Constructable} NetworkTimestampClass Network timestamp class associated with this network.
     */
    constructor(name: string, identifier: number, datetimeConverter: NetworkTimestampDatetimeConverter, addressHasher: Function, createAddress: Function, AddressClass: AddressConstructable, NetworkTimestampClass: Constructable);
    /**
     * Network name.
     * @type {string}
     */
    name: string;
    /**
     * Network identifier byte.
     * @type {number}
     */
    identifier: number;
    /**
     * Network timestamp datetime converter associated with this network.
     * @type {NetworkTimestampDatetimeConverter}
     */
    datetimeConverter: NetworkTimestampDatetimeConverter;
    /**
     * @private
     */
    private _addressHasher;
    /**
     * @private
     */
    private _createAddress;
    /**
     * @private
     */
    private _AddressClass;
    /**
     * @private
     */
    private _NetworkTimestampClass;
    /**
     * Converts a public key to an address.
     * @param {PublicKey} publicKey Public key to convert.
     * @returns {TAddress} Address corresponding to the public key input.
     */
    publicKeyToAddress(publicKey: PublicKey): TAddress;
    /**
     * Checks if an address string is valid and belongs to this network.
     * @param {string} addressString Address to check.
     * @returns {boolean} \c true if address is valid and belongs to this network.
     */
    isValidAddressString(addressString: string): boolean;
    /**
     * Checks if an address is valid and belongs to this network.
     * @param {TAddress} address Address to check.
     * @returns {boolean} \c true if address is valid and belongs to this network.
     */
    isValidAddress(address: TAddress): boolean;
    /**
     * Converts a network timestamp to a datetime.
     * @param {TNetworkTimestamp} referenceNetworkTimestamp Reference network timestamp to convert.
     * @returns {Date} Datetime representation of the reference network timestamp.
     */
    toDatetime(referenceNetworkTimestamp: TNetworkTimestamp): Date;
    /**
     * Converts a datetime to a network timestamp.
     * @param {Date} referenceDatetime Reference datetime to convert.
     * @returns {TNetworkTimestamp} Network timestamp representation of the reference datetime.
     */
    fromDatetime(referenceDatetime: Date): TNetworkTimestamp;
    /**
     * Returns string representation of this object.
     * @returns {string} String representation of this object
     */
    toString(): string;
}
/**
 * Provides utility functions for finding a network.
 */
export class NetworkLocator {
    /**
     * Finds a network with a specified name within a list of networks.
     * @template {Network<any, any>} TNetwork
     * @param {Array<TNetwork>} networks List of networks to search.
     * @param {Array<string>|string} singleOrMultipleNames Names for which to search.
     * @returns {TNetwork} First network with a name in the supplied list.
     */
    static findByName<TNetwork extends Network<any, any>>(networks: Array<TNetwork>, singleOrMultipleNames: Array<string> | string): TNetwork;
    /**
     * Finds a network with a specified identifier within a list of networks.
     * @template {Network<any, any>} TNetwork
     * @param {Array<TNetwork>} networks List of networks to search.
     * @param {Array<number>|number} singleOrMultipleIdentifiers Identifiers for which to search.
     * @returns {TNetwork} First network with an identifier in the supplied list.
     */
    static findByIdentifier<TNetwork extends Network<any, any>>(networks: Array<TNetwork>, singleOrMultipleIdentifiers: Array<number> | number): TNetwork;
}
/**
 * Constructable class type.
 */
export type Constructable = new (...args: any[]) => object;
/**
 * Object exposing an `ENCODED_SIZE` property.
 */
export type EncodedSizeAccessor = {
    /**
     * Length of encoded address string.
     */
    ENCODED_SIZE: number;
};
/**
 * Address constructable class type.
 */
export type AddressConstructable = EncodedSizeAccessor & Constructable;
import { NetworkTimestamp } from './NetworkTimestamp.js';
import { NetworkTimestampDatetimeConverter } from './NetworkTimestamp.js';
import { PublicKey } from './CryptoTypes.js';
