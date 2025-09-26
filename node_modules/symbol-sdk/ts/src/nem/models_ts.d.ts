/**
 * Type safe descriptor used to generate a descriptor map for AccountKeyLinkTransactionV1Descriptor.
 *
 * binary layout for an account key link transaction (V1, latest)
 */
export class AccountKeyLinkTransactionV1Descriptor {
    /**
     * Creates a descriptor for AccountKeyLinkTransactionV1.
     * @param {models.LinkAction} linkAction link action
     * @param {PublicKey} remotePublicKey public key of remote account to which importance should be transferred
     */
    constructor(linkAction: models.LinkAction, remotePublicKey: PublicKey);
    rawDescriptor: {
        type: string;
        linkAction: models.LinkAction;
        remotePublicKey: PublicKey;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for NamespaceIdDescriptor.
 *
 * binary layout for a namespace id
 */
export class NamespaceIdDescriptor {
    /**
     * Creates a descriptor for NamespaceId.
     * @param {Uint8Array|string|undefined} name name
     */
    constructor(name?: Uint8Array | string | undefined);
    rawDescriptor: {};
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for MosaicIdDescriptor.
 *
 * binary layout for a mosaic id
 */
export class MosaicIdDescriptor {
    /**
     * Creates a descriptor for MosaicId.
     * @param {NamespaceIdDescriptor} namespaceId namespace id
     * @param {Uint8Array|string|undefined} name name
     */
    constructor(namespaceId: NamespaceIdDescriptor, name?: Uint8Array | string | undefined);
    rawDescriptor: {
        namespaceId: any;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for MosaicDescriptor.
 *
 * binary layout for a mosaic
 */
export class MosaicDescriptor {
    /**
     * Creates a descriptor for Mosaic.
     * @param {MosaicIdDescriptor} mosaicId mosaic id
     * @param {models.Amount} amount quantity
     */
    constructor(mosaicId: MosaicIdDescriptor, amount: models.Amount);
    rawDescriptor: {
        mosaicId: any;
        amount: models.Amount;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for SizePrefixedMosaicDescriptor.
 *
 * binary layout for a mosaic with a size prefixed size
 */
export class SizePrefixedMosaicDescriptor {
    /**
     * Creates a descriptor for SizePrefixedMosaic.
     * @param {MosaicDescriptor} mosaic mosaic
     */
    constructor(mosaic: MosaicDescriptor);
    rawDescriptor: {
        mosaic: any;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for MosaicLevyDescriptor.
 *
 * binary layout for a mosaic levy
 */
export class MosaicLevyDescriptor {
    /**
     * Creates a descriptor for MosaicLevy.
     * @param {models.MosaicTransferFeeType} transferFeeType mosaic fee type
     * @param {Address} recipientAddress recipient address
     * @param {MosaicIdDescriptor} mosaicId levy mosaic id
     * @param {models.Amount} fee amount of levy mosaic to transfer
     */
    constructor(transferFeeType: models.MosaicTransferFeeType, recipientAddress: Address, mosaicId: MosaicIdDescriptor, fee: models.Amount);
    rawDescriptor: {
        transferFeeType: models.MosaicTransferFeeType;
        recipientAddress: Address;
        mosaicId: any;
        fee: models.Amount;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for MosaicPropertyDescriptor.
 *
 * binary layout for a mosaic property supported property names are: divisibility, initialSupply, supplyMutable, transferable
 */
export class MosaicPropertyDescriptor {
    /**
     * Creates a descriptor for MosaicProperty.
     * @param {Uint8Array|string|undefined} name property name
     * @param {Uint8Array|string|undefined} value property value
     */
    constructor(name?: Uint8Array | string | undefined, value?: Uint8Array | string | undefined);
    rawDescriptor: {};
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for SizePrefixedMosaicPropertyDescriptor.
 *
 * binary layout for a size prefixed mosaic property
 */
export class SizePrefixedMosaicPropertyDescriptor {
    /**
     * Creates a descriptor for SizePrefixedMosaicProperty.
     * @param {MosaicPropertyDescriptor} property property value
     */
    constructor(property: MosaicPropertyDescriptor);
    rawDescriptor: {
        property: any;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for MosaicDefinitionDescriptor.
 *
 * binary layout for a mosaic definition
 */
export class MosaicDefinitionDescriptor {
    /**
     * Creates a descriptor for MosaicDefinition.
     * @param {PublicKey} ownerPublicKey owner public key
     * @param {MosaicIdDescriptor} id mosaic id referenced by this definition
     * @param {Uint8Array|string|undefined} description description
     * @param {SizePrefixedMosaicPropertyDescriptor[]|undefined} properties properties
     * @param {MosaicLevyDescriptor|undefined} levy optional levy that is applied to transfers of this mosaic
     */
    constructor(ownerPublicKey: PublicKey, id: MosaicIdDescriptor, description?: Uint8Array | string | undefined, properties?: SizePrefixedMosaicPropertyDescriptor[] | undefined, levy?: MosaicLevyDescriptor | undefined);
    rawDescriptor: {
        ownerPublicKey: PublicKey;
        id: any;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for MosaicDefinitionTransactionV1Descriptor.
 *
 * binary layout for a mosaic definition transaction (V1, latest)
 */
export class MosaicDefinitionTransactionV1Descriptor {
    /**
     * Creates a descriptor for MosaicDefinitionTransactionV1.
     * @param {MosaicDefinitionDescriptor} mosaicDefinition mosaic definition
     * @param {Address} rentalFeeSink mosaic rental fee sink public key
     * @param {models.Amount} rentalFee mosaic rental fee
     */
    constructor(mosaicDefinition: MosaicDefinitionDescriptor, rentalFeeSink: Address, rentalFee: models.Amount);
    rawDescriptor: {
        type: string;
        mosaicDefinition: any;
        rentalFeeSink: Address;
        rentalFee: models.Amount;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for MosaicSupplyChangeTransactionV1Descriptor.
 *
 * binary layout for a mosaic supply change transaction (V1, latest)
 */
export class MosaicSupplyChangeTransactionV1Descriptor {
    /**
     * Creates a descriptor for MosaicSupplyChangeTransactionV1.
     * @param {MosaicIdDescriptor} mosaicId mosaic id
     * @param {models.MosaicSupplyChangeAction} action supply change action
     * @param {models.Amount} delta change amount
     */
    constructor(mosaicId: MosaicIdDescriptor, action: models.MosaicSupplyChangeAction, delta: models.Amount);
    rawDescriptor: {
        type: string;
        mosaicId: any;
        action: models.MosaicSupplyChangeAction;
        delta: models.Amount;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for MultisigAccountModificationDescriptor.
 *
 * binary layout for a multisig account modification
 */
export class MultisigAccountModificationDescriptor {
    /**
     * Creates a descriptor for MultisigAccountModification.
     * @param {models.MultisigAccountModificationType} modificationType modification type
     * @param {PublicKey} cosignatoryPublicKey cosignatory public key
     */
    constructor(modificationType: models.MultisigAccountModificationType, cosignatoryPublicKey: PublicKey);
    rawDescriptor: {
        modificationType: models.MultisigAccountModificationType;
        cosignatoryPublicKey: PublicKey;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for SizePrefixedMultisigAccountModificationDescriptor.
 *
 * binary layout for a multisig account modification prefixed with size
 */
export class SizePrefixedMultisigAccountModificationDescriptor {
    /**
     * Creates a descriptor for SizePrefixedMultisigAccountModification.
     * @param {MultisigAccountModificationDescriptor} modification modification
     */
    constructor(modification: MultisigAccountModificationDescriptor);
    rawDescriptor: {
        modification: any;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for MultisigAccountModificationTransactionV1Descriptor.
 *
 * binary layout for a multisig account modification transaction (V1)
 */
export class MultisigAccountModificationTransactionV1Descriptor {
    /**
     * Creates a descriptor for MultisigAccountModificationTransactionV1.
     * @param {SizePrefixedMultisigAccountModificationDescriptor[]|undefined} modifications multisig account modifications
     */
    constructor(modifications?: SizePrefixedMultisigAccountModificationDescriptor[] | undefined);
    rawDescriptor: {
        type: string;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for MultisigAccountModificationTransactionV2Descriptor.
 *
 * binary layout for a multisig account modification transaction (V2, latest)
 */
export class MultisigAccountModificationTransactionV2Descriptor {
    /**
     * Creates a descriptor for MultisigAccountModificationTransactionV2.
     * @param {number} minApprovalDelta relative change of the minimal number of cosignatories required when approving a transaction
     * @param {SizePrefixedMultisigAccountModificationDescriptor[]|undefined} modifications multisig account modifications
     */
    constructor(minApprovalDelta: number, modifications?: SizePrefixedMultisigAccountModificationDescriptor[] | undefined);
    rawDescriptor: {
        type: string;
        minApprovalDelta: number;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for CosignatureV1BodyDescriptor.
 *
 * shared content between V1 verifiable and non-verifiable cosignature transactions
 */
export class CosignatureV1BodyDescriptor {
    /**
     * Creates a descriptor for CosignatureV1Body.
     * @param {Hash256} otherTransactionHash other transaction hash
     * @param {Address} multisigAccountAddress multisig account address
     */
    constructor(otherTransactionHash: Hash256, multisigAccountAddress: Address);
    rawDescriptor: {
        otherTransactionHash: Hash256;
        multisigAccountAddress: Address;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for CosignatureV1Descriptor.
 *
 * binary layout for a cosignature transaction (V1, latest)
 */
export class CosignatureV1Descriptor {
    /**
     * Creates a descriptor for CosignatureV1.
     * @param {Hash256} otherTransactionHash other transaction hash
     * @param {Address} multisigAccountAddress multisig account address
     */
    constructor(otherTransactionHash: Hash256, multisigAccountAddress: Address);
    rawDescriptor: {
        type: string;
        otherTransactionHash: Hash256;
        multisigAccountAddress: Address;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for SizePrefixedCosignatureV1Descriptor.
 *
 * cosignature attached to a multisig transaction with prefixed size
 */
export class SizePrefixedCosignatureV1Descriptor {
    /**
     * Creates a descriptor for SizePrefixedCosignatureV1.
     * @param {CosignatureV1Descriptor} cosignature cosignature
     */
    constructor(cosignature: CosignatureV1Descriptor);
    rawDescriptor: {
        cosignature: any;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for MultisigTransactionV1Descriptor.
 *
 * binary layout for a multisig transaction (V1, latest)
 */
export class MultisigTransactionV1Descriptor {
    /**
     * Creates a descriptor for MultisigTransactionV1.
     * @param {models.NonVerifiableTransaction} innerTransaction inner transaction
     * @param {SizePrefixedCosignatureV1Descriptor[]|undefined} cosignatures cosignatures
     */
    constructor(innerTransaction: models.NonVerifiableTransaction, cosignatures?: SizePrefixedCosignatureV1Descriptor[] | undefined);
    rawDescriptor: {
        type: string;
        innerTransaction: models.NonVerifiableTransaction;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for NamespaceRegistrationTransactionV1Descriptor.
 *
 * binary layout for a namespace registration transaction (V1, latest)
 */
export class NamespaceRegistrationTransactionV1Descriptor {
    /**
     * Creates a descriptor for NamespaceRegistrationTransactionV1.
     * @param {Address} rentalFeeSink mosaic rental fee sink public key
     * @param {models.Amount} rentalFee mosaic rental fee
     * @param {Uint8Array|string|undefined} name new namespace name
     * @param {Uint8Array|string|undefined} parentName parent namespace name
     */
    constructor(rentalFeeSink: Address, rentalFee: models.Amount, name?: Uint8Array | string | undefined, parentName?: Uint8Array | string | undefined);
    rawDescriptor: {
        type: string;
        rentalFeeSink: Address;
        rentalFee: models.Amount;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for MessageDescriptor.
 *
 * binary layout for a message
 */
export class MessageDescriptor {
    /**
     * Creates a descriptor for Message.
     * @param {models.MessageType} messageType message type
     * @param {Uint8Array|string|undefined} message message payload
     */
    constructor(messageType: models.MessageType, message?: Uint8Array | string | undefined);
    rawDescriptor: {
        messageType: models.MessageType;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for TransferTransactionV1Descriptor.
 *
 * binary layout for a transfer transaction (V1)
 */
export class TransferTransactionV1Descriptor {
    /**
     * Creates a descriptor for TransferTransactionV1.
     * @param {Address} recipientAddress recipient address
     * @param {models.Amount} amount XEM amount
     * @param {MessageDescriptor|undefined} message optional message
     */
    constructor(recipientAddress: Address, amount: models.Amount, message?: MessageDescriptor | undefined);
    rawDescriptor: {
        type: string;
        recipientAddress: Address;
        amount: models.Amount;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
/**
 * Type safe descriptor used to generate a descriptor map for TransferTransactionV2Descriptor.
 *
 * binary layout for a transfer transaction (V2, latest)
 */
export class TransferTransactionV2Descriptor {
    /**
     * Creates a descriptor for TransferTransactionV2.
     * @param {Address} recipientAddress recipient address
     * @param {models.Amount} amount XEM amount
     * @param {MessageDescriptor|undefined} message optional message
     * @param {SizePrefixedMosaicDescriptor[]|undefined} mosaics attached mosaics notice that mosaic amount is multipled by transfer amount to get effective amount
     */
    constructor(recipientAddress: Address, amount: models.Amount, message?: MessageDescriptor | undefined, mosaics?: SizePrefixedMosaicDescriptor[] | undefined);
    rawDescriptor: {
        type: string;
        recipientAddress: Address;
        amount: models.Amount;
    };
    /**
     * Builds a representation of this descriptor that can be passed to a factory function.
     * @returns {object} Descriptor that can be passed to a factory function.
     */
    toMap(): object;
}
import * as models from './models.js';
import { PublicKey } from '../CryptoTypes.js';
import { Address } from './Network.js';
import { Hash256 } from '../CryptoTypes.js';
