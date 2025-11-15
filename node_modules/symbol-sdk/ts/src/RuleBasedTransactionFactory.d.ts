/**
 * Rule based transaction factory.
 * This class is not intended to be used directly.
 */
export default class RuleBasedTransactionFactory {
    /**
     * Creates a rule based transaction factory for use with catbuffer generated code.
     * @param {object} module Catbuffer generated module.
     * @param {Function|undefined} typeConverter Type converter.
     * @param {Map<string, Function>|undefined} typeRuleOverrides Type rule overrides.
     */
    constructor(module: object, typeConverter?: Function | undefined, typeRuleOverrides?: Map<string, Function> | undefined);
    /**
     * @private
     */
    private _module;
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
    private _typeRuleOverrides;
    /**
     * Map of rule names to transform functions.
     * @type {Map<string, Function>}
     */
    rules: Map<string, Function>;
    /**
     * Looks up a class in the wrapped module.
     * @param {string} name Class name.
     * @returns {Constructable} Class type.
     * @private
     */
    private _getModuleClass;
    /**
     * Creates wrapper for SDK POD types.
     * @param {string} name Class name.
     * @param {Constructable} PodClass Class type.
     */
    addPodParser(name: string, PodClass: Constructable): void;
    /**
     * Creates flag type parser.
     * @param {string} name Class name.
     */
    addFlagsParser(name: string): void;
    /**
     * Creates enum type parser.
     * @param {string} name Class name.
     */
    addEnumParser(name: string): void;
    /**
     * Creates struct parser (to allow nested parsing).
     * @param {string} name Class name.
     */
    addStructParser(name: string): void;
    /**
     * Creates array type parser, based on some existing element type parser.
     * @param {string} name Class name.
     */
    addArrayParser(name: string): void;
    /**
     * Autodetects rules using reflection.
     */
    autodetect(): void;
    /**
     * Creates an entity from a descriptor using a factory.
     * @param {Function} factory Factory function.
     * @param {object} descriptor Entity descriptor.
     * @returns {object} Newly created entity.
     */
    createFromFactory(factory: Function, descriptor: object): object;
    /**
     * Creates a transaction descriptor processor around a descriptor.
     * @param {object} descriptor Transaction descriptor.
     * @returns {TransactionDescriptorProcessor} Transaction descriptor processor.
     * @private
     */
    private _createProcessor;
}
/**
 * Constructable class type.
 */
export type Constructable = new (...args: any[]) => object;
