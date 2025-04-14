# Simple EVM Mono

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Ethereum](https://img.shields.io/badge/Ethereum-Enabled-brightgreen.svg)

A monorepo solution for Ethereum Virtual Machine (EVM) development with integrated tooling for smart contracts and backend services.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
  - [API Endpoints](#api-endpoints)
- [Package Management](#package-management)
- [Resources](#resources)

## Overview

This monorepo uses Lerna to manage multiple packages for EVM development, including smart contracts and backend services. The architecture promotes code reuse and maintains a consistent development environment across all project components.

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)

### Installation

```bash
# Install dependencies
npm install
```

## Development Workflow

Before start, create a `.env` file based on the provided `template.env` file with your configuration values. Then start the local server:

```bash
# Run the project in development mode
npx lerna run dev --scope backend

# Build the project
npx lerna run build --scope backend
npx lerna run build:sol --scope contracts

# Run the project
npx lerna run start --scope backend

# Run tests
npx lerna run test --scope contracts
```

## Testing

Before testing, create a `.env` file based on the provided `template.env` file with your configuration values. Then start the local server:

```bash
npx lerna run build --scope backend
npx lerna run start --scope backend
```

### API Endpoints

#### Store Message

**Request:**

```bash
curl --location 'http://localhost:3000/api/store-message' \
--header 'Content-Type: application/json' \
--data '{
    "message": "test"
}'
```

**Response:**

```json
{
  "success": true,
  "transactionHash": "0xc713af8fc6a077db39ee53dda58140151fc8b833f386ab301034dcd7f6bd44ad"
}
```

#### Retrieve Message

**Request:**

```bash
curl --location 'http://localhost:3000/api/retrieve-message' \
--data ''
```

**Response:**

```json
{
  "message": "test"
}
```

## Package Management

```bash
# Add a dependency to specific packages
npm install <dependency> -w <package>
npm install <dependency> -w <package1> -w <package2>

# Run a command in all packages
npx lerna run <command>

# Run a command in a specific package
npx lerna run <command> --scope <package-name>
```

## Resources

- [Project Structure for React + Hardhat + TypeChain](https://ethereum.stackexchange.com/questions/123172/proper-project-structure-for-react-hardhat-typechain)
- [Lerna Documentation](https://lerna.js.org/docs/lerna-and-nx)
- [Lerna Package Management](https://lerna.js.org/docs/legacy-package-management#replacing-your-usage-of-lerna-add)
- [Hardhat Project Setup](https://hardhat.org/tutorial/creating-a-new-hardhat-project#3.-creating-a-new-hardhat-project)
- [Hardhat Solidity VS Code Extension](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity)
- [Hardhat Live Network Deployment](https://hardhat.org/tutorial/deploying-to-a-live-network)
