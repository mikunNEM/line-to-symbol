/**
 * Generates symbol voting keys.
 */
export default class VotingKeysGenerator {
    /**
     * Creates a generator around a voting root key pair.
     * @param {KeyPair} rootKeyPair Voting root key pair.
     * @param {Function} privateKeyGenerator Private key generator.
     */
    constructor(rootKeyPair: KeyPair, privateKeyGenerator?: Function);
    /**
     * @private
     */
    private _rootKeyPair;
    /**
     * @private
     */
    private _privateKeyGenerator;
    /**
     * Generates voting keys for specified epochs.
     * @param {bigint} startEpoch Start epoch.
     * @param {bigint} endEpoch End epoch.
     * @returns {Uint8Array} Serialized voting keys.
     */
    generate(startEpoch: bigint, endEpoch: bigint): Uint8Array;
}
import { KeyPair } from './KeyPair.js';
