/**
 * Represents an ED25519 private and public key.
 */
export class KeyPair {
    /**
     * Creates a key pair from a private key.
     * @param {PrivateKey} privateKey Private key.
     */
    constructor(privateKey: PrivateKey);
    /**
     * @private
     */
    private _privateKey;
    /**
     * @private
     */
    private _keyPair;
    /**
     * Gets the public key.
     * @returns {PublicKey} Public key.
     */
    get publicKey(): PublicKey;
    /**
     * Gets the private key.
     * @returns {PrivateKey} Private key.
     */
    get privateKey(): PrivateKey;
    /**
     * Signs a message with the private key.
     * @param {Uint8Array} message Message to sign.
     * @returns {Signature} Message signature.
     */
    sign(message: Uint8Array): Signature;
}
/**
 * Verifies signatures signed by a single key pair.
 */
export class Verifier {
    /**
     * Creates a verifier from a public key.
     * @param {PublicKey} publicKey Public key.
     */
    constructor(publicKey: PublicKey);
    /**
     * Public key used for signature verification.
     * @type {PublicKey}
     */
    publicKey: PublicKey;
    /**
     * Verifies a message signature.
     * @param {Uint8Array} message Message to verify.
     * @param {Signature} signature Signature to verify.
     * @returns {boolean} true if the message signature verifies.
     */
    verify(message: Uint8Array, signature: Signature): boolean;
}
import { PublicKey } from '../CryptoTypes.js';
import { PrivateKey } from '../CryptoTypes.js';
import { Signature } from '../CryptoTypes.js';
