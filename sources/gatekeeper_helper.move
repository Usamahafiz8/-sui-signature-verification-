module g_bucks::gatekeeper_helper {
    use sui::ed25519;
    use sui::tx_context::TxContext;

    // Admin public key
    const ADMIN_PUBKEY: vector<u8> = vector[  
     29,  25,  39, 192, 168, 245, 134, 74,
    150,  75,  38, 131, 150, 180,   9, 24,
    176, 249, 100,  84,  26, 216,  50, 81,
     92,  75, 155,  23,  65, 117, 128,  1

    ];

    // Error codes
    const ESignatureNotVerified: u64 = 1;

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


