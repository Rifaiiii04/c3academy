// src/data/dummyCourses.js
export const courses = [
    {
      id: 1,
      title: "Introduction to Blockchain Development",
      instructor: "Alex Johnson",
      description: "Learn the fundamentals of blockchain technology and start building decentralized applications.",
      price: 25,
      currency: "ICP",
      duration: "10 hours",
      level: "Beginner",
      rating: 4.8,
      students: 1543,
      thumbnail: "/course-thumbnail-1.jpg",
      tags: ["blockchain", "web3", "crypto"],
      chapters: [
        { title: "Blockchain Fundamentals", duration: "1h 20m", preview: true },
        { title: "Smart Contracts Basics", duration: "1h 45m", preview: false },
        { title: "Building Your First dApp", duration: "2h 10m", preview: false },
        { title: "ICP Token Integration", duration: "1h 30m", preview: false },
        { title: "Security Best Practices", duration: "1h 55m", preview: false },
        { title: "Final Project", duration: "1h 20m", preview: false },
      ]
    },
    {
      id: 2,
      title: "Advanced Smart Contract Development",
      instructor: "Sarah Chen",
      description: "Master the art of writing secure and efficient smart contracts for various blockchain platforms.",
      price: 40,
      currency: "ICP",
      duration: "15 hours",
      level: "Advanced",
      rating: 4.9,
      students: 872,
      thumbnail: "/course-thumbnail-2.jpg",
      tags: ["smart contracts", "solidity", "security"],
      chapters: [
        { title: "Advanced Contract Patterns", duration: "2h 10m", preview: true },
        { title: "Security Auditing", duration: "2h 45m", preview: false },
        { title: "Gas Optimization", duration: "1h 30m", preview: false },
        { title: "Cross-Chain Compatibility", duration: "2h 20m", preview: false },
        { title: "Testing and Deployment", duration: "2h 15m", preview: false },
        { title: "Real-world Applications", duration: "4h 00m", preview: false },
      ]
    },
    {
      id: 3,
      title: "Decentralized Finance (DeFi) Engineering",
      instructor: "Michael Rodriguez",
      description: "Explore the world of DeFi and learn how to build decentralized financial applications.",
      price: 35,
      currency: "ICP",
      duration: "12 hours",
      level: "Intermediate",
      rating: 4.7,
      students: 1283,
      thumbnail: "/course-thumbnail-3.jpg",
      tags: ["defi", "finance", "crypto"],
      chapters: [
        { title: "DeFi Ecosystem Overview", duration: "1h 30m", preview: true },
        { title: "Lending and Borrowing Protocols", duration: "2h 20m", preview: false },
        { title: "Automated Market Makers", duration: "2h 45m", preview: false },
        { title: "Yield Farming Strategies", duration: "1h 50m", preview: false },
        { title: "Risk Management", duration: "1h 35m", preview: false },
        { title: "Building a DeFi Dashboard", duration: "2h 00m", preview: false },
      ]
    },
    {
      id: 4,
      title: "NFT Marketplace Development",
      instructor: "Emma Thompson",
      description: "Create your own NFT marketplace with full functionality including minting, trading, and auctions.",
      price: 30,
      currency: "ICP",
      duration: "14 hours",
      level: "Intermediate",
      rating: 4.6,
      students: 956,
      thumbnail: "/course-thumbnail-4.jpg",
      tags: ["nft", "marketplace", "digital art"],
      chapters: [
        { title: "NFT Standards and Protocols", duration: "1h 40m", preview: true },
        { title: "Metadata and Storage Solutions", duration: "1h 50m", preview: false },
        { title: "Marketplace Architecture", duration: "2h 30m", preview: false },
        { title: "Auction Mechanisms", duration: "2h 15m", preview: false },
        { title: "Royalty Systems", duration: "1h 45m", preview: false },
        { title: "UI/UX for NFT Platforms", duration: "2h 00m", preview: false },
        { title: "Launch and Marketing", duration: "2h 00m", preview: false },
      ]
    },
    {
      id: 5,
      title: "Web3 Frontend Development",
      instructor: "David Kim",
      description: "Learn how to build modern, responsive frontends for Web3 applications with React.",
      price: 28,
      currency: "ICP",
      duration: "11 hours",
      level: "Beginner",
      rating: 4.8,
      students: 1762,
      thumbnail: "/course-thumbnail-5.jpg",
      tags: ["web3", "frontend", "react"],
      chapters: [
        { title: "Web3 Frontend Foundations", duration: "1h 30m", preview: true },
        { title: "Wallet Integration", duration: "2h 00m", preview: false },
        { title: "State Management for dApps", duration: "1h 45m", preview: false },
        { title: "UI Components for Blockchain", duration: "2h 10m", preview: false },
        { title: "Transaction UX Patterns", duration: "1h 50m", preview: false },
        { title: "Building a Complete Web3 App", duration: "1h 45m", preview: false },
      ]
    },
    {
      id: 6,
      title: "ICP Canister Development",
      instructor: "Lisa Wang",
      description: "Master the Internet Computer Protocol (ICP) and learn to build efficient canisters for dApps.",
      price: 45,
      currency: "ICP",
      duration: "16 hours",
      level: "Advanced",
      rating: 4.9,
      students: 648,
      thumbnail: "/course-thumbnail-6.jpg",
      tags: ["icp", "canister", "motoko"],
      chapters: [
        { title: "ICP Architecture Overview", duration: "2h 00m", preview: true },
        { title: "Motoko Programming Language", duration: "3h 15m", preview: false },
        { title: "Canister Development", duration: "3h 30m", preview: false },
        { title: "Inter-Canister Calls", duration: "2h 45m", preview: false },
        { title: "Persistence and Upgrades", duration: "2h 30m", preview: false },
        { title: "Security and Best Practices", duration: "2h 00m", preview: false },
      ]
    }
  ];
  
  // src/data/dummyCategories.js
  export const categories = [
    {
      id: 1,
      name: "Blockchain Basics",
      courses: 42,
      icon: "BlockchainIcon"
    },
    {
      id: 2,
      name: "Smart Contracts",
      courses: 38,
      icon: "ContractIcon"
    },
    {
      id: 3,
      name: "DeFi",
      courses: 29,
      icon: "DefiIcon"
    },
    {
      id: 4,
      name: "NFTs",
      courses: 25,
      icon: "NftIcon"
    },
    {
      id: 5,
      name: "Web3",
      courses: 35,
      icon: "Web3Icon"
    },
    {
      id: 6,
      name: "Cryptocurrency",
      courses: 31,
      icon: "CryptoIcon"
    },
    {
      id: 7,
      name: "ICP Ecosystem",
      courses: 18,
      icon: "IcpIcon"
    },
    {
      id: 8,
      name: "dApp Development",
      courses: 27,
      icon: "DappIcon"
    }
  ];