/**
 * Symbol public account.
 */
export class SymbolPublicAccount {
    /**
     * Creates a Symbol public account.
     * @param {SymbolFacade} facade Symbol facade.
     * @param {PublicKey} publicKey Account public key.
     */
    constructor(facade: SymbolFacade, publicKey: PublicKey);
    /**
     * @protected
     */
    protected _facade: SymbolFacade;
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
 * Symbol account.
 */
export class SymbolAccount extends SymbolPublicAccount {
    /**
     * Creates a Symbol account.
     * @param {SymbolFacade} facade Symbol facade.
     * @param {KeyPair} keyPair Account key pair.
     */
    constructor(facade: SymbolFacade, keyPair: KeyPair);
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
     * Signs a Symbol transaction.
     * @param {sc.Transaction} transaction Transaction object.
     * @returns {Signature} Transaction signature.
     */
    signTransaction(transaction: sc.Transaction): Signature;
    /**
     * Cosigns a Symbol transaction.
     * @param {sc.Transaction} transaction Transaction object.
     * @param {boolean} detached \c true if resulting cosignature is appropriate for network propagation.
     *                           \c false if resulting cosignature is appropriate for attaching to an aggregate.
     * @returns {sc.Cosignature|sc.DetachedCosignature} Signed cosignature.
     */
    cosignTransaction(transaction: sc.Transaction, detached?: boolean): sc.Cosignature | sc.DetachedCosignature;
    /**
     * Cosigns a Symbol transaction hash.
     * @param {Hash256} transactionHash Transaction hash.
     * @param {boolean} detached \c true if resulting cosignature is appropriate for network propagation.
     *                           \c false if resulting cosignature is appropriate for attaching to an aggregate.
     * @returns {sc.Cosignature|sc.DetachedCosignature} Signed cosignature.
     */
    cosignTransactionHash(transactionHash: Hash256, detached?: boolean): sc.Cosignature | sc.DetachedCosignature;
}
/**
 * Facade used to interact with Symbol blockchain.
 */
export class SymbolFacade {
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
     * Cosigns a Symbol transaction hash.
     * @param {KeyPair} keyPair Key pair of the cosignatory.
     * @param {Hash256} transactionHash Transaction hash.
     * @param {boolean} detached \c true if resulting cosignature is appropriate for network propagation.
     *                           \c false if resulting cosignature is appropriate for attaching to an aggregate.
     * @returns {sc.Cosignature|sc.DetachedCosignature} Signed cosignature.
     */
    static cosignTransactionHash(keyPair: KeyPair, transactionHash: Hash256, detached?: boolean): sc.Cosignature | sc.DetachedCosignature;
    /**
     * Hashes embedded transactions of an aggregate transaction.
     * @param {Array<sc.EmbeddedTransaction>} embeddedTransactions Embedded transactions to hash.
     * @returns {Hash256} Aggregate transactions hash.
     */
    static hashEmbeddedTransactions(embeddedTransactions: Array<sc.EmbeddedTransaction>): Hash256;
    /**
     * Derives a Symbol KeyPair from a BIP32 node.
     * @param {Bip32Node} bip32Node BIP32 node.
     * @returns {KeyPair} Derived key pair.
     */
    static bip32NodeToKeyPair(bip32Node: Bip32Node): KeyPair;
    /**
     * Creates a Symbol facade.
     * @param {string|Network} network Symbol network or network name.
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
     * @returns {typeof SymbolFacade} Class type.
     */
    get static(): typeof SymbolFacade;
    /**
     * Creates a network timestamp representing the current time.
     * @returns {NetworkTimestamp} Network timestamp representing the current time.
     */
    now(): NetworkTimestamp;
    /**
     * Creates a Symbol public account from a public key.
     * @param {PublicKey} publicKey Account public key.
     * @returns {SymbolPublicAccount} Symbol public account.
     */
    createPublicAccount(publicKey: PublicKey): SymbolPublicAccount;
    /**
     * Creates a Symbol account from a private key.
     * @param {PrivateKey} privateKey Account private key.
     * @returns {SymbolAccount} Symbol account.
     */
    createAccount(privateKey: PrivateKey): SymbolAccount;
    /**
     * Creates a transaction from a (typed) transaction descriptor.
     * @param {object} typedDescriptor Transaction (typed) descriptor.
     * @param {PublicKey} signerPublicKey Signer public key.
     * @param {number} feeMultiplier Fee multiplier.
     * @param {number} deadlineSeconds Approximate seconds from now for deadline.
     * @param {number} cosignatureCount Number of cosignature spaces to reserve.
     * @returns {sc.Transaction} Created transaction.
     */
    createTransactionFromTypedDescriptor(typedDescriptor: object, signerPublicKey: PublicKey, feeMultiplier: number, deadlineSeconds: number, cosignatureCount?: number): sc.Transaction;
    /**
     * Creates an embedded transaction from a (typed) transaction descriptor.
     * @param {object} typedDescriptor Transaction (typed) descriptor.
     * @param {PublicKey} signerPublicKey Signer public key.
     * @returns {sc.EmbeddedTransaction} Created embedded transaction.
     */
    createEmbeddedTransactionFromTypedDescriptor(typedDescriptor: object, signerPublicKey: PublicKey): sc.EmbeddedTransaction;
    /**
     * Hashes a Symbol transaction.
     * @param {sc.Transaction} transaction Transaction object.
     * @returns {Hash256} Transaction hash.
     */
    hashTransaction(transaction: sc.Transaction): Hash256;
    /**
     * Gets the payload to sign given a Symbol transaction.
     * @param {sc.Transaction} transaction Transaction object.
     * @returns {Uint8Array} Verifiable data to sign.
     */
    extractSigningPayload(transaction: sc.Transaction): Uint8Array;
    /**
     * Signs a Symbol transaction.
     * @param {KeyPair} keyPair Key pair.
     * @param {sc.Transaction} transaction Transaction object.
     * @returns {Signature} Transaction signature.
     */
    signTransaction(keyPair: KeyPair, transaction: sc.Transaction): Signature;
    /**
     * Verifies a Symbol transaction.
     * @param {sc.Transaction} transaction Transaction object.
     * @param {Signature} signature Signature to verify.
     * @returns {boolean} \c true if transaction signature is verified.
     */
    verifyTransaction(transaction: sc.Transaction, signature: Signature): boolean;
    /**
     * Cosigns a Symbol transaction.
     * @param {KeyPair} keyPair Key pair of the cosignatory.
     * @param {sc.Transaction} transaction Transaction object.
     * @param {boolean} detached \c true if resulting cosignature is appropriate for network propagation.
     *                           \c false if resulting cosignature is appropriate for attaching to an aggregate.
     * @returns {sc.Cosignature|sc.DetachedCosignature} Signed cosignature.
     */
    cosignTransaction(keyPair: KeyPair, transaction: sc.Transaction, detached?: boolean): sc.Cosignature | sc.DetachedCosignature;
    /**
     * Creates a network compatible BIP32 path for the specified account.
     * @param {number} accountId Id of the account for which to generate a BIP32 path.
     * @returns {Array<number>} BIP32 path for the specified account.
     */
    bip32Path(accountId: number): Array<number>;
}
import { PublicKey } from '../CryptoTypes.js';
import { Address } from '../symbol/Network.js';
import { KeyPair } from '../symbol/KeyPair.js';
import MessageEncoder from '../symbol/MessageEncoder.js';
import * as sc from '../symbol/models.js';
import { Signature } from '../CryptoTypes.js';
import { Hash256 } from '../CryptoTypes.js';
import { Network } from '../symbol/Network.js';
import TransactionFactory from '../symbol/TransactionFactory.js';
import { NetworkTimestamp } from '../symbol/Network.js';
import { PrivateKey } from '../CryptoTypes.js';
import { Verifier } from '../symbol/KeyPair.js';
import { SharedKey256 } from '../CryptoTypes.js';
import { Bip32Node } from '../Bip32.js';
