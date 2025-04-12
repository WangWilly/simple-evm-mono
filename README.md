# Simple EVM Mono

## [Lerna](https://lerna.js.org/docs/lerna-and-nx) build and run

```bash
# Install dependencies
npm install

# Build the project
npx lerna run build --scope backend
npx lerna run build:sol --scope contracts

# Run the project
npx lerna run start --scope backend

# Run tests
npx lerna run test --scope contracts
```

References:

- https://ethereum.stackexchange.com/questions/123172/proper-project-structure-for-react-hardhat-typechain

## Tests

Fill in the `template.env` file with your own values and create a `.env` file. Then run the following command to start the local server:

```bash
npx lerna run build --scope backend
npx lerna run start --scope backend
```

### Store message

Command to run the test:

```bash
curl --location 'http://localhost:3000/api/store-message' \
--header 'Content-Type: application/json' \
--data '{
    "message": "test"
}'
```

Response:

```json
{
  "success": true,
  "transactionHash": "0xc713af8fc6a077db39ee53dda58140151fc8b833f386ab301034dcd7f6bd44ad"
}
```

### Get message

Command to run the test:

```bash
curl --location 'http://localhost:3000/api/retrieve-message' \
--data ''
```

Response:

```json
{
  "message": "test"
}
```

## Common [Lerna](https://lerna.js.org/docs/lerna-and-nx) commands

```bash
# Add a dependency to all packages
npm install <dependency> -w <package>
npm install <dependency> -w <package1> -w <package2>

# Run a command in all packages
npx lerna run <command>

# Run a command in a specific package
npx lerna run <command> --scope <package-name>
```

References:

- https://lerna.js.org/docs/legacy-package-management#replacing-your-usage-of-lerna-add

## Hardhat

- https://hardhat.org/tutorial/creating-a-new-hardhat-project#3.-creating-a-new-hardhat-project
- https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity
- https://hardhat.org/tutorial/deploying-to-a-live-network
