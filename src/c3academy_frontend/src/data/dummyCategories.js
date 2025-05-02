// src/data/dummyCategories.js
/**
 * Dummy categories data for the C3Academy platform
 */

export const categories = [
    {
      id: 1,
      name: "Blockchain Basics",
      description: "Fundamental concepts of blockchain technology, including consensus mechanisms, cryptography, and distributed ledgers.",
      courses: 42,
      icon: "BlockchainIcon",
      featured: true,
      color: "blue"
    },
    {
      id: 2,
      name: "Smart Contracts",
      description: "Learn to write, test, and deploy secure smart contracts on various blockchain platforms.",
      courses: 38,
      icon: "ContractIcon",
      featured: true,
      color: "indigo"
    },
    {
      id: 3,
      name: "DeFi",
      description: "Explore decentralized finance protocols and learn how to build applications for lending, borrowing, and trading.",
      courses: 29,
      icon: "DefiIcon",
      featured: true,
      color: "purple"
    },
    {
      id: 4,
      name: "NFTs",
      description: "Discover how to create, mint, and trade non-fungible tokens, and build marketplaces for digital assets.",
      courses: 25,
      icon: "NftIcon",
      featured: true,
      color: "pink"
    },
    {
      id: 5,
      name: "Web3",
      description: "Build the next generation of decentralized applications with modern web technologies and blockchain integration.",
      courses: 35,
      icon: "Web3Icon",
      featured: true,
      color: "violet"
    },
    {
      id: 6,
      name: "Cryptocurrency",
      description: "Understand the technical aspects of cryptocurrencies, token economics, and blockchain-based payment systems.",
      courses: 31,
      icon: "CryptoIcon",
      featured: false,
      color: "green"
    },
    {
      id: 7,
      name: "ICP Ecosystem",
      description: "Learn to develop on the Internet Computer Protocol with canister development, Motoko programming, and dApp creation.",
      courses: 18,
      icon: "IcpIcon",
      featured: true,
      color: "teal"
    },
    {
      id: 8,
      name: "dApp Development",
      description: "Create fully decentralized applications with front-end interfaces, smart contracts, and blockchain integration.",
      courses: 27,
      icon: "DappIcon",
      featured: false,
      color: "cyan"
    },
    {
      id: 9,
      name: "Blockchain Security",
      description: "Master the security aspects of blockchain, including smart contract auditing, pen testing, and security best practices.",
      courses: 23,
      icon: "SecurityIcon",
      featured: false,
      color: "red"
    },
    {
      id: 10,
      name: "Tokenomics",
      description: "Study the economics of tokens, including token design, distribution, governance, and incentive mechanisms.",
      courses: 15,
      icon: "TokenIcon",
      featured: false,
      color: "yellow"
    },
    {
      id: 11,
      name: "DAOs",
      description: "Understand Decentralized Autonomous Organizations, their governance structures, and implementation.",
      courses: 12,
      icon: "DaoIcon",
      featured: false,
      color: "amber"
    },
    {
      id: 12,
      name: "Blockchain for Business",
      description: "Implement blockchain solutions in enterprise environments, including supply chain, finance, and healthcare.",
      courses: 20,
      icon: "BusinessIcon",
      featured: false,
      color: "orange"
    }
  ];
  
  /**
   * Get featured categories
   * @returns {Array} Featured categories
   */
  export const getFeaturedCategories = () => {
    return categories.filter(category => category.featured);
  };
  
  /**
   * Get a category by ID
   * @param {number} id - Category ID
   * @returns {Object|null} Category object or null if not found
   */
  export const getCategoryById = (id) => {
    return categories.find(category => category.id === parseInt(id)) || null;
  };
  
  /**
   * Get a category by name (case insensitive)
   * @param {string} name - Category name
   * @returns {Object|null} Category object or null if not found
   */
  export const getCategoryByName = (name) => {
    return categories.find(category => 
      category.name.toLowerCase() === name.toLowerCase()
    ) || null;
  };
  
  export default categories;