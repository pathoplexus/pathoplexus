#!/bin/bash

set -Eeuo pipefail

# Prints SQL that adds the fixed staging signing key as an imported RSA key provider of the
# loculus realm. Usage: ./staging-key-sql.sh staging-keycloak-key.pem (see README.md)

KEY_FILE="$1"

# Prints the base64 body of a PEM block (e.g. "PRIVATE KEY") in the key file on one line,
# which is how Keycloak stores keys
pem_body() {
    awk -v label="$1" '$0 == "-----END " label "-----" { f = 0 } f { printf "%s", $0 } $0 == "-----BEGIN " label "-----" { f = 1 }' "$KEY_FILE"
}

cat <<EOF
INSERT INTO public.component (id, name, parent_id, provider_id, provider_type, realm_id)
SELECT 'staging-fixed-rsa', 'staging-fixed-rsa', id, 'rsa', 'org.keycloak.keys.KeyProvider', id
FROM public.realm WHERE name = 'loculus';
INSERT INTO public.component_config (id, component_id, name, value) VALUES
    ('staging-fixed-rsa-private-key', 'staging-fixed-rsa', 'privateKey', '$(pem_body "PRIVATE KEY")'),
    ('staging-fixed-rsa-certificate', 'staging-fixed-rsa', 'certificate', '$(pem_body "CERTIFICATE")'),
    ('staging-fixed-rsa-priority', 'staging-fixed-rsa', 'priority', '100'),
    ('staging-fixed-rsa-algorithm', 'staging-fixed-rsa', 'algorithm', 'RS256'),
    ('staging-fixed-rsa-enabled', 'staging-fixed-rsa', 'enabled', 'true'),
    ('staging-fixed-rsa-active', 'staging-fixed-rsa', 'active', 'true');
EOF
