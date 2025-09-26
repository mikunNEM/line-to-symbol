/**
 * Derives shared key from key pair and other party's public key.
 * @param {KeyPair} keyPair Key pair.
 * @param {PublicKey} otherPublicKey Other party's public key.
 * @returns {SharedKey256} Shared encryption key.
 */
export function deriveSharedKey(keyPair: KeyPair, otherPublicKey: PublicKey): SharedKey256;
/**
 * Derives shared key from key pair, other party's public key and salt
 * @deprecated This is _old_ method of deriving shared key and should not be used in new applications.
 * @param {KeyPair} keyPair Key pair.
 * @param {PublicKey} otherPublicKey Other party's public key.
 * @param {Uint8Array} salt Random salt. Should be unique per every use.
 * @returns {SharedKey256} Shared encryption key.
 */
export function deriveSharedKeyDeprecated(keyPair: KeyPair, otherPublicKey: PublicKey, salt: Uint8Array): SharedKey256;
import { KeyPair } from './KeyPair.js';
import { PublicKey } from '../CryptoTypes.js';
import { SharedKey256 } from '../CryptoTypes.js';
