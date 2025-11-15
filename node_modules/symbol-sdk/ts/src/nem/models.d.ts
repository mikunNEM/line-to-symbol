export class Amount extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): Amount;
    static deserializeAligned(payload: any): Amount;
    constructor(amount?: bigint);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class Height extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): Height;
    static deserializeAligned(payload: any): Height;
    constructor(height?: bigint);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class Timestamp extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): Timestamp;
    static deserializeAligned(payload: any): Timestamp;
    constructor(timestamp?: number);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class Address extends ByteArray {
    static SIZE: number;
    static deserialize(payload: any): Address;
    constructor(address?: Uint8Array<ArrayBuffer>);
    get size(): number;
    serialize(): Uint8Array<ArrayBuffer>;
}
export class Hash256 extends ByteArray {
    static SIZE: number;
    static deserialize(payload: any): Hash256;
    constructor(hash256?: Uint8Array<ArrayBuffer>);
    get size(): number;
    serialize(): Uint8Array<ArrayBuffer>;
}
export class PublicKey extends ByteArray {
    static SIZE: number;
    static deserialize(payload: any): PublicKey;
    constructor(publicKey?: Uint8Array<ArrayBuffer>);
    get size(): number;
    serialize(): Uint8Array<ArrayBuffer>;
}
export class Signature extends ByteArray {
    static SIZE: number;
    static deserialize(payload: any): Signature;
    constructor(signature?: Uint8Array<ArrayBuffer>);
    get size(): number;
    serialize(): Uint8Array<ArrayBuffer>;
}
export class NetworkType {
    static MAINNET: NetworkType;
    static TESTNET: NetworkType;
    static valueToKey(value: any): string;
    static fromValue(value: any): any;
    static deserialize(payload: any): any;
    static deserializeAligned(payload: any): any;
    constructor(value: any);
    value: any;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    toJson(): any;
}
export class TransactionType {
    static TRANSFER: TransactionType;
    static ACCOUNT_KEY_LINK: TransactionType;
    static MULTISIG_ACCOUNT_MODIFICATION: TransactionType;
    static MULTISIG_COSIGNATURE: TransactionType;
    static MULTISIG: TransactionType;
    static NAMESPACE_REGISTRATION: TransactionType;
    static MOSAIC_DEFINITION: TransactionType;
    static MOSAIC_SUPPLY_CHANGE: TransactionType;
    static valueToKey(value: any): string;
    static fromValue(value: any): any;
    static deserialize(payload: any): any;
    static deserializeAligned(payload: any): any;
    constructor(value: any);
    value: any;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    toJson(): any;
}
export class Transaction {
    static TYPE_HINTS: {
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        signature: string;
        fee: string;
        deadline: string;
    };
    static _deserialize(view: any, instance: any): void;
    _type: TransactionType;
    _version: number;
    _network: NetworkType;
    _timestamp: Timestamp;
    _signerPublicKey: PublicKey;
    _signature: Signature;
    _fee: Amount;
    _deadline: Timestamp;
    _entityBodyReserved_1: number;
    _signerPublicKeySize: number;
    _signatureSize: number;
    sort(): void;
    set type(value: TransactionType);
    get type(): TransactionType;
    set version(value: number);
    get version(): number;
    set network(value: NetworkType);
    get network(): NetworkType;
    set timestamp(value: Timestamp);
    get timestamp(): Timestamp;
    set signerPublicKey(value: PublicKey);
    get signerPublicKey(): PublicKey;
    set signature(value: Signature);
    get signature(): Signature;
    set fee(value: Amount);
    get fee(): Amount;
    set deadline(value: Timestamp);
    get deadline(): Timestamp;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    _serialize(buffer: any): void;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class NonVerifiableTransaction {
    static TYPE_HINTS: {
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        fee: string;
        deadline: string;
    };
    static _deserialize(view: any, instance: any): void;
    _type: TransactionType;
    _version: number;
    _network: NetworkType;
    _timestamp: Timestamp;
    _signerPublicKey: PublicKey;
    _fee: Amount;
    _deadline: Timestamp;
    _entityBodyReserved_1: number;
    _signerPublicKeySize: number;
    sort(): void;
    set type(value: TransactionType);
    get type(): TransactionType;
    set version(value: number);
    get version(): number;
    set network(value: NetworkType);
    get network(): NetworkType;
    set timestamp(value: Timestamp);
    get timestamp(): Timestamp;
    set signerPublicKey(value: PublicKey);
    get signerPublicKey(): PublicKey;
    set fee(value: Amount);
    get fee(): Amount;
    set deadline(value: Timestamp);
    get deadline(): Timestamp;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    _serialize(buffer: any): void;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class LinkAction {
    static LINK: LinkAction;
    static UNLINK: LinkAction;
    static valueToKey(value: any): string;
    static fromValue(value: any): any;
    static deserialize(payload: any): any;
    static deserializeAligned(payload: any): any;
    constructor(value: any);
    value: any;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    toJson(): any;
}
export class AccountKeyLinkTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        linkAction: string;
        remotePublicKey: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        signature: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): AccountKeyLinkTransactionV1;
    _linkAction: LinkAction;
    _remotePublicKey: PublicKey;
    _remotePublicKeySize: number;
    set linkAction(value: LinkAction);
    get linkAction(): LinkAction;
    set remotePublicKey(value: PublicKey);
    get remotePublicKey(): PublicKey;
}
export class NonVerifiableAccountKeyLinkTransactionV1 extends NonVerifiableTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        linkAction: string;
        remotePublicKey: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): NonVerifiableAccountKeyLinkTransactionV1;
    _linkAction: LinkAction;
    _remotePublicKey: PublicKey;
    _remotePublicKeySize: number;
    set linkAction(value: LinkAction);
    get linkAction(): LinkAction;
    set remotePublicKey(value: PublicKey);
    get remotePublicKey(): PublicKey;
}
export class NamespaceId {
    static TYPE_HINTS: {
        name: string;
    };
    static deserialize(payload: any): NamespaceId;
    _name: Uint8Array<ArrayBuffer>;
    sort(): void;
    set name(value: Uint8Array<ArrayBuffer>);
    get name(): Uint8Array<ArrayBuffer>;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class MosaicId {
    static TYPE_HINTS: {
        namespaceId: string;
        name: string;
    };
    static deserialize(payload: any): MosaicId;
    _namespaceId: NamespaceId;
    _name: Uint8Array<ArrayBuffer>;
    sort(): void;
    set namespaceId(value: NamespaceId);
    get namespaceId(): NamespaceId;
    set name(value: Uint8Array<ArrayBuffer>);
    get name(): Uint8Array<ArrayBuffer>;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class Mosaic {
    static TYPE_HINTS: {
        mosaicId: string;
        amount: string;
    };
    static deserialize(payload: any): Mosaic;
    _mosaicId: MosaicId;
    _amount: Amount;
    sort(): void;
    set mosaicId(value: MosaicId);
    get mosaicId(): MosaicId;
    set amount(value: Amount);
    get amount(): Amount;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class SizePrefixedMosaic {
    static TYPE_HINTS: {
        mosaic: string;
    };
    static deserialize(payload: any): SizePrefixedMosaic;
    _mosaic: Mosaic;
    sort(): void;
    set mosaic(value: Mosaic);
    get mosaic(): Mosaic;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class MosaicTransferFeeType {
    static ABSOLUTE: MosaicTransferFeeType;
    static PERCENTILE: MosaicTransferFeeType;
    static valueToKey(value: any): string;
    static fromValue(value: any): any;
    static deserialize(payload: any): any;
    static deserializeAligned(payload: any): any;
    constructor(value: any);
    value: any;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    toJson(): any;
}
export class MosaicLevy {
    static TYPE_HINTS: {
        transferFeeType: string;
        recipientAddress: string;
        mosaicId: string;
        fee: string;
    };
    static deserialize(payload: any): MosaicLevy;
    _transferFeeType: MosaicTransferFeeType;
    _recipientAddress: Address;
    _mosaicId: MosaicId;
    _fee: Amount;
    _recipientAddressSize: number;
    sort(): void;
    set transferFeeType(value: MosaicTransferFeeType);
    get transferFeeType(): MosaicTransferFeeType;
    set recipientAddress(value: Address);
    get recipientAddress(): Address;
    set mosaicId(value: MosaicId);
    get mosaicId(): MosaicId;
    set fee(value: Amount);
    get fee(): Amount;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class MosaicProperty {
    static TYPE_HINTS: {
        name: string;
        value: string;
    };
    static deserialize(payload: any): MosaicProperty;
    _name: Uint8Array<ArrayBuffer>;
    _value: Uint8Array<ArrayBuffer>;
    sort(): void;
    set name(value: Uint8Array<ArrayBuffer>);
    get name(): Uint8Array<ArrayBuffer>;
    set value(value: Uint8Array<ArrayBuffer>);
    get value(): Uint8Array<ArrayBuffer>;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class SizePrefixedMosaicProperty {
    static TYPE_HINTS: {
        property: string;
    };
    static deserialize(payload: any): SizePrefixedMosaicProperty;
    _property: MosaicProperty;
    sort(): void;
    set property(value: MosaicProperty);
    get property(): MosaicProperty;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class MosaicDefinition {
    static TYPE_HINTS: {
        ownerPublicKey: string;
        id: string;
        description: string;
        properties: string;
        levy: string;
    };
    static deserialize(payload: any): MosaicDefinition;
    _ownerPublicKey: PublicKey;
    _id: MosaicId;
    _description: Uint8Array<ArrayBuffer>;
    _properties: any[];
    _levy: any;
    _ownerPublicKeySize: number;
    sort(): void;
    set ownerPublicKey(value: PublicKey);
    get ownerPublicKey(): PublicKey;
    set id(value: MosaicId);
    get id(): MosaicId;
    set description(value: Uint8Array<ArrayBuffer>);
    get description(): Uint8Array<ArrayBuffer>;
    set properties(value: any[]);
    get properties(): any[];
    set levy(value: any);
    get levy(): any;
    get levySizeComputed(): any;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class MosaicDefinitionTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        mosaicDefinition: string;
        rentalFeeSink: string;
        rentalFee: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        signature: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): MosaicDefinitionTransactionV1;
    _mosaicDefinition: MosaicDefinition;
    _rentalFeeSink: Address;
    _rentalFee: Amount;
    _rentalFeeSinkSize: number;
    set mosaicDefinition(value: MosaicDefinition);
    get mosaicDefinition(): MosaicDefinition;
    set rentalFeeSink(value: Address);
    get rentalFeeSink(): Address;
    set rentalFee(value: Amount);
    get rentalFee(): Amount;
}
export class NonVerifiableMosaicDefinitionTransactionV1 extends NonVerifiableTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        mosaicDefinition: string;
        rentalFeeSink: string;
        rentalFee: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): NonVerifiableMosaicDefinitionTransactionV1;
    _mosaicDefinition: MosaicDefinition;
    _rentalFeeSink: Address;
    _rentalFee: Amount;
    _rentalFeeSinkSize: number;
    set mosaicDefinition(value: MosaicDefinition);
    get mosaicDefinition(): MosaicDefinition;
    set rentalFeeSink(value: Address);
    get rentalFeeSink(): Address;
    set rentalFee(value: Amount);
    get rentalFee(): Amount;
}
export class MosaicSupplyChangeAction {
    static INCREASE: MosaicSupplyChangeAction;
    static DECREASE: MosaicSupplyChangeAction;
    static valueToKey(value: any): string;
    static fromValue(value: any): any;
    static deserialize(payload: any): any;
    static deserializeAligned(payload: any): any;
    constructor(value: any);
    value: any;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    toJson(): any;
}
export class MosaicSupplyChangeTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        mosaicId: string;
        action: string;
        delta: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        signature: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): MosaicSupplyChangeTransactionV1;
    _mosaicId: MosaicId;
    _action: MosaicSupplyChangeAction;
    _delta: Amount;
    set mosaicId(value: MosaicId);
    get mosaicId(): MosaicId;
    set action(value: MosaicSupplyChangeAction);
    get action(): MosaicSupplyChangeAction;
    set delta(value: Amount);
    get delta(): Amount;
}
export class NonVerifiableMosaicSupplyChangeTransactionV1 extends NonVerifiableTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        mosaicId: string;
        action: string;
        delta: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): NonVerifiableMosaicSupplyChangeTransactionV1;
    _mosaicId: MosaicId;
    _action: MosaicSupplyChangeAction;
    _delta: Amount;
    set mosaicId(value: MosaicId);
    get mosaicId(): MosaicId;
    set action(value: MosaicSupplyChangeAction);
    get action(): MosaicSupplyChangeAction;
    set delta(value: Amount);
    get delta(): Amount;
}
export class MultisigAccountModificationType {
    static ADD_COSIGNATORY: MultisigAccountModificationType;
    static DELETE_COSIGNATORY: MultisigAccountModificationType;
    static valueToKey(value: any): string;
    static fromValue(value: any): any;
    static deserialize(payload: any): any;
    static deserializeAligned(payload: any): any;
    constructor(value: any);
    value: any;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    toJson(): any;
}
export class MultisigAccountModification {
    static TYPE_HINTS: {
        modificationType: string;
        cosignatoryPublicKey: string;
    };
    static deserialize(payload: any): MultisigAccountModification;
    _modificationType: MultisigAccountModificationType;
    _cosignatoryPublicKey: PublicKey;
    _cosignatoryPublicKeySize: number;
    comparer(): (Uint8Array<ArrayBufferLike> | MultisigAccountModificationType)[];
    sort(): void;
    set modificationType(value: MultisigAccountModificationType);
    get modificationType(): MultisigAccountModificationType;
    set cosignatoryPublicKey(value: PublicKey);
    get cosignatoryPublicKey(): PublicKey;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class SizePrefixedMultisigAccountModification {
    static TYPE_HINTS: {
        modification: string;
    };
    static deserialize(payload: any): SizePrefixedMultisigAccountModification;
    _modification: MultisigAccountModification;
    sort(): void;
    set modification(value: MultisigAccountModification);
    get modification(): MultisigAccountModification;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class MultisigAccountModificationTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        modifications: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        signature: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): MultisigAccountModificationTransactionV1;
    _modifications: any[];
    set modifications(value: any[]);
    get modifications(): any[];
}
export class NonVerifiableMultisigAccountModificationTransactionV1 extends NonVerifiableTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        modifications: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): NonVerifiableMultisigAccountModificationTransactionV1;
    _modifications: any[];
    set modifications(value: any[]);
    get modifications(): any[];
}
export class MultisigAccountModificationTransactionV2 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        modifications: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        signature: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): MultisigAccountModificationTransactionV2;
    _modifications: any[];
    _minApprovalDelta: number;
    _minApprovalDeltaSize: number;
    set modifications(value: any[]);
    get modifications(): any[];
    set minApprovalDelta(value: number);
    get minApprovalDelta(): number;
}
export class NonVerifiableMultisigAccountModificationTransactionV2 extends NonVerifiableTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        modifications: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): NonVerifiableMultisigAccountModificationTransactionV2;
    _modifications: any[];
    _minApprovalDelta: number;
    _minApprovalDeltaSize: number;
    set modifications(value: any[]);
    get modifications(): any[];
    set minApprovalDelta(value: number);
    get minApprovalDelta(): number;
}
export class CosignatureV1Body {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        otherTransactionHash: string;
        multisigAccountAddress: string;
    };
    static deserialize(payload: any): CosignatureV1Body;
    _otherTransactionHash: Hash256;
    _multisigAccountAddress: Address;
    _otherTransactionHashOuterSize: number;
    _otherTransactionHashSize: number;
    _multisigAccountAddressSize: number;
    sort(): void;
    set otherTransactionHash(value: Hash256);
    get otherTransactionHash(): Hash256;
    set multisigAccountAddress(value: Address);
    get multisigAccountAddress(): Address;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class CosignatureV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        otherTransactionHash: string;
        multisigAccountAddress: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        signature: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): CosignatureV1;
    _otherTransactionHash: Hash256;
    _multisigAccountAddress: Address;
    _otherTransactionHashOuterSize: number;
    _otherTransactionHashSize: number;
    _multisigAccountAddressSize: number;
    set otherTransactionHash(value: Hash256);
    get otherTransactionHash(): Hash256;
    set multisigAccountAddress(value: Address);
    get multisigAccountAddress(): Address;
}
export class NonVerifiableCosignatureV1 extends NonVerifiableTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        otherTransactionHash: string;
        multisigAccountAddress: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): NonVerifiableCosignatureV1;
    _otherTransactionHash: Hash256;
    _multisigAccountAddress: Address;
    _otherTransactionHashOuterSize: number;
    _otherTransactionHashSize: number;
    _multisigAccountAddressSize: number;
    set otherTransactionHash(value: Hash256);
    get otherTransactionHash(): Hash256;
    set multisigAccountAddress(value: Address);
    get multisigAccountAddress(): Address;
}
export class SizePrefixedCosignatureV1 {
    static TYPE_HINTS: {
        cosignature: string;
    };
    static deserialize(payload: any): SizePrefixedCosignatureV1;
    _cosignature: CosignatureV1;
    sort(): void;
    set cosignature(value: CosignatureV1);
    get cosignature(): CosignatureV1;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class MultisigTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        innerTransaction: string;
        cosignatures: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        signature: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): MultisigTransactionV1;
    _innerTransaction: NonVerifiableTransaction;
    _cosignatures: any[];
    set innerTransaction(value: NonVerifiableTransaction);
    get innerTransaction(): NonVerifiableTransaction;
    set cosignatures(value: any[]);
    get cosignatures(): any[];
}
export class NonVerifiableMultisigTransactionV1 extends NonVerifiableTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        innerTransaction: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): NonVerifiableMultisigTransactionV1;
    _innerTransaction: NonVerifiableTransaction;
    set innerTransaction(value: NonVerifiableTransaction);
    get innerTransaction(): NonVerifiableTransaction;
}
export class NamespaceRegistrationTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        rentalFeeSink: string;
        rentalFee: string;
        name: string;
        parentName: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        signature: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): NamespaceRegistrationTransactionV1;
    _rentalFeeSink: Address;
    _rentalFee: Amount;
    _name: Uint8Array<ArrayBuffer>;
    _parentName: any;
    _rentalFeeSinkSize: number;
    set rentalFeeSink(value: Address);
    get rentalFeeSink(): Address;
    set rentalFee(value: Amount);
    get rentalFee(): Amount;
    set name(value: Uint8Array<ArrayBuffer>);
    get name(): Uint8Array<ArrayBuffer>;
    set parentName(value: any);
    get parentName(): any;
}
export class NonVerifiableNamespaceRegistrationTransactionV1 extends NonVerifiableTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        rentalFeeSink: string;
        rentalFee: string;
        name: string;
        parentName: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): NonVerifiableNamespaceRegistrationTransactionV1;
    _rentalFeeSink: Address;
    _rentalFee: Amount;
    _name: Uint8Array<ArrayBuffer>;
    _parentName: any;
    _rentalFeeSinkSize: number;
    set rentalFeeSink(value: Address);
    get rentalFeeSink(): Address;
    set rentalFee(value: Amount);
    get rentalFee(): Amount;
    set name(value: Uint8Array<ArrayBuffer>);
    get name(): Uint8Array<ArrayBuffer>;
    set parentName(value: any);
    get parentName(): any;
}
export class MessageType {
    static PLAIN: MessageType;
    static ENCRYPTED: MessageType;
    static valueToKey(value: any): string;
    static fromValue(value: any): any;
    static deserialize(payload: any): any;
    static deserializeAligned(payload: any): any;
    constructor(value: any);
    value: any;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    toJson(): any;
}
export class Message {
    static TYPE_HINTS: {
        messageType: string;
        message: string;
    };
    static deserialize(payload: any): Message;
    _messageType: MessageType;
    _message: Uint8Array<ArrayBuffer>;
    sort(): void;
    set messageType(value: MessageType);
    get messageType(): MessageType;
    set message(value: Uint8Array<ArrayBuffer>);
    get message(): Uint8Array<ArrayBuffer>;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class TransferTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        recipientAddress: string;
        amount: string;
        message: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        signature: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): TransferTransactionV1;
    _recipientAddress: Address;
    _amount: Amount;
    _message: any;
    _recipientAddressSize: number;
    set recipientAddress(value: Address);
    get recipientAddress(): Address;
    set amount(value: Amount);
    get amount(): Amount;
    set message(value: any);
    get message(): any;
    get messageEnvelopeSizeComputed(): any;
}
export class NonVerifiableTransferTransactionV1 extends NonVerifiableTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        recipientAddress: string;
        amount: string;
        message: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): NonVerifiableTransferTransactionV1;
    _recipientAddress: Address;
    _amount: Amount;
    _message: any;
    _recipientAddressSize: number;
    set recipientAddress(value: Address);
    get recipientAddress(): Address;
    set amount(value: Amount);
    get amount(): Amount;
    set message(value: any);
    get message(): any;
    get messageEnvelopeSizeComputed(): any;
}
export class TransferTransactionV2 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        recipientAddress: string;
        amount: string;
        message: string;
        mosaics: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        signature: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): TransferTransactionV2;
    _recipientAddress: Address;
    _amount: Amount;
    _message: any;
    _mosaics: any[];
    _recipientAddressSize: number;
    set recipientAddress(value: Address);
    get recipientAddress(): Address;
    set amount(value: Amount);
    get amount(): Amount;
    set message(value: any);
    get message(): any;
    set mosaics(value: any[]);
    get mosaics(): any[];
    get messageEnvelopeSizeComputed(): any;
}
export class NonVerifiableTransferTransactionV2 extends NonVerifiableTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        recipientAddress: string;
        amount: string;
        message: string;
        mosaics: string;
        type: string;
        network: string;
        timestamp: string;
        signerPublicKey: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): NonVerifiableTransferTransactionV2;
    _recipientAddress: Address;
    _amount: Amount;
    _message: any;
    _mosaics: any[];
    _recipientAddressSize: number;
    set recipientAddress(value: Address);
    get recipientAddress(): Address;
    set amount(value: Amount);
    get amount(): Amount;
    set message(value: any);
    get message(): any;
    set mosaics(value: any[]);
    get mosaics(): any[];
    get messageEnvelopeSizeComputed(): any;
}
export class TransactionFactory {
    static toKey(values: any): any;
    static deserialize(payload: any): any;
    static createByName(entityName: any): any;
}
export class NonVerifiableTransactionFactory {
    static toKey(values: any): any;
    static deserialize(payload: any): any;
    static createByName(entityName: any): any;
}
import BaseValue from '../BaseValue.js';
import ByteArray from '../ByteArray.js';
