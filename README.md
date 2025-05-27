# Etherscan MCP Server

A Model Context Protocol (MCP) server that provides tools for querying Ethereum blockchain data through the Etherscan API. This server enables AI assistants like Claude to interact with Ethereum blockchain data including account balances, transactions, smart contracts, and token information.

## Features

- **Account Operations**: Get ETH balances, transaction lists, and ERC20/ERC721 token transfers
- **Contract Information**: Retrieve contract ABIs, source code, and execution status
- **Block Data**: Access block rewards, transaction counts, and timestamps
- **Token Analytics**: Query token supplies, balances, and holder information
- **Event Logs**: Search and filter blockchain event logs
- **Multi-chain Support**: Works with Ethereum mainnet and testnets

## Installation

```bash
npm install @aura/etherscan-mcp
```

## Usage

### CLI Server (Recommended)

Run the MCP server directly with npx:

```bash
npx @aura/etherscan-mcp
```

This starts a stdio-based MCP server that can be used with Claude Desktop or other MCP clients.

### Claude Desktop Configuration

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "etherscan": {
      "command": "npx",
      "args": ["-y", "@aurracloud/etherscan-mcp"],
      "env": {
        "ETHERSCAN_API_KEY": "ETHERSCAN_API_KEY_GOES_HERE"
      }
    }
  }
}
```

### Programmatic Usage

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerEtherscanMcpTools } from "@aura/etherscan-mcp";

const server = new McpServer({
  name: "etherscan-server",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {},
  },
});

// Register Etherscan tools
registerEtherscanMcpTools(server);

// Create transport and connect
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Environment Variables

Set your Etherscan API key:

```bash
export ETHERSCAN_API_KEY=your_api_key_here
```

## Available Tools

### Account Tools
- `ETHERSCAN_getEthBalance` - Get ETH balance for an address
- `ETHERSCAN_getEthBalanceMulti` - Get ETH balances for multiple addresses
- `ETHERSCAN_getListOfTxs` - Get transaction list for an address
- `ETHERSCAN_getErc20TransfersByAddress` - Get ERC20 token transfers

### Contract Tools
- `ETHERSCAN_getContractABI` - Get contract ABI
- `ETHERSCAN_getContractSourceCode` - Get contract source code
- `ETHERSCAN_getContractExecutionStatus` - Get transaction execution status

### Block Tools
- `ETHERSCAN_getBlockAndUncleRewardByBlockNo` - Get block rewards

### Token Tools
- `ETHERSCAN_getErc20TokenSupply` - Get ERC20 token total supply
- `ETHERSCAN_getErc20TokenBalance` - Get ERC20 token balance for address
- `ETHERSCAN_getTokenHolderList` - Get list of token holders

### Log Tools
- `ETHERSCAN_getEventLogsByAddress` - Get event logs for an address

## Chain Support

The server supports multiple Ethereum networks:
- Ethereum Mainnet (chainId: 1)
- Goerli Testnet (chainId: 5)
- Sepolia Testnet (chainId: 11155111)

## API Key

You'll need an Etherscan API key to use this server. Get one for free at [etherscan.io/apis](https://etherscan.io/apis).

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please use the [GitHub Issues](https://github.com/aura/etherscan-mcp/issues) page. 