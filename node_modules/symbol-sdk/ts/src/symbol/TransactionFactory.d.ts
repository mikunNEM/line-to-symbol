/**
 * Factory for creating Symbol transactions.
 */
export default class TransactionFactory {
    /**
     * Looks up the friendly name for the specified transaction.
     * @param {sc.TransactionType} transactionType Transaction type.
     * @param {number} transactionVersion Transaction version.
     * @returns {string} Transaction friendly name.
     */
    static lookupTransactionName(transactionType: sc.TransactionType, transactionVersion: number): string;
    /**
     * Deserializes a transaction from a binary payload.
     * @param {Uint8Array} payload Binary payload.
     * @returns {sc.Transaction} Deserialized transaction.
     */
    static deserialize(payload: Uint8Array): sc.Transaction;
    /**
     * Deserializes an embedded transaction from a binary payload.
     * @param {Uint8Array} payload Binary payload.
     * @returns {sc.EmbeddedTransaction} Deserialized embedded transaction.
     */
    static deserializeEmbedded(payload: Uint8Array): sc.EmbeddedTransaction;
    /**
     * Attaches a signature to a transaction.
     * @param {sc.Transaction} transaction Transaction object.
     * @param {Signature} signature Signature to attach.
     * @returns {string} JSON transaction payload.
     */
    static attachSignature(transaction: sc.Transaction, signature: Signature): string;
    /**
     * Tries to coerce an sdk type to a model type.
     * @param {object} value Value to convert.
     * @returns {sc.Address|undefined} Converted value or undefined.
     * @private
     */
    private static _symbolTypeConverter;
    /**
     * Builds a rule based transaction factory.
     * @param {Map<string, Function>|undefined} typeRuleOverrides Type rule overrides.
     * @returns {RuleBasedTransactionFactory} Rule based transaction factory.
     * @private
     */
    private static _buildRules;
    /**
     * Creates a factory for the specified network.
     * @param {Network} network Symbol network.
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
     * @template TTransaction
     * @param {object} transactionDescriptor Transaction descriptor.
     * @param {boolean} autosort When set (default), descriptor arrays requiring ordering will be automatically sorted.
     *                           When unset, descriptor arrays will be presumed to be already sorted.
     * @param {{createByName: Function}} FactoryClass Factory class used to create the transaction.
     * @returns {TTransaction} Newly created transaction.
     * @private
     */
    private _createAndExtend;
    /**
     * Creates a transaction from a transaction descriptor.
     * @param {object} transactionDescriptor Transaction descriptor.
     * @param {boolean} autosort When set (default), descriptor arrays requiring ordering will be automatically sorted.
     *                           When unset, descriptor arrays will be presumed to be already sorted.
     * @returns {sc.Transaction} Newly created transaction.
     */
    create(transactionDescriptor: object, autosort?: boolean): sc.Transaction;
    /**
     * Creates an embedded transaction from a transaction descriptor.
     * @param {object} transactionDescriptor Transaction descriptor.
     * @param {boolean} autosort When set (default), descriptor arrays requiring ordering will be automatically sorted.
     *                           When unset, descriptor arrays will be presumed to be already sorted.
     * @returns {sc.EmbeddedTransaction} Newly created transaction.
     */
    createEmbedded(transactionDescriptor: object, autosort?: boolean): sc.EmbeddedTransaction;
}
import * as sc from './models.js';
import { Signature } from '../CryptoTypes.js';
import { Network } from './Network.js';
