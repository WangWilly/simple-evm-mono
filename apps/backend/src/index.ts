import * as dotenv from "dotenv";

import express, { Request, Response } from "express";
import { ethers } from "ethers";

import { Logger, ILogObj } from "tslog";
import path from "path";

////////////////////////////////////////////////////////////////////////////////

const logger: Logger<ILogObj> = new Logger();

////////////////////////////////////////////////////////////////////////////////

// Load environment variables from .env file
dotenv.config();

const mainAppConfigs = {
  PORT: parseInt(process.env.PORT || "3000", 10),
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || "",
  PRIVATE_KEY: process.env.PRIVATE_KEY || "",
  PROVIDER_URL: process.env.PROVIDER_URL || "http://127.0.0.1:8545",
};

// Check if required environment variables are set
if (!mainAppConfigs.CONTRACT_ADDRESS) {
  throw new Error("CONTRACT_ADDRESS is not set in .env file");
}
if (!mainAppConfigs.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not set in .env file");
}

logger.info(
  `Using provider URL: ${mainAppConfigs.PROVIDER_URL}, contract address: ${mainAppConfigs.CONTRACT_ADDRESS}`
);

////////////////////////////////////////////////////////////////////////////////

// TODO: https://docs.ethers.org/v5/api/utils/abi/formats/
// TODO: https://ethereum.stackexchange.com/questions/131400/how-to-get-abi-of-deployed-contract-using-ethersjs-in-hardhat
// ABI of the MessageStore contract
const CONTRACT_ABI: string[] = [
  "function storeMessage(string newMessage) external",
  "function retrieveMessage() external view returns (string)",
  "event MessageStored(string newMessage)",
];

////////////////////////////////////////////////////////////////////////////////

const app = express();
app.use(express.json());

// Serve static files from the "public" directory
const publicDir = path.join(__dirname, "public");
// logger.info(`Serving static files from ${publicDir}`);
app.use(express.static(publicDir));

// Middleware to logger all incoming requests
app.use((req, res, next) => {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Initialize ethers.js
const provider: ethers.providers.JsonRpcProvider =
  new ethers.providers.JsonRpcProvider(mainAppConfigs.PROVIDER_URL);
const wallet: ethers.Wallet = new ethers.Wallet(
  mainAppConfigs.PRIVATE_KEY,
  provider
);
const contract: ethers.Contract = new ethers.Contract(
  mainAppConfigs.CONTRACT_ADDRESS,
  CONTRACT_ABI,
  wallet
);

////////////////////////////////////////////////////////////////////////////////

// GET /ping
app.get("/ping", async (req: Request, res: Response): Promise<void> => {
  logger.info("Handling /ping endpoint");
  res.json({ message: "pong" });
});

// POST /api/store-message
app.post(
  "/api/store-message",
  async (req: Request, res: Response): Promise<void> => {
    logger.info("Handling /api/store-message endpoint");
    try {
      const { message }: { message: string } = req.body;
      if (!message || typeof message !== "string") {
        logger.error("Invalid message received");
        res.status(400).json({ error: "Invalid message" });
        return;
      }

      const tx: ethers.providers.TransactionResponse =
        await contract.storeMessage(message);
      logger.info(`Transaction sent: ${tx.hash}`);
      await tx.wait();

      res.json({ success: true, transactionHash: tx.hash });
    } catch (error: unknown) {
      console.error("Error storing message:", error);
      res.status(500).json({ error: "Failed to store message" });
    }
  }
);

// GET /api/retrieve-message
app.get(
  "/api/retrieve-message",
  async (req: Request, res: Response): Promise<void> => {
    logger.info("Handling /api/retrieve-message endpoint");
    try {
      const message: string = await contract.retrieveMessage();
      logger.info(`Retrieved message: ${message}`);
      res.json({ message });
    } catch (error: unknown) {
      logger.error("Error retrieving message:", error);
      res.status(500).json({ error: "Failed to retrieve message" });
    }
  }
);

////////////////////////////////////////////////////////////////////////////////

app.listen(mainAppConfigs.PORT, (): void => {
  logger.info(`Server is running on http://localhost:${mainAppConfigs.PORT}`);
  logger.info(
    `http://localhost:${mainAppConfigs.PORT}/ping to check if the server is alive`
  );
});
