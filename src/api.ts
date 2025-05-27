import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://api.etherscan.io/v2/api";

const API_KEY = process.env.ETHERSCAN_API_KEY;

if (!API_KEY) {
  throw new Error("ETHERSCAN_API_KEY is not set");
}

export const etherscanAccountsApi = {
  getEthBalance: async (address: string, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`);
    return response.json();
  },

  getEthBalanceMulti: async (addresses: string[], chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=balancemulti&address=${addresses.join(',')}&tag=latest&apikey=${API_KEY}`);
    return response.json();
  },

  getListOfTxs: async (address: string, chainId: number = 1, startBlock: number = 0, endBlock: number = 99999999, page: number = 1, offset: number = 0, sort: string = "asc") => {
    const url = `${BASE_URL}?chainid=${chainId.toString()}&module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${API_KEY}`;
    console.log(url);
    const response = await fetch(url);
    return response.json();
  },

  getInternalTxs: async (address: string, chainId: number = 1, startBlock: number = 0, endBlock: number = 99999999, page: number = 1, offset: number = 0, sort: string = "asc") => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=txlistinternal&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${API_KEY}`);
    return response.json();
  },

  getInternalTxsByTxHash: async (txHash: string, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=txlistinternal&txhash=${txHash}&apikey=${API_KEY}`);
    return response.json();
  },

  getInternalTxsByBlockRange: async (startBlock: number, endBlock: number, chainId: number = 1, page: number = 1, offset: number = 0, sort: string = "asc") => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=txlistinternal&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${API_KEY}`);
    return response.json();
  },
  
  getErc20TransfersByAddress: async (address: string, contractAddress?: string, chainId: number = 1, startBlock: number = 0, endBlock: number = 99999999, page: number = 1, offset: number = 0, sort: string = "asc") => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=tokentx&address=${address}&contractaddress=${contractAddress}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${API_KEY}`);
    return response.json();
  },

  getErc721TransfersByAddress: async (address: string, contractAddress?: string, chainId: number = 1, startBlock: number = 0, endBlock: number = 99999999, page: number = 1, offset: number = 0, sort: string = "asc") => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=tokennfttx&address=${address}&contractaddress=${contractAddress}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${API_KEY}`);
    return response.json();
  },

  getErc1155TransfersByAddress: async (address: string, contractAddress?: string, chainId: number = 1, startBlock: number = 0, endBlock: number = 99999999, page: number = 1, offset: number = 0, sort: string = "asc") => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=tokennfttx&address=${address}&contractaddress=${contractAddress}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${API_KEY}`);
    return response.json();
  },

  getAddressFundedBy: async (address: string, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=fundedby&address=${address}&apikey=${API_KEY}`);
    return response.json();
  },

  getBlocksValidatedByAddress: async (address: string, chainId: number = 1, blockType: string = "blocks", page: number = 1, offset: number = 0) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=getminedblocks&address=${address}&blocktype=${blockType}&page=${page}&offset=${offset}&apikey=${API_KEY}`);
    return response.json();
  },

  getBeaconChainWithdrawals: async (address: string, chainId: number = 1, page: number = 1, offset: number = 0, sort: string = "asc") => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=txsBeaconWithdrawal&address=${address}&page=${page}&offset=${offset}&sort=${sort}&apikey=${API_KEY}`);
    return response.json();
  }
};

export const etherscanContractsApi = {
  getContractABI: async (address: string, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=contract&action=getabi&address=${address}&apikey=${API_KEY}`);
    return response.json();
  },

  getContractSourceCode: async (address: string, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=contract&action=getsourcecode&address=${address}&apikey=${API_KEY}`);
    return response.json();
  },

  getContractsCreators: async (contractAddresses: string[], chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=contract&action=getcontractcreation&contractaddresses=${contractAddresses.join(',')}&apikey=${API_KEY}`);
    return response.json();
  },

  verifySolidityCode: async (chainId: number = 1, codeFormat: "solidity-single-file" | "solidity-standard-json-input" = "solidity-single-file", sourceCode: string, constructorArgs: string, contractAddress: string, contractName: string, compilerVersion: string) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=contract&action=verifysourcecode&apikey=${API_KEY}`, {
    method: "POST",
    body: JSON.stringify({
      codeformat: codeFormat,
      sourceCode: sourceCode,
      constructorArguements: constructorArgs,
      contractaddress: contractAddress,
      contractname: contractName,
      compilerversion: compilerVersion
    })
   });
    return response.json();
  },
  verifyVyperCode: async (chainId: number = 1, codeFormat: "vyper-single-file" | "vyper-standard-json-input" = "vyper-single-file", sourceCode: string, constructorArgs: string, contractAddress: string, contractName: string, compilerVersion: string) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=contract&action=verifysourcecode&apikey=${API_KEY}`, {
    method: "POST",
    body: JSON.stringify({
      codeformat: codeFormat,
      sourceCode: sourceCode,
      constructorArguements: constructorArgs,
      contractaddress: contractAddress,
      contractname: contractName,
      compilerversion: compilerVersion
    })
   });
    return response.json();
  },

  getSourceCodeVerificationStatus: async (guid: string, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=contract&action=checkverifystatus&guid=${guid}&apikey=${API_KEY}`);
    return response.json();
  },

  verifyProxyContract: async (chainId: number = 1, contractAddress: string, expectedImplementation?: string) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=contract&action=verifyproxycontract&address=${contractAddress}&expectedimplementation=${expectedImplementation}&apikey=${API_KEY}`, {
    method: "POST",
    body: JSON.stringify({
      address: contractAddress,
      expectedimplementation: expectedImplementation
    })
   });
    return response.json();
  }
};

export const etherscanTransactionsApi = {
  getContractExecutionStatus: async (txHash: string, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=transaction&action=getstatus&txhash=${txHash}&apikey=${API_KEY}`);
    return response.json();
  },
  getTransactionReceiptStatus: async (txHash: string, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${API_KEY}`);
    return response.json();
  }
};

export const etherscanBlocksApi = {
  getBlockAndUncleRewardByBlockNo: async (blockNo: number, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=block&action=getblockreward&blockno=${blockNo}&apikey=${API_KEY}`);
    return response.json();
  },
  getBlockTxCountByBlockNo: async (blockNo: number, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=block&action=getblocktxnscount&blockno=${blockNo}&apikey=${API_KEY}`);
    return response.json();
  },
  getBlockCountdownByBlockNo: async (blockNo: number, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=block&action=getblockcountdown&blockno=${blockNo}&apikey=${API_KEY}`);
    return response.json();
  },
  getBlockNumberByTimestamp: async (timestamp: number, closest: "before" | "after" = "before", chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=block&action=getblocknobytime&timestamp=${timestamp}&closest=${closest}&apikey=${API_KEY}`);
    return response.json();
  }
};

export const etherscanLogsApi = {
  getEventLogsByAddress: async (address: string, chainId: number = 1, startBlock: number = 0, endBlock: number = 99999999, page: number = 1, offset: number = 0) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=logs&action=getLogs&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&apikey=${API_KEY}`);
    return response.json();
  },
  getEventLogsByTopics: async (fromBlock: number, toBlock: number, topics: number[], topicOperator: "and" | "or" = "and", chainId: number = 1, page: number = 1, offset: number = 0) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=logs&action=getLogs&fromblock=${fromBlock}&toblock=${toBlock}&topic0=${topics[0]}&topic1=${topics[1]}&topic2=${topics[2]}&topic3=${topics[3]}&topicoperator=${topicOperator}&page=${page}&offset=${offset}&apikey=${API_KEY}`);
    return response.json();
  },
};

export const etherscanTokensApi = {
  getErc20TokenSupply: async (contractAddress: string, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=token&action=tokensupply&contractaddress=${contractAddress}&apikey=${API_KEY}`);
    return response.json();
  },
  getErc20TokenBalance: async (contractAddress: string, address: string, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=token&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${API_KEY}`);
    return response.json();
  },

  getErc20TokenSupplyHistory: async (contractAddress: string, blockNo: number, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=stats&action=tokensupplyhistory&contractaddress=${contractAddress}&blockno=${blockNo}&apikey=${API_KEY}`);
    return response.json();
  },

  getErc20TokenBalanceHistory: async (contractAddress: string, address: string, blockNo: number, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=tokenbalancehistory&contractaddress=${contractAddress}&address=${address}&blockno=${blockNo}&apikey=${API_KEY}`);
    return response.json();
  },

  getTokenHolderList: async (contractAddress: string, chainId: number = 1, page: number = 1, offset: number = 10) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=token&action=tokenholderlist&contractaddress=${contractAddress}&page=${page}&offset=${offset}&apikey=${API_KEY}`);
    return response.json();
  },

  getTokenHolderCount: async (contractAddress: string, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=token&action=tokenholdercount&contractaddress=${contractAddress}&apikey=${API_KEY}`);
    return response.json();
  },

  getTokenInfo: async (contractAddress: string, chainId: number = 1) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=token&action=tokeninfo&contractaddress=${contractAddress}&apikey=${API_KEY}`);
    return response.json();
  },

  getAddressErc20TokenHolding: async (address: string, chainId: number = 1, page: number = 1, offset: number = 100) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=addresstokenbalance&address=${address}&page=${page}&offset=${offset}&apikey=${API_KEY}`);
    return response.json();
  },

  getAddressErc721TokenHolding: async (address: string, chainId: number = 1, page: number = 1, offset: number = 100) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=addresstokennftbalance&address=${address}&page=${page}&offset=${offset}&apikey=${API_KEY}`);
    return response.json();
  },

  getAddressErc721TokenInventory: async (address: string, contractAddress: string, chainId: number = 1, page: number = 1, offset: number = 100) => {
    const response = await fetch(`${BASE_URL}?chainid=${chainId}&module=account&action=addresstokennftinventory&address=${address}&contractaddress=${contractAddress}&page=${page}&offset=${offset}&apikey=${API_KEY}`);
    return response.json();
  }
};


  