<script>
	import Card from '../shared/card.svelte';
	import { connected, web3, selectedAccount, chainId, chainData } from 'svelte-web3';
	import { defaultEvmStores } from 'svelte-web3';
	import { Circle } from 'svelte-loading-spinners';

	// to add the connection with Metamask

	import RocketTokenContract from '../../RocketToken.json';
	const NFTCONTRACT_ADDRESS = '0x5E2bB780fE31C097aF60A2D5B35726F102a75049';

	let contractInstance;

	$: checkAccount = $selectedAccount || '0x0000000000000000000000000000000000000000';
	$: balance = $connected ? $web3.eth.getBalance(checkAccount) : '';

	onMount(async () => {
		await defaultEvmStores.setProvider();
		contractInstance = await getContract(NFTCONTRACT_ADDRESS);
		console.log(contractInstance);
	});

	async function getContract(address) {
		const networkId = await $web3.eth.net.getId();

		return new $web3.eth.Contract(
			RocketTokenContract.abi,
			'0x2f679c4fA4Fe7c1cB62D6fFbdC9879D3e221C93b',
			{
				from: address,
				gas: 2000000
			}
		);
	}

	// let array = [
	// {}
	// {
	// 	"name": "Rocket Elevators #1",
	// 	"description": "Rocket Elevators NFT Collection",
	// 	"image": "https://ipfs.moralis.io:2053/ipfs/QmU79SpmSA3xReg6FSiR7ZpTifTC6H2VAZfUNY5deCS4ZY/RocketElevatorsNFTImage_1.png"
	// },
	// {
	// 	"name": "Rocket Elevators #2",
	// 	"description": "Rocket Elevators NFT Collection",
	// 	"image": "https://ipfs.moralis.io:2053/ipfs/Qmf56Wu8Jwb77i1AjeJ1GniNEQfa8rWF8ZF7zUdZ4wchQK/RocketElevatorsNFTImage_2.png"
	// },
	// {
	// 	"name": "Rocket Elevators #3",
	// 	"description": "Rocket Elevators NFT Collection",
	// 	"image": "https://ipfs.moralis.io:2053/ipfs/QmfTx5aCvkkJKyYRQ1WyCVfvuRDzX5CKxTsuGzNGr18XVn/RocketElevatorsNFTImage_3.png"
	// },
	// {
	// 	"name": "Rocket Elevators #4",
	// 	"description": "Rocket Elevators NFT Collection",
	// 	"image": "https://ipfs.moralis.io:2053/ipfs/Qmd6DwwKr9ncFdsuK3Lvc9rDm6m3MPGyQSyN6NA4rFz77C/RocketElevatorsNFTImage_4.png"
	// },
	// {
	// 	"name": "Rocket Elevators #5",
	// 	"description": "Rocket Elevators NFT Collection",
	// 	"image": "https://ipfs.moralis.io:2053/ipfs/QmU79SpmSA3xReg6FSiR7ZpTifTC6H2VAZfUNY5deCS4ZY/RocketElevatorsNFTImage_1.png"
	// },
	// {
	// 	"name": "Rocket Elevators #6",
	// 	"description": "Rocket Elevators NFT Collection",
	// 	"image": "https://ipfs.moralis.io:2053/ipfs/QmU79SpmSA3xReg6FSiR7ZpTifTC6H2VAZfUNY5deCS4ZY/RocketElevatorsNFTImage_1.png"
	// },
	// {
	// 	"name": "Rocket Elevators #7",
	// 	"description": "Rocket Elevators NFT Collection",
	// 	"image": "https://ipfs.moralis.io:2053/ipfs/QmU79SpmSA3xReg6FSiR7ZpTifTC6H2VAZfUNY5deCS4ZY/RocketElevatorsNFTImage_1.png"
	// },
	// {
	// 	"name": "Rocket Elevators #8",
	// 	"description": "Rocket Elevators NFT Collection",
	// 	"image": "https://ipfs.moralis.io:2053/ipfs/QmU79SpmSA3xReg6FSiR7ZpTifTC6H2VAZfUNY5deCS4ZY/RocketElevatorsNFTImage_1.png"
	// },
	// ];

	/** @type {import('./$types').PageData} */
	// export let data;

	// <!-- to add the current user portfolio -->

	import { onMount } from 'svelte';

	// to show the spinner when page is loading the nfts
	let isPageLoaded = false;
	let nfts = [];
	onMount(async () => {
		try {
			const nft = await fetch(
				`https://express-api.codeboxxtest.xyz/NFT/getWalletTokens/0x1E90cf48F11Dd52802eC7D1AF7082122A6a59312`
			);
			console.log('What is nft:', nft);
			isPageLoaded = nft.ok;
			console.log('Test:', isPageLoaded);
			nfts = await nft.json();
			console.log('What is nfts:', nfts);

			nfts.map((e) => {
				console.log(e);
			});
		} catch (error) {
			console.warn('loaded page ?:', error);
		}
	});
</script>

<svelte:head>
	<title>Portfolio</title>
	<meta name="description" content="A todo list app" />
</svelte:head>

<div class="todos">
	<div class="divWrapper">
		<h1>Our NFT cards collection</h1>
		{#if !isPageLoaded}
			<div class="spinner">
				<Circle size="100" color="rgb(199, 20, 46)" unit="px" duration="5s" />
			</div>
			<div class="spinner">
				<h3>Our collection is loading...</h3>
			</div>
		{/if}

		<div class="wrapperCard">
			{#each nfts as nft}
				<Card>
					<h3>{nft.name}</h3>
					<span>{nft.description}</span>
					<img class="image" src={nft.image} alt="nftimage" />
				</Card>
			{/each}
		</div>
	</div>
</div>

<style>
	.wrapperCard {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		max-width: 100%;
		padding-top: 20px;
	}

	.divWrapper {
		padding-top: 20px;
	}

	.image {
		max-width: 200px;
		padding-top: 20px;
	}

	.spinner {
		display: flex;
		justify-content: center;
		padding-top: 30px;
	}
</style>
