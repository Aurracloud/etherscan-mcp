import { z } from "zod";
import * as etherscanApi from "./api.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

/**
 * Register Etherscan tools with an MCP server, calling API functions directly.
 * @param server The MCP server instance to register tools with
 */
export function registerEtherscanMcpTools(server: McpServer) {
  // Define parameter schemas inline
  const schemas = {
    getEthBalance: z.object({
      address: z.string().describe("The address to check balance for."),
      chainId: z.number().optional().default(1).describe("The chain ID (default: 1 for Ethereum Mainnet)."),
    }),

    getEthBalanceMulti: z.object({
      addresses: z.array(z.string()).describe("An array of addresses to check balances for."),
      chainId: z.number().optional().default(1).describe("The chain ID (default: 1 for Ethereum Mainnet)."),
    }),

    getListOfTxs: z.object({
      address: z.string().describe("The address to get transactions for."),
      chainId: z.number().optional().default(1).describe("The chain ID."),
      startBlock: z.number().optional().default(0).describe("The starting block number."),
      endBlock: z.number().optional().default(99999999).describe("The ending block number."),
      page: z.number().optional().default(1).describe("The page number for pagination."),
      offset: z.number().optional().default(0).describe("The number of transactions per page."),
      sort: z.string().optional().default("asc").describe("The sorting preference (asc or desc)."),
    }),

    getErc20TransfersByAddress: z.object({
      address: z.string().describe("The address to get ERC20 transfers for."),
      contractAddress: z.string().optional().describe("The contract address of the ERC20 token."),
      chainId: z.number().optional().default(1).describe("The chain ID."),
      startBlock: z.number().optional().default(0).describe("The starting block number."),
      endBlock: z.number().optional().default(99999999).describe("The ending block number."),
      page: z.number().optional().default(1).describe("The page number for pagination."),
      offset: z.number().optional().default(0).describe("The number of transactions per page."),
      sort: z.string().optional().default("asc").describe("The sorting preference (asc or desc)."),
    }),

    getContractABI: z.object({
      address: z.string().describe("The contract address."),
      chainId: z.number().optional().default(1).describe("The chain ID."),
    }),

    getContractSourceCode: z.object({
      address: z.string().describe("The contract address."),
      chainId: z.number().optional().default(1).describe("The chain ID."),
    }),

    getContractExecutionStatus: z.object({
      txHash: z.string().describe("The transaction hash."),
      chainId: z.number().optional().default(1).describe("The chain ID."),
    }),

    getBlockAndUncleRewardByBlockNo: z.object({
      blockNo: z.number().describe("The block number."),
      chainId: z.number().optional().default(1).describe("The chain ID."),
    }),

    getEventLogsByAddress: z.object({
      address: z.string().describe("The address to get logs for."),
      chainId: z.number().optional().default(1).describe("The chain ID."),
      startBlock: z.number().optional().default(0).describe("The starting block number."),
      endBlock: z.number().optional().default(99999999).describe("The ending block number (set to 'latest' for most recent)."),
      page: z.number().optional().default(1).describe("The page number for pagination."),
      offset: z.number().optional().default(0).describe("The number of records per page."),
    }),

    getErc20TokenSupply: z.object({
      contractAddress: z.string().describe("The contract address of the ERC20 token."),
      chainId: z.number().optional().default(1).describe("The chain ID."),
    }),

    getErc20TokenBalance: z.object({
      contractAddress: z.string().describe("The contract address of the ERC20 token."),
      address: z.string().describe("The address to check balance for."),
      chainId: z.number().optional().default(1).describe("The chain ID."),
    }),

    getTokenHolderList: z.object({
      contractAddress: z.string().describe("The contract address of the ERC20 token."),
      chainId: z.number().optional().default(1).describe("The chain ID."),
      page: z.number().optional().default(1).describe("The page number for pagination."),
      offset: z.number().optional().default(10).describe("The number of records per page."),
    }),
  };

  const mcpTools = {
    // Accounts API Tools
    getEthBalance: server.tool(
      "ETHERSCAN_getEthBalance",
      "Get Ether balance for a single address.",
      schemas.getEthBalance.shape,
      async ({ address, chainId }) => {
        try {
          const result = await etherscanApi.etherscanAccountsApi.getEthBalance(address, chainId);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: "text", text: `Error in ETHERSCAN_getEthBalance: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
        }
      }
    ),

    getEthBalanceMulti: server.tool(
      "ETHERSCAN_getEthBalanceMulti",
      "Get Ether balance for multiple addresses in a single call.",
      schemas.getEthBalanceMulti.shape,
      async ({ addresses, chainId }) => {
        try {
          const result = await etherscanApi.etherscanAccountsApi.getEthBalanceMulti(addresses, chainId);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: "text", text: `Error in ETHERSCAN_getEthBalanceMulti: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
        }
      }
    ),

    getListOfTxs: server.tool(
      "ETHERSCAN_getListOfTxs",
      "Get a list of normal transactions for an address.",
      schemas.getListOfTxs.shape,
      async ({ address, chainId, startBlock, endBlock, page, offset, sort }) => {
        try {
          const result = await etherscanApi.etherscanAccountsApi.getListOfTxs(address, chainId, startBlock, endBlock, page, offset, sort);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: "text", text: `Error in ETHERSCAN_getListOfTxs: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
        }
      }
    ),

    getErc20TransfersByAddress: server.tool(
      "ETHERSCAN_getErc20TransfersByAddress",
      "Get ERC20 token transfer events by address.",
      schemas.getErc20TransfersByAddress.shape,
      async ({ address, contractAddress, chainId, startBlock, endBlock, page, offset, sort }) => {
        try {
          const result = await etherscanApi.etherscanAccountsApi.getErc20TransfersByAddress(address, contractAddress, chainId, startBlock, endBlock, page, offset, sort);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: "text", text: `Error in ETHERSCAN_getErc20TransfersByAddress: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
        }
      }
    ),

    // Contracts API Tools
    getContractABI: server.tool(
      "ETHERSCAN_getContractABI",
      "Get the ABI of a verified contract.",
      schemas.getContractABI.shape,
      async ({ address, chainId }) => {
        try {
          const result = await etherscanApi.etherscanContractsApi.getContractABI(address, chainId);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: "text", text: `Error in ETHERSCAN_getContractABI: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
        }
      }
    ),

    getContractSourceCode: server.tool(
      "ETHERSCAN_getContractSourceCode",
      "Get the source code of a verified contract.",
      schemas.getContractSourceCode.shape,
      async ({ address, chainId }) => {
        try {
          const result = await etherscanApi.etherscanContractsApi.getContractSourceCode(address, chainId);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: "text", text: `Error in ETHERSCAN_getContractSourceCode: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
        }
      }
    ),

    // Transactions API Tools
    getContractExecutionStatus: server.tool(
      "ETHERSCAN_getContractExecutionStatus",
      "Get the status of a contract execution transaction.",
      schemas.getContractExecutionStatus.shape,
      async ({ txHash, chainId }) => {
        try {
          const result = await etherscanApi.etherscanTransactionsApi.getContractExecutionStatus(txHash, chainId);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: "text", text: `Error in ETHERSCAN_getContractExecutionStatus: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
        }
      }
    ),

    // Blocks API Tools
    getBlockAndUncleRewardByBlockNo: server.tool(
      "ETHERSCAN_getBlockAndUncleRewardByBlockNo",
      "Get block and uncle rewards by block number.",
      schemas.getBlockAndUncleRewardByBlockNo.shape,
      async ({ blockNo, chainId }) => {
        try {
          const result = await etherscanApi.etherscanBlocksApi.getBlockAndUncleRewardByBlockNo(blockNo, chainId);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: "text", text: `Error in ETHERSCAN_getBlockAndUncleRewardByBlockNo: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
        }
      }
    ),

    // Logs API Tools
    getEventLogsByAddress: server.tool(
      "ETHERSCAN_getEventLogsByAddress",
      "Get event logs by address.",
      schemas.getEventLogsByAddress.shape,
      async ({ address, chainId, startBlock, endBlock, page, offset }) => {
        try {
          const result = await etherscanApi.etherscanLogsApi.getEventLogsByAddress(address, chainId, startBlock, endBlock, page, offset);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: "text", text: `Error in ETHERSCAN_getEventLogsByAddress: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
        }
      }
    ),

    // Tokens API Tools 
    getErc20TokenSupply: server.tool(
      "ETHERSCAN_getErc20TokenSupply",
      "Get the total supply of an ERC20 token.",
      schemas.getErc20TokenSupply.shape,
      async ({ contractAddress, chainId }) => {
        try {
          const result = await etherscanApi.etherscanTokensApi.getErc20TokenSupply(contractAddress, chainId);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: "text", text: `Error in ETHERSCAN_getErc20TokenSupply: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
        }
      }
    ),

    getErc20TokenBalance: server.tool(
      "ETHERSCAN_getErc20TokenBalance",
      "Get the balance of an ERC20 token for a specific address.",
      schemas.getErc20TokenBalance.shape,
      async ({ contractAddress, address, chainId }) => {
        try {
          const result = await etherscanApi.etherscanTokensApi.getErc20TokenBalance(contractAddress, address, chainId);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: "text", text: `Error in ETHERSCAN_getErc20TokenBalance: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
        }
      }
    ),

    getTokenHolderList: server.tool(
      "ETHERSCAN_getTokenHolderList",
      "Get a list of token holders for an ERC20 token.",
      schemas.getTokenHolderList.shape,
      async ({ contractAddress, chainId, page, offset }) => {
        try {
          const result = await etherscanApi.etherscanTokensApi.getTokenHolderList(contractAddress, chainId, page, offset);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: "text", text: `Error in ETHERSCAN_getTokenHolderList: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
        }
      }
    ),
  };

  return mcpTools;
} 