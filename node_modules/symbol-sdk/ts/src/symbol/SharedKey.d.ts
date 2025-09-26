/**
 * Derives shared key from key pair and other party's public key.
 * @param {KeyPair} keyPair Key pair.
 * @param {PublicKey} otherPublicKey Other party's public key.
 * @returns {SharedKey256} Shared encryption key.
 */
export function deriveSharedKey(keyPair: KeyPair, otherPublicKey: PublicKey): SharedKey256;
import { KeyPair } from './KeyPair.js';
import { PublicKey } from '../CryptoTypes.js';
import { SharedKey256 } from '../CryptoTypes.js';
