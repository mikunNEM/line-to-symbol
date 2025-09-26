/**
 * Factory for creating NEM transactions.
 */
export default class TransactionFactory {
    /**
     * Looks up the friendly name for the specified transaction.
     * @param {nc.TransactionType} transactionType Transaction type.
     * @param {number} transactionVersion Transaction version.
     * @returns {string} Transaction friendly name.
     */
    static lookupTransactionName(transactionType: nc.TransactionType, transactionVersion: number): string;
    /**
     * Deserializes a transaction from a binary payload.
     * @param {Uint8Array} payload Binary payload.
     * @returns {nc.Transaction} Deserialized transaction.
     */
    static deserialize(payload: Uint8Array): nc.Transaction;
    /**
     * Converts a transaction to a non-verifiable transaction.
     * @param {nc.Transaction|nc.NonVerifiableTransaction} transaction Transaction object.
     * @returns {nc.NonVerifiableTransaction} Non-verifiable transaction object.
     */
    static toNonVerifiableTransaction(transaction: nc.Transaction | nc.NonVerifiableTransaction): nc.NonVerifiableTransaction;
    /**
     * Attaches a signature to a transaction.
     * @param {nc.Transaction} transaction Transaction object.
     * @param {Signature} signature Signature to attach.
     * @returns {string} JSON transaction payload.
     */
    static attachSignature(transaction: nc.Transaction, signature: Signature): string;
    /**
     * Tries to coerce a sdk type to a model type.
     * @param {object} value Value to convert.
     * @returns {nc.Address|undefined} Converted value or undefined.
     * @private
     */
    private static _nemTypeConverter;
    /**
     * Builds a rule based transaction factory.
     * @param {Map<string, Function>|undefined} typeRuleOverrides Type rule overrides.
     * @returns {RuleBasedTransactionFactory} Rule based transaction factory.
     * @private
     */
    private static _buildRules;
    /**
     * Creates a factory for the specified network.
     * @param {Network} network NEM network.
     * @param {Map<string, Function>|undefined} typeRuleOverrides Type rule overrides.
     */
    constructor(network: Network, typeRuleOverrides?: Map<string, Function> | undefined);
    /**
     * @private
     */
    private _factory;
    /**
     * @private
     */
    private _network;
    /**
     * Gets class type.
     * @returns {typeof TransactionFactory} Class type.
     */
    get static(): typeof TransactionFactory;
    /**
     * Gets rule names with registered hints.
     * @returns {Array<string>} Rule names with registered hints.
     */
    get ruleNames(): Array<string>;
    /**
     * Creates a transaction from a transaction descriptor.
     * @param {object} transactionDescriptor Transaction descriptor.
     * @param {boolean} autosort When set (default), descriptor arrays requiring ordering will be automatically sorted.
     *                           When unset, descriptor arrays will be presumed to be already sorted.
     * @returns {nc.Transaction} Newly created transaction.
     */
    create(transactionDescriptor: object, autosort?: boolean): nc.Transaction;
}
import * as nc from './models.js';
import { Signature } from '../CryptoTypes.js';
import { Network } from './Network.js';
