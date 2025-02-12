module g_bucks::gatekeeper_helper {
    use sui::ed25519;
    use sui::tx_context::TxContext;

    // Admin public key
    const ADMIN_PUBKEY: vector<u8> = vector[  
         86, 236, 228, 122, 158, 190, 250,  50,
    121, 154, 235, 148, 176, 115,  50,  13,
     55, 177,   7, 201,  80,  15, 153, 207,
    150,  81,  80, 211,  87, 181, 231,  54


    ];

    // Error codes
    const ESignatureNotVerified: u64 = 1001;

    /// Function to verify a signature against a given message
    public fun test_function(
        signature: vector<u8>,
        msg: vector<u8>,
        _ctx: &mut TxContext
    ) {
        let verified = ed25519::ed25519_verify(&signature, &ADMIN_PUBKEY, &msg);
        assert!(verified, ESignatureNotVerified);

        // Function logic goes here
    }
}
