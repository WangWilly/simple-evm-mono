import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("MessageStore", function () {
  async function deployMessageStoreFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const MessageStore = await hre.ethers.getContractFactory("MessageStore");
    const messageStore = await MessageStore.deploy();

    await messageStore.deployed();

    return { messageStore, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should successfully deploy the contract", async function () {
      const { messageStore } = await loadFixture(
        deployMessageStoreFixture
      );

      expect(messageStore.address).to.properAddress;
    });
  });

  describe("Store Message", function () {
    it("Should allow the owner to store a message", async function () {
      const { messageStore, owner } = await loadFixture(
        deployMessageStoreFixture
      );
      const message = "Hello, Ethereum!";

      await expect(messageStore.connect(owner).storeMessage(message))
        .to.emit(messageStore, "MessageStored")
        .withArgs(message);
      expect(await messageStore.retrieveMessage()).to.equal(message);
    });

    it("Should revert if a non-owner tries to store a message", async function () {
      const { messageStore, otherAccount } = await loadFixture(
        deployMessageStoreFixture
      );
      const message = "Unauthorized message";

      await expect(
        messageStore.connect(otherAccount).storeMessage(message)
      ).to.be.revertedWith("Only the owner can perform this action");
    });

    it("Should revert if the message is empty", async function () {
      const { messageStore, owner } = await loadFixture(
        deployMessageStoreFixture
      );

      await expect(
        messageStore.connect(owner).storeMessage("")
      ).to.be.revertedWith("Message cannot be empty");
    });
  });

  describe("Retrieve Message", function () {
    it("Should retrieve the stored message", async function () {
      const { messageStore, owner } = await loadFixture(
        deployMessageStoreFixture
      );
      const message = "Hello, Blockchain!";

      await messageStore.connect(owner).storeMessage(message);

      expect(await messageStore.retrieveMessage()).to.equal(message);
    });

    it("Should return an empty string if no message is stored", async function () {
      const { messageStore } = await loadFixture(deployMessageStoreFixture);

      expect(await messageStore.retrieveMessage()).to.equal("");
    });
  });
});
