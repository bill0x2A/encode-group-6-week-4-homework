## Scripts
`yarn frontend` to start the frontend  
`yarn backend` to start the backend  
`yarn dev` will start the backend and frontend together  

## Tasks

- [ ] Build a web server and API for providing the features using the RESTful architecture
- [ ] Run a local node of IPFS
- [ ] Upload 10 images to this node
- [ ] Create a JSON and build metadata descriptions for 10 NFTs, each using one unique image
- [ ] Make a GET method in the API to get the metadata by id
- [X] Deploy a NFT Collection and mint 10 NFTs, and assign the API endpoint to the token URI
- [X] Integrate this NFT Collection contract and APIs in a frontend application to display NFTs metadata and images
- [X] (Bonus) provide wallet functions in the frontend to buy, transfer, allow, transfer from and burn NFTs


# Frontend Folder
Unsure if `yarn frontend` will start this folder. 
## Vercel Deployment 

The frontend was deployed using vercel. You can visit it here: [https://next-frontend-sigma.vercel.app/](https://next-frontend-sigma.vercel.app/)

The whole frontend pages are visible there. 

## Thirdweb SDK 

The frontend connects to the contracts with the Thirdweb SDK. Backend services are provided as necessary by Next.Js itself. Other than that, no methods needed to be called.

## NFT Collection
Contract of the NFT Collection was deployed on Mumbai using the Thirdweb Dashboard. 
Collection can be found here: [https://thirdweb.com/mumbai/nft-collection/0x7f214B42f8B53008cc1e81A93a9C8307624E4B26?tabIndex=0](https://thirdweb.com/mumbai/nft-collection/0x7f214B42f8B53008cc1e81A93a9C8307624E4B26?tabIndex=0)

## NFT Marketplace
A seperate contract was deployed on Mumbai to offer marketplace functionality for the minted NFTs. 
Marketplace can be found here: [https://thirdweb.com/mumbai/marketplace/0xD3d4036F8BdA104bf7c7c483452267DEAF7640Ff?tabIndex=0](https://thirdweb.com/mumbai/marketplace/0xD3d4036F8BdA104bf7c7c483452267DEAF7640Ff?tabIndex=0)

## Local Setup - Getting Started

First, install the dependencies with 

```bash
npm install
```

run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Backend Folder