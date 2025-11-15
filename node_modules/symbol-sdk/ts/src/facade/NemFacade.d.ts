/**
 * NEM public account.
 */
export class NemPublicAccount {
    /**
     * Creates a NEM public account.
     * @param {NemFacade} facade NEM facade.
     * @param {PublicKey} publicKey Account public key.
     */
    constructor(facade: NemFacade, publicKey: PublicKey);
    /**
     * @protected
     */
    protected _facade: NemFacade;
    /**
     * Account public key.
     * @type {PublicKey}
     */
    publicKey: PublicKey;
    /**
     * Account address.
     * @type {Address}
     */
    address: Address;
}
/**
 * NEM account.
 */
export class NemAccount extends NemPublicAccount {
    /**
     * Creates a NEM account.
     * @param {NemFacade} facade NEM facade.
     * @param {KeyPair} keyPair Account key pair.
     */
    constructor(facade: NemFacade, keyPair: KeyPair);
    /**
     * Account key pair.
     * @type {KeyPair}
     */
    keyPair: KeyPair;
    /**
     * Creates a message encoder that can be used for encrypting and encoding messages between two parties.
     * @returns {MessageEncoder} Message encoder using this account as one party.
     */
    messageEncoder(): MessageEncoder;
    /**
     * Signs a NEM transaction.
     * @param {nc.Transaction} transaction Transaction object.
     * @returns {Signature} Transaction signature.
     */
    signTransaction(transaction: nc.Transaction): Signature;
}
/**
 * Facade used to interact with NEM blockchain.
 */
export class NemFacade {
    /**
     * BIP32 curve name.
     * @type {string}
     */
    static BIP32_CURVE_NAME: string;
    /**
     * Network address class type.
     * @type {typeof Address}
     */
    static Address: typeof Address;
    /**
     * Network key pair class type.
     * @type {typeof KeyPair}
     */
    static KeyPair: typeof KeyPair;
    /**
     * Network verifier class type.
     * @type {typeof Verifier}
     */
    static Verifier: typeof Verifier;
    /**
     * Derives shared key from key pair and other party's public key.
     * @param {KeyPair} keyPair Key pair.
     * @param {PublicKey} otherPublicKey Other party's public key.
     * @returns {SharedKey256} Shared encryption key.
     */
    static deriveSharedKey: (keyPair: KeyPair, otherPublicKey: PublicKey) => SharedKey256;
    /**
     * Derives a NEM KeyPair from a BIP32 node.
     * @param {Bip32Node} bip32Node BIP32 node.
     * @returns {KeyPair} Derived key pair.
     */
    static bip32NodeToKeyPair(bip32Node: Bip32Node): KeyPair;
    /**
     * Creates a NEM facade.
     * @param {string|Network} network NEM network or network name.
     */
    constructor(network: string | Network);
    /**
     * Underlying network.
     * @type {Network}
     */
    network: Network;
    /**
     * Underlying transaction factory.
     * @type {TransactionFactory}
     */
    transactionFactory: TransactionFactory;
    /**
     * Gets class type.
     * @returns {typeof NemFacade} Class type.
     */
    get static(): typeof NemFacade;
    /**
     * Creates a network timestamp representing the current time.
     * @returns {NetworkTimestamp} Network timestamp representing the current time.
     */
    now(): NetworkTimestamp;
    /**
     * Creates a NEM public account from a public key.
     * @param {PublicKey} publicKey Account public key.
     * @returns {NemPublicAccount} NEM public account.
     */
    createPublicAccount(publicKey: PublicKey): NemPublicAccount;
    /**
     * Creates a NEM account from a private key.
     * @param {PrivateKey} privateKey Account private key.
     * @returns {NemAccount} NEM account.
     */
    createAccount(privateKey: PrivateKey): NemAccount;
    /**
     * Creates a transaction from a (typed) transaction descriptor.
     * @param {object} typedDescriptor Transaction (typed) descriptor.
     * @param {PublicKey} signerPublicKey Signer public key.
     * @param {bigint} fee Transaction fee.
     * @param {number} deadlineSeconds Approximate seconds from now for deadline.
     * @returns {nc.Transaction} Created transaction.
     */
    createTransactionFromTypedDescriptor(typedDescriptor: object, signerPublicKey: PublicKey, fee: bigint, deadlineSeconds: number): nc.Transaction;
    /**
     * Hashes a NEM transaction.
     * @param {nc.Transaction} transaction Transaction object.
     * @returns {Hash256} Transaction hash.
     */
    hashTransaction(transaction: nc.Transaction): Hash256;
    /**
     * Gets the payload to sign given a NEM transaction.
     * @param {nc.Transaction} transaction Transaction object.
     * @returns {Uint8Array} Verifiable data to sign.
     */
    extractSigningPayload(transaction: nc.Transaction): Uint8Array;
    /**
     * Signs a NEM transaction.
     * @param {KeyPair} keyPair Key pair.
     * @param {nc.Transaction} transaction Transaction object.
     * @returns {Signature} Transaction signature.
     */
    signTransaction(keyPair: KeyPair, transaction: nc.Transaction): Signature;
    /**
     * Verifies a NEM transaction.
     * @param {nc.Transaction} transaction Transaction object.
     * @param {Signature} signature Signature to verify.
     * @returns {boolean} \c true if transaction signature is verified.
     */
    verifyTransaction(transaction: nc.Transaction, signature: Signature): boolean;
    /**
     * Creates a network compatible BIP32 path for the specified account.
     * @param {number} accountId Id of the account for which to generate a BIP32 path.
     * @returns {Array<number>} BIP32 path for the specified account.
     */
    bip32Path(accountId: number): Array<number>;
}
import { PublicKey } from '../CryptoTypes.js';
import { Address } from '../nem/Network.js';
import { KeyPair } from '../nem/KeyPair.js';
import MessageEncoder from '../nem/MessageEncoder.js';
import * as nc from '../nem/models.js';
import { Signature } from '../CryptoTypes.js';
import { Network } from '../nem/Network.js';
import TransactionFactory from '../nem/TransactionFactory.js';
import { NetworkTimestamp } from '../nem/Network.js';
import { PrivateKey } from '../CryptoTypes.js';
import { Hash256 } from '../CryptoTypes.js';
import { Verifier } from '../nem/KeyPair.js';
import { SharedKey256 } from '../CryptoTypes.js';
import { Bip32Node } from '../Bip32.js';
