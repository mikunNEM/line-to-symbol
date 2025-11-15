export default ed25519;
declare namespace ed25519 {
    function keyPairFromSeed(hashMode: any, seed: any): {
        publicKey: Uint8Array<ArrayBuffer>;
        secretKey: Uint8Array<ArrayBuffer>;
    };
    function sign(hashMode: any, message: any, keyPair: any): Uint8Array<ArrayBuffer>;
    function verify(hashMode: any, message: any, signature: any, publicKey: any): boolean;
}
