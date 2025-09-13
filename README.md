## Setup Instructions ~Kiro
- Clone the Repo
- Open it in VS code
- Use CMD Prompt and split the terminal
- cd into backend and frontend folders respectively
- Run npm ci in both folders - this will clean install and restore all node_modules
```
# Terminal 1
cd backend
npm ci

# Terminal 2
cd frontend
npm ci
```

- Open a Bash terminal and cd into Backend
- Run ./scripts/init-dev-certs.sh
```
# In Bash
cd backend
./scripts/init-dev-certs.sh
```
This will execute a bash script that generates and self-signs TLS certs inside a certs directory.
