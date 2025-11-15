export default nacl;
declare namespace nacl {
    namespace lowlevel {
        export { crypto_hash };
        export { gf };
        export { L };
        export { Z };
        export { modL };
        export { scalarmult };
        export { neq25519 };
        export { par25519 };
        export { inv25519 };
        export { pack };
        export { unpackneg };
    }
    function sign(msg: any, secretKey: any, hasher: any): Uint8Array<any>;
    namespace sign {
        function detached(msg: any, secretKey: any, hasher: any): Uint8Array<ArrayBuffer>;
        namespace detached {
            function verify(msg: any, sig: any, publicKey: any, hasher: any): boolean;
        }
        namespace keyPair {
            function fromSeed(seed: any, hasher: any): {
                publicKey: Uint8Array<ArrayBuffer>;
                secretKey: Uint8Array<ArrayBuffer>;
            };
        }
    }
}
declare function crypto_hash(out: any, m: any, n: any, hasher: any): number;
declare function gf(init: any): Float64Array<ArrayBuffer>;
declare var L: Float64Array<ArrayBuffer>;
declare function Z(o: any, a: any, b: any): void;
declare function modL(r: any, x: any): void;
declare function scalarmult(p: any, q: any, s: any): void;
declare function neq25519(a: any, b: any): number;
declare function par25519(a: any): number;
declare function inv25519(o: any, i: any): void;
declare function pack(r: any, p: any): void;
declare function unpackneg(r: any, p: any): 0 | -1;
