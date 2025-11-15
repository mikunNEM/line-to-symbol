/**
 * Encrypts and encodes messages between two parties.
 */
export default class MessageEncoder {
    /**
     * Creates message encoder around key pair.
     * @param {KeyPair} keyPair Key pair.
     */
    constructor(keyPair: KeyPair);
    /**
     * @private
     */
    private _keyPair;
    /**
     * Public key used for message encoding.
     * @returns {PublicKey} Public key used for message encoding.
     */
    get publicKey(): PublicKey;
    /**
     * Tries to decode encoded message.
     * @param {PublicKey} recipientPublicKey Recipient's public key.
     * @param {Uint8Array} encodedMessage Encoded message.
     * @returns {TryDecodeResult} Tuple containing decoded status and message.
     */
    tryDecode(recipientPublicKey: PublicKey, encodedMessage: Uint8Array): TryDecodeResult;
    /**
     * Encodes message to recipient using recommended format.
     * @param {PublicKey} recipientPublicKey Recipient public key.
     * @param {Uint8Array} message Message to encode.
     * @returns {Uint8Array} Encrypted and encoded message.
     */
    encode(recipientPublicKey: PublicKey, message: Uint8Array): Uint8Array;
    /**
     * Encodes persistent harvesting delegation to node.
     * @param {PublicKey} nodePublicKey Node public key.
     * @param {KeyPair} remoteKeyPair Remote key pair.
     * @param {KeyPair} vrfKeyPair Vrf key pair.
     * @returns {Uint8Array} Encrypted and encoded harvesting delegation request.
     */
    encodePersistentHarvestingDelegation(nodePublicKey: PublicKey, remoteKeyPair: KeyPair, vrfKeyPair: KeyPair): Uint8Array;
    /**
     * Tries to decode encoded message.
     * @deprecated This function is only provided for compatability with the original Symbol wallets.
     *             Please use `tryDecode` in any new code.
     * @param {PublicKey} recipientPublicKey Recipient's public key.
     * @param {Uint8Array} encodedMessage Encoded message
     * @returns {TryDecodeResult} Tuple containing decoded status and message.
     */
    tryDecodeDeprecated(recipientPublicKey: PublicKey, encodedMessage: Uint8Array): TryDecodeResult;
    /**
     * Encodes message to recipient using (deprecated) wallet format.
     * @deprecated This function is only provided for compatability with the original Symbol wallets.
     *             Please use `encode` in any new code.
     * @param {PublicKey} recipientPublicKey Recipient public key.
     * @param {Uint8Array} message Message to encode.
     * @returns {Uint8Array} Encrypted and encoded message.
     */
    encodeDeprecated(recipientPublicKey: PublicKey, message: Uint8Array): Uint8Array;
}
/**
 * Result of a try decode operation.
 */
export type TryDecodeResult = {
    /**
     * \c true if message has been decoded and decrypted; \c false otherwise.
     */
    isDecoded: boolean;
    /**
     * Decoded message when `isDecoded` is \c true; encoded message otherwise.
     */
    message: Uint8Array;
};
import { PublicKey } from '../CryptoTypes.js';
import { KeyPair } from './KeyPair.js';
