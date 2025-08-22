#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="certs"
CN="localhost"
DAYS=94
BACKEND_DIR=""

mkdir -p "$OUT_DIR"
cd "$OUT_DIR"

#minimal OpenSSL config to incluse SANs
cat > dev-openssl.cnf <<EOF
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
C = ZA
ST = KZN
L = Durban
O = IIE VC
OU = DN 
CN = $CN

[v3_req]
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
EOF

#filenames
KEY_FILE="server.key"
CSR_FILE="server.csr"
CRT_FILE="server.crt"

#generate private key
openssl genrsa -out "$KEY_FILE" 2048

#create csr - signing request
openssl req -new -key "$KEY_FILE" -out "$CSR_FILE" -config dev-openssl.cnf

#self-sign cert with SANs - alt names (localhost)
openssl x509 -req -in "$CSR_FILE" -signkey "$KEY_FILE" -out "$CRT_FILE" -days "$DAYS" -extensions v3_req -extfile dev-openssl.cnf

#lock private key permissions with chmod
chmod 600 "$KEY_FILE"

#save working directory for output
BACKEND_DIR="$(pwd -P)"

#copy over to frontend/certs
cd ../../Frontend
mkdir -p "$OUT_DIR"
cd "$OUT_DIR"

cp -v "$BACKEND_DIR/$KEY_FILE" "$BACKEND_DIR/$CRT_FILE" .

#print summary
echo "Dev certs generated in "$BACKEND_DIR" and $(pwd):"
ls -l "$KEY_FILE" "$CRT_FILE"
echo
echo "Use these in Node as: (should already be committed)"
echo "  key: fs.readFileSync('./$OUT_DIR/$KEY_FILE')"
echo "  cert: fs.readFileSync('./$OUT_DIR/$CRT_FILE')"
echo
echo "Copy key and crt to certs folder in Frontend (should already be copied)"
echo
echo "If you want the browser to NOT warn, see mkcert instructions below."
echo
echo "To trust your cert and remove warnings:
- Press Win + R, type certmgr.msc, and press Enter.
- Expand Trusted Root Certification Authorities and select Certificates.
- Right-click in the right pane, select All Tasks > Import...
- Import ssl/cert.pem as a certificate file.
- Make sure the certificate store is Trusted Root Certification Authorities.
- Finish the wizard, accept warnings, and restart your browser."
