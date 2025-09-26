/**
 * Processes and looks up transaction descriptor properties.
 * This class is not intended to be used directly.
 */
export default class TransactionDescriptorProcessor {
    /**
     * Creates a transaction descriptor processor.
     * @param {object} transactionDescriptor Transaction descriptor.
     * @param {Map<string, Function>} typeParsingRules Type-dependent parsing rules.
     * @param {Function|undefined} typeConverter Converts a generated type to an sdk type (optional).
     */
    constructor(transactionDescriptor: object, typeParsingRules: Map<string, Function>, typeConverter?: Function | undefined);
    /**
     * @private
     */
    private _transactionDescriptor;
    /**
     * @private
     */
    private _typeParsingRules;
    /**
     * Tries to coerce a value to a more appropriate type.
     * @param {object} value Original value.
     * @returns {object} Type converted value.
     * @private
     */
    private _typeConverter;
    /**
     * @private
     */
    private _typeHints;
    /**
     * Looks up value and applies type hints.
     * @param {string} key Key for which to retrieve value.
     * @returns {object} Value corresponding to key.
     * @private
     */
    private _lookupValueAndApplyTypeHints;
    /**
     * Looks up the value for key.
     * @param {string} key Key for which to retrieve value.
     * @returns {object} Value corresponding to key.
     */
    lookupValue(key: string): object;
    /**
     * Copies all descriptor information to a transaction.
     * @param {object} transaction Transaction to which to copy keys.
     * @param {Array<string>|undefined} ignoreKeys Keys of descriptor values not to copy (optional).
     */
    copyTo(transaction: object, ignoreKeys?: Array<string> | undefined): void;
    /**
     * Sets type hints.
     * @param {TypeHintsMap|undefined} typeHints New type hints. // eslint-disable-line valid-jsdoc
     */
    setTypeHints(typeHints: TypeHintsMap | undefined): void;
}
/**
 * Type hints map.
 */
export type TypeHintsMap = {
    [key: string]: string;
};
