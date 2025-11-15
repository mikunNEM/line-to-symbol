export class Amount extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): Amount;
    static deserializeAligned(payload: any): Amount;
    constructor(amount?: bigint);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class BlockDuration extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): BlockDuration;
    static deserializeAligned(payload: any): BlockDuration;
    constructor(blockDuration?: bigint);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class BlockFeeMultiplier extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): BlockFeeMultiplier;
    static deserializeAligned(payload: any): BlockFeeMultiplier;
    constructor(blockFeeMultiplier?: number);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class Difficulty extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): Difficulty;
    static deserializeAligned(payload: any): Difficulty;
    constructor(difficulty?: bigint);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class FinalizationEpoch extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): FinalizationEpoch;
    static deserializeAligned(payload: any): FinalizationEpoch;
    constructor(finalizationEpoch?: number);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class FinalizationPoint extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): FinalizationPoint;
    static deserializeAligned(payload: any): FinalizationPoint;
    constructor(finalizationPoint?: number);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class Height extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): Height;
    static deserializeAligned(payload: any): Height;
    constructor(height?: bigint);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class Importance extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): Importance;
    static deserializeAligned(payload: any): Importance;
    constructor(importance?: bigint);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class ImportanceHeight extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): ImportanceHeight;
    static deserializeAligned(payload: any): ImportanceHeight;
    constructor(importanceHeight?: bigint);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class UnresolvedMosaicId extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): UnresolvedMosaicId;
    static deserializeAligned(payload: any): UnresolvedMosaicId;
    constructor(unresolvedMosaicId?: bigint);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class MosaicId extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): MosaicId;
    static deserializeAligned(payload: any): MosaicId;
    constructor(mosaicId?: bigint);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class Timestamp extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): Timestamp;
    static deserializeAligned(payload: any): Timestamp;
    constructor(timestamp?: bigint);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class UnresolvedAddress extends ByteArray {
    static SIZE: number;
    static deserialize(payload: any): UnresolvedAddress;
    constructor(unresolvedAddress?: Uint8Array<ArrayBuffer>);
    get size(): number;
    serialize(): Uint8Array<ArrayBuffer>;
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
export class Hash512 extends ByteArray {
    static SIZE: number;
    static deserialize(payload: any): Hash512;
    constructor(hash512?: Uint8Array<ArrayBuffer>);
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
export class VotingPublicKey extends ByteArray {
    static SIZE: number;
    static deserialize(payload: any): VotingPublicKey;
    constructor(votingPublicKey?: Uint8Array<ArrayBuffer>);
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
export class Mosaic {
    static TYPE_HINTS: {
        mosaicId: string;
        amount: string;
    };
    static deserialize(payload: any): Mosaic;
    static deserializeAligned(payload: any): Mosaic;
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
export class UnresolvedMosaic {
    static TYPE_HINTS: {
        mosaicId: string;
        amount: string;
    };
    static deserialize(payload: any): UnresolvedMosaic;
    _mosaicId: UnresolvedMosaicId;
    _amount: Amount;
    sort(): void;
    set mosaicId(value: UnresolvedMosaicId);
    get mosaicId(): UnresolvedMosaicId;
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
export class LinkAction {
    static UNLINK: LinkAction;
    static LINK: LinkAction;
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
    static ACCOUNT_KEY_LINK: TransactionType;
    static NODE_KEY_LINK: TransactionType;
    static AGGREGATE_COMPLETE: TransactionType;
    static AGGREGATE_BONDED: TransactionType;
    static VOTING_KEY_LINK: TransactionType;
    static VRF_KEY_LINK: TransactionType;
    static HASH_LOCK: TransactionType;
    static SECRET_LOCK: TransactionType;
    static SECRET_PROOF: TransactionType;
    static ACCOUNT_METADATA: TransactionType;
    static MOSAIC_METADATA: TransactionType;
    static NAMESPACE_METADATA: TransactionType;
    static MOSAIC_DEFINITION: TransactionType;
    static MOSAIC_SUPPLY_CHANGE: TransactionType;
    static MOSAIC_SUPPLY_REVOCATION: TransactionType;
    static MULTISIG_ACCOUNT_MODIFICATION: TransactionType;
    static ADDRESS_ALIAS: TransactionType;
    static MOSAIC_ALIAS: TransactionType;
    static NAMESPACE_REGISTRATION: TransactionType;
    static ACCOUNT_ADDRESS_RESTRICTION: TransactionType;
    static ACCOUNT_MOSAIC_RESTRICTION: TransactionType;
    static ACCOUNT_OPERATION_RESTRICTION: TransactionType;
    static MOSAIC_ADDRESS_RESTRICTION: TransactionType;
    static MOSAIC_GLOBAL_RESTRICTION: TransactionType;
    static TRANSFER: TransactionType;
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
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static _deserialize(view: any, instance: any): void;
    _signature: Signature;
    _signerPublicKey: PublicKey;
    _version: number;
    _network: NetworkType;
    _type: TransactionType;
    _fee: Amount;
    _deadline: Timestamp;
    _verifiableEntityHeaderReserved_1: number;
    _entityBodyReserved_1: number;
    sort(): void;
    set signature(value: Signature);
    get signature(): Signature;
    set signerPublicKey(value: PublicKey);
    get signerPublicKey(): PublicKey;
    set version(value: number);
    get version(): number;
    set network(value: NetworkType);
    get network(): NetworkType;
    set type(value: TransactionType);
    get type(): TransactionType;
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
export class EmbeddedTransaction {
    static TYPE_HINTS: {
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static _deserialize(view: any, instance: any): void;
    _signerPublicKey: PublicKey;
    _version: number;
    _network: NetworkType;
    _type: TransactionType;
    _embeddedTransactionHeaderReserved_1: number;
    _entityBodyReserved_1: number;
    sort(): void;
    set signerPublicKey(value: PublicKey);
    get signerPublicKey(): PublicKey;
    set version(value: number);
    get version(): number;
    set network(value: NetworkType);
    get network(): NetworkType;
    set type(value: TransactionType);
    get type(): TransactionType;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    _serialize(buffer: any): void;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class ProofGamma extends ByteArray {
    static SIZE: number;
    static deserialize(payload: any): ProofGamma;
    constructor(proofGamma?: Uint8Array<ArrayBuffer>);
    get size(): number;
    serialize(): Uint8Array<ArrayBuffer>;
}
export class ProofVerificationHash extends ByteArray {
    static SIZE: number;
    static deserialize(payload: any): ProofVerificationHash;
    constructor(proofVerificationHash?: Uint8Array<ArrayBuffer>);
    get size(): number;
    serialize(): Uint8Array<ArrayBuffer>;
}
export class ProofScalar extends ByteArray {
    static SIZE: number;
    static deserialize(payload: any): ProofScalar;
    constructor(proofScalar?: Uint8Array<ArrayBuffer>);
    get size(): number;
    serialize(): Uint8Array<ArrayBuffer>;
}
export class BlockType {
    static NEMESIS: BlockType;
    static NORMAL: BlockType;
    static IMPORTANCE: BlockType;
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
export class VrfProof {
    static TYPE_HINTS: {
        gamma: string;
        verificationHash: string;
        scalar: string;
    };
    static deserialize(payload: any): VrfProof;
    _gamma: ProofGamma;
    _verificationHash: ProofVerificationHash;
    _scalar: ProofScalar;
    sort(): void;
    set gamma(value: ProofGamma);
    get gamma(): ProofGamma;
    set verificationHash(value: ProofVerificationHash);
    get verificationHash(): ProofVerificationHash;
    set scalar(value: ProofScalar);
    get scalar(): ProofScalar;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class Block {
    static TYPE_HINTS: {
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        height: string;
        timestamp: string;
        difficulty: string;
        generationHashProof: string;
        previousBlockHash: string;
        transactionsHash: string;
        receiptsHash: string;
        stateHash: string;
        beneficiaryAddress: string;
        feeMultiplier: string;
    };
    static _deserialize(view: any, instance: any): void;
    _signature: Signature;
    _signerPublicKey: PublicKey;
    _version: number;
    _network: NetworkType;
    _type: BlockType;
    _height: Height;
    _timestamp: Timestamp;
    _difficulty: Difficulty;
    _generationHashProof: VrfProof;
    _previousBlockHash: Hash256;
    _transactionsHash: Hash256;
    _receiptsHash: Hash256;
    _stateHash: Hash256;
    _beneficiaryAddress: Address;
    _feeMultiplier: BlockFeeMultiplier;
    _verifiableEntityHeaderReserved_1: number;
    _entityBodyReserved_1: number;
    sort(): void;
    set signature(value: Signature);
    get signature(): Signature;
    set signerPublicKey(value: PublicKey);
    get signerPublicKey(): PublicKey;
    set version(value: number);
    get version(): number;
    set network(value: NetworkType);
    get network(): NetworkType;
    set type(value: BlockType);
    get type(): BlockType;
    set height(value: Height);
    get height(): Height;
    set timestamp(value: Timestamp);
    get timestamp(): Timestamp;
    set difficulty(value: Difficulty);
    get difficulty(): Difficulty;
    set generationHashProof(value: VrfProof);
    get generationHashProof(): VrfProof;
    set previousBlockHash(value: Hash256);
    get previousBlockHash(): Hash256;
    set transactionsHash(value: Hash256);
    get transactionsHash(): Hash256;
    set receiptsHash(value: Hash256);
    get receiptsHash(): Hash256;
    set stateHash(value: Hash256);
    get stateHash(): Hash256;
    set beneficiaryAddress(value: Address);
    get beneficiaryAddress(): Address;
    set feeMultiplier(value: BlockFeeMultiplier);
    get feeMultiplier(): BlockFeeMultiplier;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    _serialize(buffer: any): void;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class NemesisBlockV1 extends Block {
    static BLOCK_VERSION: number;
    static BLOCK_TYPE: BlockType;
    static TYPE_HINTS: {
        totalVotingBalance: string;
        previousImportanceBlockHash: string;
        transactions: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        height: string;
        timestamp: string;
        difficulty: string;
        generationHashProof: string;
        previousBlockHash: string;
        transactionsHash: string;
        receiptsHash: string;
        stateHash: string;
        beneficiaryAddress: string;
        feeMultiplier: string;
    };
    static deserialize(payload: any): NemesisBlockV1;
    _votingEligibleAccountsCount: number;
    _harvestingEligibleAccountsCount: bigint;
    _totalVotingBalance: Amount;
    _previousImportanceBlockHash: Hash256;
    _transactions: any[];
    set votingEligibleAccountsCount(value: number);
    get votingEligibleAccountsCount(): number;
    set harvestingEligibleAccountsCount(value: bigint);
    get harvestingEligibleAccountsCount(): bigint;
    set totalVotingBalance(value: Amount);
    get totalVotingBalance(): Amount;
    set previousImportanceBlockHash(value: Hash256);
    get previousImportanceBlockHash(): Hash256;
    set transactions(value: any[]);
    get transactions(): any[];
}
export class NormalBlockV1 extends Block {
    static BLOCK_VERSION: number;
    static BLOCK_TYPE: BlockType;
    static TYPE_HINTS: {
        transactions: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        height: string;
        timestamp: string;
        difficulty: string;
        generationHashProof: string;
        previousBlockHash: string;
        transactionsHash: string;
        receiptsHash: string;
        stateHash: string;
        beneficiaryAddress: string;
        feeMultiplier: string;
    };
    static deserialize(payload: any): NormalBlockV1;
    _transactions: any[];
    _blockHeaderReserved_1: number;
    set transactions(value: any[]);
    get transactions(): any[];
}
export class ImportanceBlockV1 extends Block {
    static BLOCK_VERSION: number;
    static BLOCK_TYPE: BlockType;
    static TYPE_HINTS: {
        totalVotingBalance: string;
        previousImportanceBlockHash: string;
        transactions: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        height: string;
        timestamp: string;
        difficulty: string;
        generationHashProof: string;
        previousBlockHash: string;
        transactionsHash: string;
        receiptsHash: string;
        stateHash: string;
        beneficiaryAddress: string;
        feeMultiplier: string;
    };
    static deserialize(payload: any): ImportanceBlockV1;
    _votingEligibleAccountsCount: number;
    _harvestingEligibleAccountsCount: bigint;
    _totalVotingBalance: Amount;
    _previousImportanceBlockHash: Hash256;
    _transactions: any[];
    set votingEligibleAccountsCount(value: number);
    get votingEligibleAccountsCount(): number;
    set harvestingEligibleAccountsCount(value: bigint);
    get harvestingEligibleAccountsCount(): bigint;
    set totalVotingBalance(value: Amount);
    get totalVotingBalance(): Amount;
    set previousImportanceBlockHash(value: Hash256);
    get previousImportanceBlockHash(): Hash256;
    set transactions(value: any[]);
    get transactions(): any[];
}
export class FinalizationRound {
    static TYPE_HINTS: {
        epoch: string;
        point: string;
    };
    static deserialize(payload: any): FinalizationRound;
    _epoch: FinalizationEpoch;
    _point: FinalizationPoint;
    sort(): void;
    set epoch(value: FinalizationEpoch);
    get epoch(): FinalizationEpoch;
    set point(value: FinalizationPoint);
    get point(): FinalizationPoint;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class FinalizedBlockHeader {
    static TYPE_HINTS: {
        round: string;
        height: string;
        hash: string;
    };
    static deserialize(payload: any): FinalizedBlockHeader;
    _round: FinalizationRound;
    _height: Height;
    _hash: Hash256;
    sort(): void;
    set round(value: FinalizationRound);
    get round(): FinalizationRound;
    set height(value: Height);
    get height(): Height;
    set hash(value: Hash256);
    get hash(): Hash256;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class ReceiptType {
    static MOSAIC_RENTAL_FEE: ReceiptType;
    static NAMESPACE_RENTAL_FEE: ReceiptType;
    static HARVEST_FEE: ReceiptType;
    static LOCK_HASH_COMPLETED: ReceiptType;
    static LOCK_HASH_EXPIRED: ReceiptType;
    static LOCK_SECRET_COMPLETED: ReceiptType;
    static LOCK_SECRET_EXPIRED: ReceiptType;
    static LOCK_HASH_CREATED: ReceiptType;
    static LOCK_SECRET_CREATED: ReceiptType;
    static MOSAIC_EXPIRED: ReceiptType;
    static NAMESPACE_EXPIRED: ReceiptType;
    static NAMESPACE_DELETED: ReceiptType;
    static INFLATION: ReceiptType;
    static TRANSACTION_GROUP: ReceiptType;
    static ADDRESS_ALIAS_RESOLUTION: ReceiptType;
    static MOSAIC_ALIAS_RESOLUTION: ReceiptType;
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
export class Receipt {
    static TYPE_HINTS: {
        type: string;
    };
    static _deserialize(view: any, instance: any): void;
    static _deserializeAligned(view: any, instance: any): void;
    _version: number;
    _type: ReceiptType;
    sort(): void;
    set version(value: number);
    get version(): number;
    set type(value: ReceiptType);
    get type(): ReceiptType;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    _serialize(buffer: any): void;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class HarvestFeeReceipt extends Receipt {
    static RECEIPT_TYPE: ReceiptType;
    static TYPE_HINTS: {
        mosaic: string;
        targetAddress: string;
        type: string;
    };
    static deserialize(payload: any): HarvestFeeReceipt;
    static deserializeAligned(payload: any): HarvestFeeReceipt;
    _mosaic: Mosaic;
    _targetAddress: Address;
    set mosaic(value: Mosaic);
    get mosaic(): Mosaic;
    set targetAddress(value: Address);
    get targetAddress(): Address;
}
export class InflationReceipt extends Receipt {
    static RECEIPT_TYPE: ReceiptType;
    static TYPE_HINTS: {
        mosaic: string;
        type: string;
    };
    static deserialize(payload: any): InflationReceipt;
    static deserializeAligned(payload: any): InflationReceipt;
    _mosaic: Mosaic;
    set mosaic(value: Mosaic);
    get mosaic(): Mosaic;
}
export class LockHashCreatedFeeReceipt extends Receipt {
    static RECEIPT_TYPE: ReceiptType;
    static TYPE_HINTS: {
        mosaic: string;
        targetAddress: string;
        type: string;
    };
    static deserialize(payload: any): LockHashCreatedFeeReceipt;
    static deserializeAligned(payload: any): LockHashCreatedFeeReceipt;
    _mosaic: Mosaic;
    _targetAddress: Address;
    set mosaic(value: Mosaic);
    get mosaic(): Mosaic;
    set targetAddress(value: Address);
    get targetAddress(): Address;
}
export class LockHashCompletedFeeReceipt extends Receipt {
    static RECEIPT_TYPE: ReceiptType;
    static TYPE_HINTS: {
        mosaic: string;
        targetAddress: string;
        type: string;
    };
    static deserialize(payload: any): LockHashCompletedFeeReceipt;
    static deserializeAligned(payload: any): LockHashCompletedFeeReceipt;
    _mosaic: Mosaic;
    _targetAddress: Address;
    set mosaic(value: Mosaic);
    get mosaic(): Mosaic;
    set targetAddress(value: Address);
    get targetAddress(): Address;
}
export class LockHashExpiredFeeReceipt extends Receipt {
    static RECEIPT_TYPE: ReceiptType;
    static TYPE_HINTS: {
        mosaic: string;
        targetAddress: string;
        type: string;
    };
    static deserialize(payload: any): LockHashExpiredFeeReceipt;
    static deserializeAligned(payload: any): LockHashExpiredFeeReceipt;
    _mosaic: Mosaic;
    _targetAddress: Address;
    set mosaic(value: Mosaic);
    get mosaic(): Mosaic;
    set targetAddress(value: Address);
    get targetAddress(): Address;
}
export class LockSecretCreatedFeeReceipt extends Receipt {
    static RECEIPT_TYPE: ReceiptType;
    static TYPE_HINTS: {
        mosaic: string;
        targetAddress: string;
        type: string;
    };
    static deserialize(payload: any): LockSecretCreatedFeeReceipt;
    static deserializeAligned(payload: any): LockSecretCreatedFeeReceipt;
    _mosaic: Mosaic;
    _targetAddress: Address;
    set mosaic(value: Mosaic);
    get mosaic(): Mosaic;
    set targetAddress(value: Address);
    get targetAddress(): Address;
}
export class LockSecretCompletedFeeReceipt extends Receipt {
    static RECEIPT_TYPE: ReceiptType;
    static TYPE_HINTS: {
        mosaic: string;
        targetAddress: string;
        type: string;
    };
    static deserialize(payload: any): LockSecretCompletedFeeReceipt;
    static deserializeAligned(payload: any): LockSecretCompletedFeeReceipt;
    _mosaic: Mosaic;
    _targetAddress: Address;
    set mosaic(value: Mosaic);
    get mosaic(): Mosaic;
    set targetAddress(value: Address);
    get targetAddress(): Address;
}
export class LockSecretExpiredFeeReceipt extends Receipt {
    static RECEIPT_TYPE: ReceiptType;
    static TYPE_HINTS: {
        mosaic: string;
        targetAddress: string;
        type: string;
    };
    static deserialize(payload: any): LockSecretExpiredFeeReceipt;
    static deserializeAligned(payload: any): LockSecretExpiredFeeReceipt;
    _mosaic: Mosaic;
    _targetAddress: Address;
    set mosaic(value: Mosaic);
    get mosaic(): Mosaic;
    set targetAddress(value: Address);
    get targetAddress(): Address;
}
export class MosaicExpiredReceipt extends Receipt {
    static RECEIPT_TYPE: ReceiptType;
    static TYPE_HINTS: {
        artifactId: string;
        type: string;
    };
    static deserialize(payload: any): MosaicExpiredReceipt;
    static deserializeAligned(payload: any): MosaicExpiredReceipt;
    _artifactId: MosaicId;
    set artifactId(value: MosaicId);
    get artifactId(): MosaicId;
}
export class MosaicRentalFeeReceipt extends Receipt {
    static RECEIPT_TYPE: ReceiptType;
    static TYPE_HINTS: {
        mosaic: string;
        senderAddress: string;
        recipientAddress: string;
        type: string;
    };
    static deserialize(payload: any): MosaicRentalFeeReceipt;
    static deserializeAligned(payload: any): MosaicRentalFeeReceipt;
    _mosaic: Mosaic;
    _senderAddress: Address;
    _recipientAddress: Address;
    set mosaic(value: Mosaic);
    get mosaic(): Mosaic;
    set senderAddress(value: Address);
    get senderAddress(): Address;
    set recipientAddress(value: Address);
    get recipientAddress(): Address;
}
export class NamespaceId extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): NamespaceId;
    static deserializeAligned(payload: any): NamespaceId;
    constructor(namespaceId?: bigint);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class NamespaceRegistrationType {
    static ROOT: NamespaceRegistrationType;
    static CHILD: NamespaceRegistrationType;
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
export class AliasAction {
    static UNLINK: AliasAction;
    static LINK: AliasAction;
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
export class NamespaceExpiredReceipt extends Receipt {
    static RECEIPT_TYPE: ReceiptType;
    static TYPE_HINTS: {
        artifactId: string;
        type: string;
    };
    static deserialize(payload: any): NamespaceExpiredReceipt;
    static deserializeAligned(payload: any): NamespaceExpiredReceipt;
    _artifactId: NamespaceId;
    set artifactId(value: NamespaceId);
    get artifactId(): NamespaceId;
}
export class NamespaceDeletedReceipt extends Receipt {
    static RECEIPT_TYPE: ReceiptType;
    static TYPE_HINTS: {
        artifactId: string;
        type: string;
    };
    static deserialize(payload: any): NamespaceDeletedReceipt;
    static deserializeAligned(payload: any): NamespaceDeletedReceipt;
    _artifactId: NamespaceId;
    set artifactId(value: NamespaceId);
    get artifactId(): NamespaceId;
}
export class NamespaceRentalFeeReceipt extends Receipt {
    static RECEIPT_TYPE: ReceiptType;
    static TYPE_HINTS: {
        mosaic: string;
        senderAddress: string;
        recipientAddress: string;
        type: string;
    };
    static deserialize(payload: any): NamespaceRentalFeeReceipt;
    static deserializeAligned(payload: any): NamespaceRentalFeeReceipt;
    _mosaic: Mosaic;
    _senderAddress: Address;
    _recipientAddress: Address;
    set mosaic(value: Mosaic);
    get mosaic(): Mosaic;
    set senderAddress(value: Address);
    get senderAddress(): Address;
    set recipientAddress(value: Address);
    get recipientAddress(): Address;
}
export class ReceiptSource {
    static TYPE_HINTS: {};
    static deserialize(payload: any): ReceiptSource;
    _primaryId: number;
    _secondaryId: number;
    sort(): void;
    set primaryId(value: number);
    get primaryId(): number;
    set secondaryId(value: number);
    get secondaryId(): number;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class AddressResolutionEntry {
    static TYPE_HINTS: {
        source: string;
        resolvedValue: string;
    };
    static deserialize(payload: any): AddressResolutionEntry;
    _source: ReceiptSource;
    _resolvedValue: Address;
    sort(): void;
    set source(value: ReceiptSource);
    get source(): ReceiptSource;
    set resolvedValue(value: Address);
    get resolvedValue(): Address;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class AddressResolutionStatement {
    static TYPE_HINTS: {
        unresolved: string;
        resolutionEntries: string;
    };
    static deserialize(payload: any): AddressResolutionStatement;
    _unresolved: UnresolvedAddress;
    _resolutionEntries: any[];
    sort(): void;
    set unresolved(value: UnresolvedAddress);
    get unresolved(): UnresolvedAddress;
    set resolutionEntries(value: any[]);
    get resolutionEntries(): any[];
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class MosaicResolutionEntry {
    static TYPE_HINTS: {
        source: string;
        resolvedValue: string;
    };
    static deserialize(payload: any): MosaicResolutionEntry;
    _source: ReceiptSource;
    _resolvedValue: MosaicId;
    sort(): void;
    set source(value: ReceiptSource);
    get source(): ReceiptSource;
    set resolvedValue(value: MosaicId);
    get resolvedValue(): MosaicId;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class MosaicResolutionStatement {
    static TYPE_HINTS: {
        unresolved: string;
        resolutionEntries: string;
    };
    static deserialize(payload: any): MosaicResolutionStatement;
    _unresolved: UnresolvedMosaicId;
    _resolutionEntries: any[];
    sort(): void;
    set unresolved(value: UnresolvedMosaicId);
    get unresolved(): UnresolvedMosaicId;
    set resolutionEntries(value: any[]);
    get resolutionEntries(): any[];
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class TransactionStatement {
    static TYPE_HINTS: {
        receipts: string;
    };
    static deserialize(payload: any): TransactionStatement;
    _primaryId: number;
    _secondaryId: number;
    _receipts: any[];
    sort(): void;
    set primaryId(value: number);
    get primaryId(): number;
    set secondaryId(value: number);
    get secondaryId(): number;
    set receipts(value: any[]);
    get receipts(): any[];
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class BlockStatement {
    static TYPE_HINTS: {
        transactionStatements: string;
        addressResolutionStatements: string;
        mosaicResolutionStatements: string;
    };
    static deserialize(payload: any): BlockStatement;
    _transactionStatements: any[];
    _addressResolutionStatements: any[];
    _mosaicResolutionStatements: any[];
    sort(): void;
    set transactionStatements(value: any[]);
    get transactionStatements(): any[];
    set addressResolutionStatements(value: any[]);
    get addressResolutionStatements(): any[];
    set mosaicResolutionStatements(value: any[]);
    get mosaicResolutionStatements(): any[];
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class AccountKeyLinkTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        linkedPublicKey: string;
        linkAction: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): AccountKeyLinkTransactionV1;
    _linkedPublicKey: PublicKey;
    _linkAction: LinkAction;
    set linkedPublicKey(value: PublicKey);
    get linkedPublicKey(): PublicKey;
    set linkAction(value: LinkAction);
    get linkAction(): LinkAction;
}
export class EmbeddedAccountKeyLinkTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        linkedPublicKey: string;
        linkAction: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedAccountKeyLinkTransactionV1;
    _linkedPublicKey: PublicKey;
    _linkAction: LinkAction;
    set linkedPublicKey(value: PublicKey);
    get linkedPublicKey(): PublicKey;
    set linkAction(value: LinkAction);
    get linkAction(): LinkAction;
}
export class NodeKeyLinkTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        linkedPublicKey: string;
        linkAction: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): NodeKeyLinkTransactionV1;
    _linkedPublicKey: PublicKey;
    _linkAction: LinkAction;
    set linkedPublicKey(value: PublicKey);
    get linkedPublicKey(): PublicKey;
    set linkAction(value: LinkAction);
    get linkAction(): LinkAction;
}
export class EmbeddedNodeKeyLinkTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        linkedPublicKey: string;
        linkAction: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedNodeKeyLinkTransactionV1;
    _linkedPublicKey: PublicKey;
    _linkAction: LinkAction;
    set linkedPublicKey(value: PublicKey);
    get linkedPublicKey(): PublicKey;
    set linkAction(value: LinkAction);
    get linkAction(): LinkAction;
}
export class Cosignature {
    static TYPE_HINTS: {
        signerPublicKey: string;
        signature: string;
    };
    static deserialize(payload: any): Cosignature;
    _version: bigint;
    _signerPublicKey: PublicKey;
    _signature: Signature;
    sort(): void;
    set version(value: bigint);
    get version(): bigint;
    set signerPublicKey(value: PublicKey);
    get signerPublicKey(): PublicKey;
    set signature(value: Signature);
    get signature(): Signature;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class DetachedCosignature {
    static TYPE_HINTS: {
        signerPublicKey: string;
        signature: string;
        parentHash: string;
    };
    static deserialize(payload: any): DetachedCosignature;
    _version: bigint;
    _signerPublicKey: PublicKey;
    _signature: Signature;
    _parentHash: Hash256;
    sort(): void;
    set version(value: bigint);
    get version(): bigint;
    set signerPublicKey(value: PublicKey);
    get signerPublicKey(): PublicKey;
    set signature(value: Signature);
    get signature(): Signature;
    set parentHash(value: Hash256);
    get parentHash(): Hash256;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    /**
     * @returns {object} JSON-safe representation of this object.
     */
    toJson(): object;
}
export class AggregateCompleteTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        transactionsHash: string;
        transactions: string;
        cosignatures: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): AggregateCompleteTransactionV1;
    _transactionsHash: Hash256;
    _transactions: any[];
    _cosignatures: any[];
    _aggregateTransactionHeaderReserved_1: number;
    set transactionsHash(value: Hash256);
    get transactionsHash(): Hash256;
    set transactions(value: any[]);
    get transactions(): any[];
    set cosignatures(value: any[]);
    get cosignatures(): any[];
}
export class AggregateCompleteTransactionV2 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        transactionsHash: string;
        transactions: string;
        cosignatures: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): AggregateCompleteTransactionV2;
    _transactionsHash: Hash256;
    _transactions: any[];
    _cosignatures: any[];
    _aggregateTransactionHeaderReserved_1: number;
    set transactionsHash(value: Hash256);
    get transactionsHash(): Hash256;
    set transactions(value: any[]);
    get transactions(): any[];
    set cosignatures(value: any[]);
    get cosignatures(): any[];
}
export class AggregateCompleteTransactionV3 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        transactionsHash: string;
        transactions: string;
        cosignatures: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): AggregateCompleteTransactionV3;
    _transactionsHash: Hash256;
    _transactions: any[];
    _cosignatures: any[];
    _aggregateTransactionHeaderReserved_1: number;
    set transactionsHash(value: Hash256);
    get transactionsHash(): Hash256;
    set transactions(value: any[]);
    get transactions(): any[];
    set cosignatures(value: any[]);
    get cosignatures(): any[];
}
export class AggregateBondedTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        transactionsHash: string;
        transactions: string;
        cosignatures: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): AggregateBondedTransactionV1;
    _transactionsHash: Hash256;
    _transactions: any[];
    _cosignatures: any[];
    _aggregateTransactionHeaderReserved_1: number;
    set transactionsHash(value: Hash256);
    get transactionsHash(): Hash256;
    set transactions(value: any[]);
    get transactions(): any[];
    set cosignatures(value: any[]);
    get cosignatures(): any[];
}
export class AggregateBondedTransactionV2 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        transactionsHash: string;
        transactions: string;
        cosignatures: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): AggregateBondedTransactionV2;
    _transactionsHash: Hash256;
    _transactions: any[];
    _cosignatures: any[];
    _aggregateTransactionHeaderReserved_1: number;
    set transactionsHash(value: Hash256);
    get transactionsHash(): Hash256;
    set transactions(value: any[]);
    get transactions(): any[];
    set cosignatures(value: any[]);
    get cosignatures(): any[];
}
export class AggregateBondedTransactionV3 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        transactionsHash: string;
        transactions: string;
        cosignatures: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): AggregateBondedTransactionV3;
    _transactionsHash: Hash256;
    _transactions: any[];
    _cosignatures: any[];
    _aggregateTransactionHeaderReserved_1: number;
    set transactionsHash(value: Hash256);
    get transactionsHash(): Hash256;
    set transactions(value: any[]);
    get transactions(): any[];
    set cosignatures(value: any[]);
    get cosignatures(): any[];
}
export class VotingKeyLinkTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        linkedPublicKey: string;
        startEpoch: string;
        endEpoch: string;
        linkAction: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): VotingKeyLinkTransactionV1;
    _linkedPublicKey: VotingPublicKey;
    _startEpoch: FinalizationEpoch;
    _endEpoch: FinalizationEpoch;
    _linkAction: LinkAction;
    set linkedPublicKey(value: VotingPublicKey);
    get linkedPublicKey(): VotingPublicKey;
    set startEpoch(value: FinalizationEpoch);
    get startEpoch(): FinalizationEpoch;
    set endEpoch(value: FinalizationEpoch);
    get endEpoch(): FinalizationEpoch;
    set linkAction(value: LinkAction);
    get linkAction(): LinkAction;
}
export class EmbeddedVotingKeyLinkTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        linkedPublicKey: string;
        startEpoch: string;
        endEpoch: string;
        linkAction: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedVotingKeyLinkTransactionV1;
    _linkedPublicKey: VotingPublicKey;
    _startEpoch: FinalizationEpoch;
    _endEpoch: FinalizationEpoch;
    _linkAction: LinkAction;
    set linkedPublicKey(value: VotingPublicKey);
    get linkedPublicKey(): VotingPublicKey;
    set startEpoch(value: FinalizationEpoch);
    get startEpoch(): FinalizationEpoch;
    set endEpoch(value: FinalizationEpoch);
    get endEpoch(): FinalizationEpoch;
    set linkAction(value: LinkAction);
    get linkAction(): LinkAction;
}
export class VrfKeyLinkTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        linkedPublicKey: string;
        linkAction: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): VrfKeyLinkTransactionV1;
    _linkedPublicKey: PublicKey;
    _linkAction: LinkAction;
    set linkedPublicKey(value: PublicKey);
    get linkedPublicKey(): PublicKey;
    set linkAction(value: LinkAction);
    get linkAction(): LinkAction;
}
export class EmbeddedVrfKeyLinkTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        linkedPublicKey: string;
        linkAction: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedVrfKeyLinkTransactionV1;
    _linkedPublicKey: PublicKey;
    _linkAction: LinkAction;
    set linkedPublicKey(value: PublicKey);
    get linkedPublicKey(): PublicKey;
    set linkAction(value: LinkAction);
    get linkAction(): LinkAction;
}
export class HashLockTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        mosaic: string;
        duration: string;
        hash: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): HashLockTransactionV1;
    _mosaic: UnresolvedMosaic;
    _duration: BlockDuration;
    _hash: Hash256;
    set mosaic(value: UnresolvedMosaic);
    get mosaic(): UnresolvedMosaic;
    set duration(value: BlockDuration);
    get duration(): BlockDuration;
    set hash(value: Hash256);
    get hash(): Hash256;
}
export class EmbeddedHashLockTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        mosaic: string;
        duration: string;
        hash: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedHashLockTransactionV1;
    _mosaic: UnresolvedMosaic;
    _duration: BlockDuration;
    _hash: Hash256;
    set mosaic(value: UnresolvedMosaic);
    get mosaic(): UnresolvedMosaic;
    set duration(value: BlockDuration);
    get duration(): BlockDuration;
    set hash(value: Hash256);
    get hash(): Hash256;
}
export class LockHashAlgorithm {
    static SHA3_256: LockHashAlgorithm;
    static HASH_160: LockHashAlgorithm;
    static HASH_256: LockHashAlgorithm;
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
export class SecretLockTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        recipientAddress: string;
        secret: string;
        mosaic: string;
        duration: string;
        hashAlgorithm: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): SecretLockTransactionV1;
    _recipientAddress: UnresolvedAddress;
    _secret: Hash256;
    _mosaic: UnresolvedMosaic;
    _duration: BlockDuration;
    _hashAlgorithm: LockHashAlgorithm;
    set recipientAddress(value: UnresolvedAddress);
    get recipientAddress(): UnresolvedAddress;
    set secret(value: Hash256);
    get secret(): Hash256;
    set mosaic(value: UnresolvedMosaic);
    get mosaic(): UnresolvedMosaic;
    set duration(value: BlockDuration);
    get duration(): BlockDuration;
    set hashAlgorithm(value: LockHashAlgorithm);
    get hashAlgorithm(): LockHashAlgorithm;
}
export class EmbeddedSecretLockTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        recipientAddress: string;
        secret: string;
        mosaic: string;
        duration: string;
        hashAlgorithm: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedSecretLockTransactionV1;
    _recipientAddress: UnresolvedAddress;
    _secret: Hash256;
    _mosaic: UnresolvedMosaic;
    _duration: BlockDuration;
    _hashAlgorithm: LockHashAlgorithm;
    set recipientAddress(value: UnresolvedAddress);
    get recipientAddress(): UnresolvedAddress;
    set secret(value: Hash256);
    get secret(): Hash256;
    set mosaic(value: UnresolvedMosaic);
    get mosaic(): UnresolvedMosaic;
    set duration(value: BlockDuration);
    get duration(): BlockDuration;
    set hashAlgorithm(value: LockHashAlgorithm);
    get hashAlgorithm(): LockHashAlgorithm;
}
export class SecretProofTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        recipientAddress: string;
        secret: string;
        hashAlgorithm: string;
        proof: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): SecretProofTransactionV1;
    _recipientAddress: UnresolvedAddress;
    _secret: Hash256;
    _hashAlgorithm: LockHashAlgorithm;
    _proof: Uint8Array<ArrayBuffer>;
    set recipientAddress(value: UnresolvedAddress);
    get recipientAddress(): UnresolvedAddress;
    set secret(value: Hash256);
    get secret(): Hash256;
    set hashAlgorithm(value: LockHashAlgorithm);
    get hashAlgorithm(): LockHashAlgorithm;
    set proof(value: Uint8Array<ArrayBuffer>);
    get proof(): Uint8Array<ArrayBuffer>;
}
export class EmbeddedSecretProofTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        recipientAddress: string;
        secret: string;
        hashAlgorithm: string;
        proof: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedSecretProofTransactionV1;
    _recipientAddress: UnresolvedAddress;
    _secret: Hash256;
    _hashAlgorithm: LockHashAlgorithm;
    _proof: Uint8Array<ArrayBuffer>;
    set recipientAddress(value: UnresolvedAddress);
    get recipientAddress(): UnresolvedAddress;
    set secret(value: Hash256);
    get secret(): Hash256;
    set hashAlgorithm(value: LockHashAlgorithm);
    get hashAlgorithm(): LockHashAlgorithm;
    set proof(value: Uint8Array<ArrayBuffer>);
    get proof(): Uint8Array<ArrayBuffer>;
}
export class AccountMetadataTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        targetAddress: string;
        value: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): AccountMetadataTransactionV1;
    _targetAddress: UnresolvedAddress;
    _scopedMetadataKey: bigint;
    _valueSizeDelta: number;
    _value: Uint8Array<ArrayBuffer>;
    set targetAddress(value: UnresolvedAddress);
    get targetAddress(): UnresolvedAddress;
    set scopedMetadataKey(value: bigint);
    get scopedMetadataKey(): bigint;
    set valueSizeDelta(value: number);
    get valueSizeDelta(): number;
    set value(value: Uint8Array<ArrayBuffer>);
    get value(): Uint8Array<ArrayBuffer>;
}
export class EmbeddedAccountMetadataTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        targetAddress: string;
        value: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedAccountMetadataTransactionV1;
    _targetAddress: UnresolvedAddress;
    _scopedMetadataKey: bigint;
    _valueSizeDelta: number;
    _value: Uint8Array<ArrayBuffer>;
    set targetAddress(value: UnresolvedAddress);
    get targetAddress(): UnresolvedAddress;
    set scopedMetadataKey(value: bigint);
    get scopedMetadataKey(): bigint;
    set valueSizeDelta(value: number);
    get valueSizeDelta(): number;
    set value(value: Uint8Array<ArrayBuffer>);
    get value(): Uint8Array<ArrayBuffer>;
}
export class MosaicMetadataTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        targetAddress: string;
        targetMosaicId: string;
        value: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): MosaicMetadataTransactionV1;
    _targetAddress: UnresolvedAddress;
    _scopedMetadataKey: bigint;
    _targetMosaicId: UnresolvedMosaicId;
    _valueSizeDelta: number;
    _value: Uint8Array<ArrayBuffer>;
    set targetAddress(value: UnresolvedAddress);
    get targetAddress(): UnresolvedAddress;
    set scopedMetadataKey(value: bigint);
    get scopedMetadataKey(): bigint;
    set targetMosaicId(value: UnresolvedMosaicId);
    get targetMosaicId(): UnresolvedMosaicId;
    set valueSizeDelta(value: number);
    get valueSizeDelta(): number;
    set value(value: Uint8Array<ArrayBuffer>);
    get value(): Uint8Array<ArrayBuffer>;
}
export class EmbeddedMosaicMetadataTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        targetAddress: string;
        targetMosaicId: string;
        value: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedMosaicMetadataTransactionV1;
    _targetAddress: UnresolvedAddress;
    _scopedMetadataKey: bigint;
    _targetMosaicId: UnresolvedMosaicId;
    _valueSizeDelta: number;
    _value: Uint8Array<ArrayBuffer>;
    set targetAddress(value: UnresolvedAddress);
    get targetAddress(): UnresolvedAddress;
    set scopedMetadataKey(value: bigint);
    get scopedMetadataKey(): bigint;
    set targetMosaicId(value: UnresolvedMosaicId);
    get targetMosaicId(): UnresolvedMosaicId;
    set valueSizeDelta(value: number);
    get valueSizeDelta(): number;
    set value(value: Uint8Array<ArrayBuffer>);
    get value(): Uint8Array<ArrayBuffer>;
}
export class NamespaceMetadataTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        targetAddress: string;
        targetNamespaceId: string;
        value: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): NamespaceMetadataTransactionV1;
    _targetAddress: UnresolvedAddress;
    _scopedMetadataKey: bigint;
    _targetNamespaceId: NamespaceId;
    _valueSizeDelta: number;
    _value: Uint8Array<ArrayBuffer>;
    set targetAddress(value: UnresolvedAddress);
    get targetAddress(): UnresolvedAddress;
    set scopedMetadataKey(value: bigint);
    get scopedMetadataKey(): bigint;
    set targetNamespaceId(value: NamespaceId);
    get targetNamespaceId(): NamespaceId;
    set valueSizeDelta(value: number);
    get valueSizeDelta(): number;
    set value(value: Uint8Array<ArrayBuffer>);
    get value(): Uint8Array<ArrayBuffer>;
}
export class EmbeddedNamespaceMetadataTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        targetAddress: string;
        targetNamespaceId: string;
        value: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedNamespaceMetadataTransactionV1;
    _targetAddress: UnresolvedAddress;
    _scopedMetadataKey: bigint;
    _targetNamespaceId: NamespaceId;
    _valueSizeDelta: number;
    _value: Uint8Array<ArrayBuffer>;
    set targetAddress(value: UnresolvedAddress);
    get targetAddress(): UnresolvedAddress;
    set scopedMetadataKey(value: bigint);
    get scopedMetadataKey(): bigint;
    set targetNamespaceId(value: NamespaceId);
    get targetNamespaceId(): NamespaceId;
    set valueSizeDelta(value: number);
    get valueSizeDelta(): number;
    set value(value: Uint8Array<ArrayBuffer>);
    get value(): Uint8Array<ArrayBuffer>;
}
export class MosaicNonce extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): MosaicNonce;
    static deserializeAligned(payload: any): MosaicNonce;
    constructor(mosaicNonce?: number);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class MosaicFlags {
    static NONE: MosaicFlags;
    static SUPPLY_MUTABLE: MosaicFlags;
    static TRANSFERABLE: MosaicFlags;
    static RESTRICTABLE: MosaicFlags;
    static REVOKABLE: MosaicFlags;
    static deserialize(payload: any): MosaicFlags;
    static deserializeAligned(payload: any): MosaicFlags;
    constructor(value: any);
    value: any;
    has(flag: any): boolean;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    toJson(): any;
}
export class MosaicSupplyChangeAction {
    static DECREASE: MosaicSupplyChangeAction;
    static INCREASE: MosaicSupplyChangeAction;
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
export class MosaicDefinitionTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        id: string;
        duration: string;
        nonce: string;
        flags: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): MosaicDefinitionTransactionV1;
    _id: MosaicId;
    _duration: BlockDuration;
    _nonce: MosaicNonce;
    _flags: MosaicFlags;
    _divisibility: number;
    set id(value: MosaicId);
    get id(): MosaicId;
    set duration(value: BlockDuration);
    get duration(): BlockDuration;
    set nonce(value: MosaicNonce);
    get nonce(): MosaicNonce;
    set flags(value: MosaicFlags);
    get flags(): MosaicFlags;
    set divisibility(value: number);
    get divisibility(): number;
}
export class EmbeddedMosaicDefinitionTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        id: string;
        duration: string;
        nonce: string;
        flags: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedMosaicDefinitionTransactionV1;
    _id: MosaicId;
    _duration: BlockDuration;
    _nonce: MosaicNonce;
    _flags: MosaicFlags;
    _divisibility: number;
    set id(value: MosaicId);
    get id(): MosaicId;
    set duration(value: BlockDuration);
    get duration(): BlockDuration;
    set nonce(value: MosaicNonce);
    get nonce(): MosaicNonce;
    set flags(value: MosaicFlags);
    get flags(): MosaicFlags;
    set divisibility(value: number);
    get divisibility(): number;
}
export class MosaicSupplyChangeTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        mosaicId: string;
        delta: string;
        action: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): MosaicSupplyChangeTransactionV1;
    _mosaicId: UnresolvedMosaicId;
    _delta: Amount;
    _action: MosaicSupplyChangeAction;
    set mosaicId(value: UnresolvedMosaicId);
    get mosaicId(): UnresolvedMosaicId;
    set delta(value: Amount);
    get delta(): Amount;
    set action(value: MosaicSupplyChangeAction);
    get action(): MosaicSupplyChangeAction;
}
export class EmbeddedMosaicSupplyChangeTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        mosaicId: string;
        delta: string;
        action: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedMosaicSupplyChangeTransactionV1;
    _mosaicId: UnresolvedMosaicId;
    _delta: Amount;
    _action: MosaicSupplyChangeAction;
    set mosaicId(value: UnresolvedMosaicId);
    get mosaicId(): UnresolvedMosaicId;
    set delta(value: Amount);
    get delta(): Amount;
    set action(value: MosaicSupplyChangeAction);
    get action(): MosaicSupplyChangeAction;
}
export class MosaicSupplyRevocationTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        sourceAddress: string;
        mosaic: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): MosaicSupplyRevocationTransactionV1;
    _sourceAddress: UnresolvedAddress;
    _mosaic: UnresolvedMosaic;
    set sourceAddress(value: UnresolvedAddress);
    get sourceAddress(): UnresolvedAddress;
    set mosaic(value: UnresolvedMosaic);
    get mosaic(): UnresolvedMosaic;
}
export class EmbeddedMosaicSupplyRevocationTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        sourceAddress: string;
        mosaic: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedMosaicSupplyRevocationTransactionV1;
    _sourceAddress: UnresolvedAddress;
    _mosaic: UnresolvedMosaic;
    set sourceAddress(value: UnresolvedAddress);
    get sourceAddress(): UnresolvedAddress;
    set mosaic(value: UnresolvedMosaic);
    get mosaic(): UnresolvedMosaic;
}
export class MultisigAccountModificationTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        addressAdditions: string;
        addressDeletions: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): MultisigAccountModificationTransactionV1;
    _minRemovalDelta: number;
    _minApprovalDelta: number;
    _addressAdditions: any[];
    _addressDeletions: any[];
    _multisigAccountModificationTransactionBodyReserved_1: number;
    set minRemovalDelta(value: number);
    get minRemovalDelta(): number;
    set minApprovalDelta(value: number);
    get minApprovalDelta(): number;
    set addressAdditions(value: any[]);
    get addressAdditions(): any[];
    set addressDeletions(value: any[]);
    get addressDeletions(): any[];
}
export class EmbeddedMultisigAccountModificationTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        addressAdditions: string;
        addressDeletions: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedMultisigAccountModificationTransactionV1;
    _minRemovalDelta: number;
    _minApprovalDelta: number;
    _addressAdditions: any[];
    _addressDeletions: any[];
    _multisigAccountModificationTransactionBodyReserved_1: number;
    set minRemovalDelta(value: number);
    get minRemovalDelta(): number;
    set minApprovalDelta(value: number);
    get minApprovalDelta(): number;
    set addressAdditions(value: any[]);
    get addressAdditions(): any[];
    set addressDeletions(value: any[]);
    get addressDeletions(): any[];
}
export class AddressAliasTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        namespaceId: string;
        address: string;
        aliasAction: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): AddressAliasTransactionV1;
    _namespaceId: NamespaceId;
    _address: Address;
    _aliasAction: AliasAction;
    set namespaceId(value: NamespaceId);
    get namespaceId(): NamespaceId;
    set address(value: Address);
    get address(): Address;
    set aliasAction(value: AliasAction);
    get aliasAction(): AliasAction;
}
export class EmbeddedAddressAliasTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        namespaceId: string;
        address: string;
        aliasAction: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedAddressAliasTransactionV1;
    _namespaceId: NamespaceId;
    _address: Address;
    _aliasAction: AliasAction;
    set namespaceId(value: NamespaceId);
    get namespaceId(): NamespaceId;
    set address(value: Address);
    get address(): Address;
    set aliasAction(value: AliasAction);
    get aliasAction(): AliasAction;
}
export class MosaicAliasTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        namespaceId: string;
        mosaicId: string;
        aliasAction: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): MosaicAliasTransactionV1;
    _namespaceId: NamespaceId;
    _mosaicId: MosaicId;
    _aliasAction: AliasAction;
    set namespaceId(value: NamespaceId);
    get namespaceId(): NamespaceId;
    set mosaicId(value: MosaicId);
    get mosaicId(): MosaicId;
    set aliasAction(value: AliasAction);
    get aliasAction(): AliasAction;
}
export class EmbeddedMosaicAliasTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        namespaceId: string;
        mosaicId: string;
        aliasAction: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedMosaicAliasTransactionV1;
    _namespaceId: NamespaceId;
    _mosaicId: MosaicId;
    _aliasAction: AliasAction;
    set namespaceId(value: NamespaceId);
    get namespaceId(): NamespaceId;
    set mosaicId(value: MosaicId);
    get mosaicId(): MosaicId;
    set aliasAction(value: AliasAction);
    get aliasAction(): AliasAction;
}
export class NamespaceRegistrationTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        duration: string;
        parentId: string;
        id: string;
        registrationType: string;
        name: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): NamespaceRegistrationTransactionV1;
    _duration: BlockDuration;
    _parentId: any;
    _id: NamespaceId;
    _registrationType: NamespaceRegistrationType;
    _name: Uint8Array<ArrayBuffer>;
    set duration(value: BlockDuration);
    get duration(): BlockDuration;
    set parentId(value: any);
    get parentId(): any;
    set id(value: NamespaceId);
    get id(): NamespaceId;
    set registrationType(value: NamespaceRegistrationType);
    get registrationType(): NamespaceRegistrationType;
    set name(value: Uint8Array<ArrayBuffer>);
    get name(): Uint8Array<ArrayBuffer>;
}
export class EmbeddedNamespaceRegistrationTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        duration: string;
        parentId: string;
        id: string;
        registrationType: string;
        name: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedNamespaceRegistrationTransactionV1;
    _duration: BlockDuration;
    _parentId: any;
    _id: NamespaceId;
    _registrationType: NamespaceRegistrationType;
    _name: Uint8Array<ArrayBuffer>;
    set duration(value: BlockDuration);
    get duration(): BlockDuration;
    set parentId(value: any);
    get parentId(): any;
    set id(value: NamespaceId);
    get id(): NamespaceId;
    set registrationType(value: NamespaceRegistrationType);
    get registrationType(): NamespaceRegistrationType;
    set name(value: Uint8Array<ArrayBuffer>);
    get name(): Uint8Array<ArrayBuffer>;
}
export class AccountRestrictionFlags {
    static ADDRESS: AccountRestrictionFlags;
    static MOSAIC_ID: AccountRestrictionFlags;
    static TRANSACTION_TYPE: AccountRestrictionFlags;
    static OUTGOING: AccountRestrictionFlags;
    static BLOCK: AccountRestrictionFlags;
    static deserialize(payload: any): AccountRestrictionFlags;
    static deserializeAligned(payload: any): AccountRestrictionFlags;
    constructor(value: any);
    value: any;
    has(flag: any): boolean;
    get size(): number;
    serialize(): Uint8Array<ArrayBufferLike>;
    toString(): string;
    toJson(): any;
}
export class AccountAddressRestrictionTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        restrictionFlags: string;
        restrictionAdditions: string;
        restrictionDeletions: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): AccountAddressRestrictionTransactionV1;
    _restrictionFlags: AccountRestrictionFlags;
    _restrictionAdditions: any[];
    _restrictionDeletions: any[];
    _accountRestrictionTransactionBodyReserved_1: number;
    set restrictionFlags(value: AccountRestrictionFlags);
    get restrictionFlags(): AccountRestrictionFlags;
    set restrictionAdditions(value: any[]);
    get restrictionAdditions(): any[];
    set restrictionDeletions(value: any[]);
    get restrictionDeletions(): any[];
}
export class EmbeddedAccountAddressRestrictionTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        restrictionFlags: string;
        restrictionAdditions: string;
        restrictionDeletions: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedAccountAddressRestrictionTransactionV1;
    _restrictionFlags: AccountRestrictionFlags;
    _restrictionAdditions: any[];
    _restrictionDeletions: any[];
    _accountRestrictionTransactionBodyReserved_1: number;
    set restrictionFlags(value: AccountRestrictionFlags);
    get restrictionFlags(): AccountRestrictionFlags;
    set restrictionAdditions(value: any[]);
    get restrictionAdditions(): any[];
    set restrictionDeletions(value: any[]);
    get restrictionDeletions(): any[];
}
export class AccountMosaicRestrictionTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        restrictionFlags: string;
        restrictionAdditions: string;
        restrictionDeletions: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): AccountMosaicRestrictionTransactionV1;
    _restrictionFlags: AccountRestrictionFlags;
    _restrictionAdditions: any[];
    _restrictionDeletions: any[];
    _accountRestrictionTransactionBodyReserved_1: number;
    set restrictionFlags(value: AccountRestrictionFlags);
    get restrictionFlags(): AccountRestrictionFlags;
    set restrictionAdditions(value: any[]);
    get restrictionAdditions(): any[];
    set restrictionDeletions(value: any[]);
    get restrictionDeletions(): any[];
}
export class EmbeddedAccountMosaicRestrictionTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        restrictionFlags: string;
        restrictionAdditions: string;
        restrictionDeletions: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedAccountMosaicRestrictionTransactionV1;
    _restrictionFlags: AccountRestrictionFlags;
    _restrictionAdditions: any[];
    _restrictionDeletions: any[];
    _accountRestrictionTransactionBodyReserved_1: number;
    set restrictionFlags(value: AccountRestrictionFlags);
    get restrictionFlags(): AccountRestrictionFlags;
    set restrictionAdditions(value: any[]);
    get restrictionAdditions(): any[];
    set restrictionDeletions(value: any[]);
    get restrictionDeletions(): any[];
}
export class AccountOperationRestrictionTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        restrictionFlags: string;
        restrictionAdditions: string;
        restrictionDeletions: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): AccountOperationRestrictionTransactionV1;
    _restrictionFlags: AccountRestrictionFlags;
    _restrictionAdditions: any[];
    _restrictionDeletions: any[];
    _accountRestrictionTransactionBodyReserved_1: number;
    set restrictionFlags(value: AccountRestrictionFlags);
    get restrictionFlags(): AccountRestrictionFlags;
    set restrictionAdditions(value: any[]);
    get restrictionAdditions(): any[];
    set restrictionDeletions(value: any[]);
    get restrictionDeletions(): any[];
}
export class EmbeddedAccountOperationRestrictionTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        restrictionFlags: string;
        restrictionAdditions: string;
        restrictionDeletions: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedAccountOperationRestrictionTransactionV1;
    _restrictionFlags: AccountRestrictionFlags;
    _restrictionAdditions: any[];
    _restrictionDeletions: any[];
    _accountRestrictionTransactionBodyReserved_1: number;
    set restrictionFlags(value: AccountRestrictionFlags);
    get restrictionFlags(): AccountRestrictionFlags;
    set restrictionAdditions(value: any[]);
    get restrictionAdditions(): any[];
    set restrictionDeletions(value: any[]);
    get restrictionDeletions(): any[];
}
export class MosaicAddressRestrictionTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        mosaicId: string;
        targetAddress: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): MosaicAddressRestrictionTransactionV1;
    _mosaicId: UnresolvedMosaicId;
    _restrictionKey: bigint;
    _previousRestrictionValue: bigint;
    _newRestrictionValue: bigint;
    _targetAddress: UnresolvedAddress;
    set mosaicId(value: UnresolvedMosaicId);
    get mosaicId(): UnresolvedMosaicId;
    set restrictionKey(value: bigint);
    get restrictionKey(): bigint;
    set previousRestrictionValue(value: bigint);
    get previousRestrictionValue(): bigint;
    set newRestrictionValue(value: bigint);
    get newRestrictionValue(): bigint;
    set targetAddress(value: UnresolvedAddress);
    get targetAddress(): UnresolvedAddress;
}
export class EmbeddedMosaicAddressRestrictionTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        mosaicId: string;
        targetAddress: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedMosaicAddressRestrictionTransactionV1;
    _mosaicId: UnresolvedMosaicId;
    _restrictionKey: bigint;
    _previousRestrictionValue: bigint;
    _newRestrictionValue: bigint;
    _targetAddress: UnresolvedAddress;
    set mosaicId(value: UnresolvedMosaicId);
    get mosaicId(): UnresolvedMosaicId;
    set restrictionKey(value: bigint);
    get restrictionKey(): bigint;
    set previousRestrictionValue(value: bigint);
    get previousRestrictionValue(): bigint;
    set newRestrictionValue(value: bigint);
    get newRestrictionValue(): bigint;
    set targetAddress(value: UnresolvedAddress);
    get targetAddress(): UnresolvedAddress;
}
export class MosaicRestrictionKey extends BaseValue {
    static SIZE: number;
    static deserialize(payload: any): MosaicRestrictionKey;
    static deserializeAligned(payload: any): MosaicRestrictionKey;
    constructor(mosaicRestrictionKey?: bigint);
    serialize(): Uint8Array<ArrayBufferLike>;
}
export class MosaicRestrictionType {
    static NONE: MosaicRestrictionType;
    static EQ: MosaicRestrictionType;
    static NE: MosaicRestrictionType;
    static LT: MosaicRestrictionType;
    static LE: MosaicRestrictionType;
    static GT: MosaicRestrictionType;
    static GE: MosaicRestrictionType;
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
export class MosaicGlobalRestrictionTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        mosaicId: string;
        referenceMosaicId: string;
        previousRestrictionType: string;
        newRestrictionType: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): MosaicGlobalRestrictionTransactionV1;
    _mosaicId: UnresolvedMosaicId;
    _referenceMosaicId: UnresolvedMosaicId;
    _restrictionKey: bigint;
    _previousRestrictionValue: bigint;
    _newRestrictionValue: bigint;
    _previousRestrictionType: MosaicRestrictionType;
    _newRestrictionType: MosaicRestrictionType;
    set mosaicId(value: UnresolvedMosaicId);
    get mosaicId(): UnresolvedMosaicId;
    set referenceMosaicId(value: UnresolvedMosaicId);
    get referenceMosaicId(): UnresolvedMosaicId;
    set restrictionKey(value: bigint);
    get restrictionKey(): bigint;
    set previousRestrictionValue(value: bigint);
    get previousRestrictionValue(): bigint;
    set newRestrictionValue(value: bigint);
    get newRestrictionValue(): bigint;
    set previousRestrictionType(value: MosaicRestrictionType);
    get previousRestrictionType(): MosaicRestrictionType;
    set newRestrictionType(value: MosaicRestrictionType);
    get newRestrictionType(): MosaicRestrictionType;
}
export class EmbeddedMosaicGlobalRestrictionTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        mosaicId: string;
        referenceMosaicId: string;
        previousRestrictionType: string;
        newRestrictionType: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedMosaicGlobalRestrictionTransactionV1;
    _mosaicId: UnresolvedMosaicId;
    _referenceMosaicId: UnresolvedMosaicId;
    _restrictionKey: bigint;
    _previousRestrictionValue: bigint;
    _newRestrictionValue: bigint;
    _previousRestrictionType: MosaicRestrictionType;
    _newRestrictionType: MosaicRestrictionType;
    set mosaicId(value: UnresolvedMosaicId);
    get mosaicId(): UnresolvedMosaicId;
    set referenceMosaicId(value: UnresolvedMosaicId);
    get referenceMosaicId(): UnresolvedMosaicId;
    set restrictionKey(value: bigint);
    get restrictionKey(): bigint;
    set previousRestrictionValue(value: bigint);
    get previousRestrictionValue(): bigint;
    set newRestrictionValue(value: bigint);
    get newRestrictionValue(): bigint;
    set previousRestrictionType(value: MosaicRestrictionType);
    get previousRestrictionType(): MosaicRestrictionType;
    set newRestrictionType(value: MosaicRestrictionType);
    get newRestrictionType(): MosaicRestrictionType;
}
export class TransferTransactionV1 extends Transaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        recipientAddress: string;
        mosaics: string;
        message: string;
        signature: string;
        signerPublicKey: string;
        network: string;
        type: string;
        fee: string;
        deadline: string;
    };
    static deserialize(payload: any): TransferTransactionV1;
    _recipientAddress: UnresolvedAddress;
    _mosaics: any[];
    _message: Uint8Array<ArrayBuffer>;
    _transferTransactionBodyReserved_1: number;
    _transferTransactionBodyReserved_2: number;
    set recipientAddress(value: UnresolvedAddress);
    get recipientAddress(): UnresolvedAddress;
    set mosaics(value: any[]);
    get mosaics(): any[];
    set message(value: Uint8Array<ArrayBuffer>);
    get message(): Uint8Array<ArrayBuffer>;
}
export class EmbeddedTransferTransactionV1 extends EmbeddedTransaction {
    static TRANSACTION_VERSION: number;
    static TRANSACTION_TYPE: TransactionType;
    static TYPE_HINTS: {
        recipientAddress: string;
        mosaics: string;
        message: string;
        signerPublicKey: string;
        network: string;
        type: string;
    };
    static deserialize(payload: any): EmbeddedTransferTransactionV1;
    _recipientAddress: UnresolvedAddress;
    _mosaics: any[];
    _message: Uint8Array<ArrayBuffer>;
    _transferTransactionBodyReserved_1: number;
    _transferTransactionBodyReserved_2: number;
    set recipientAddress(value: UnresolvedAddress);
    get recipientAddress(): UnresolvedAddress;
    set mosaics(value: any[]);
    get mosaics(): any[];
    set message(value: Uint8Array<ArrayBuffer>);
    get message(): Uint8Array<ArrayBuffer>;
}
export class TransactionFactory {
    static toKey(values: any): any;
    static deserialize(payload: any): any;
    static createByName(entityName: any): any;
}
export class EmbeddedTransactionFactory {
    static toKey(values: any): any;
    static deserialize(payload: any): any;
    static createByName(entityName: any): any;
}
export class BlockFactory {
    static toKey(values: any): any;
    static deserialize(payload: any): any;
    static createByName(entityName: any): any;
}
export class ReceiptFactory {
    static toKey(values: any): any;
    static deserialize(payload: any): any;
    static createByName(entityName: any): any;
}
import BaseValue from '../BaseValue.js';
import ByteArray from '../ByteArray.js';
