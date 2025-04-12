import express, { Request, Response } from "express";
import { ethers } from "ethers";
import * as dotenv from "dotenv";

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

console.log(
  `Using provider URL: ${mainAppConfigs.PROVIDER_URL}, contract address: ${mainAppConfigs.CONTRACT_ADDRESS}`
);

////////////////////////////////////////////////////////////////////////////////

// ABI of the MessageStore contract
const CONTRACT_ABI: string[] = [
  "function storeMessage(string newMessage) external",
  "function retrieveMessage() external view returns (string)",
  "event MessageStored(string newMessage)",
];

////////////////////////////////////////////////////////////////////////////////

const app = express();
app.use(express.json());

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

// POST /api/store-message
app.post(
  "/api/store-message",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { message }: { message: string } = req.body;
      if (!message || typeof message !== "string") {
        res.status(400).json({ error: "Invalid message" });
        return;
      }

      const tx: ethers.providers.TransactionResponse =
        await contract.storeMessage(message);
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
    try {
      const message: string = await contract.retrieveMessage();
      res.json({ message });
    } catch (error: unknown) {
      console.error("Error retrieving message:", error);
      res.status(500).json({ error: "Failed to retrieve message" });
    }
  }
);

////////////////////////////////////////////////////////////////////////////////

app.listen(mainAppConfigs.PORT, (): void => {
  console.log(`Server is running on http://localhost:${mainAppConfigs.PORT}`);
});
