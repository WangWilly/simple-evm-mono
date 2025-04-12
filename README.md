# Simple EVM Mono

## [Lerna](https://lerna.js.org/docs/lerna-and-nx) build and run

```bash
# Install dependencies
npm install

# Build the project
npx lerna run build
npx lerna run build:sol --scope contracts

# Run the project
npx lerna run start
npx lerna run start --scope {backend|contracts}

# Run tests
npx lerna run test --scope contracts
```

References:
- https://ethereum.stackexchange.com/questions/123172/proper-project-structure-for-react-hardhat-typechain

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
