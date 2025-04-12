import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MessageStoreModule = buildModule("MessageStoreModule", (m) => {
  const messageStore = m.contract("MessageStore", [], {});

  return { messageStore };
});

export default MessageStoreModule;
