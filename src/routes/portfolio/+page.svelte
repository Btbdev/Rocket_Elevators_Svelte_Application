<script>
	import { enhance } from '$lib/form';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Card from '../shared/card.svelte';
	// import { onMount } from 'svelte';
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
	// to check display for 10 nfts : 0x1E90cf48F11Dd52802eC7D1AF7082122A6a59312 or the current user's one ${checkAccount}
	onMount(async () => {
		try {
			const nft = await fetch(
				`https://express-api.codeboxxtest.xyz/NFT/getWalletTokens/0x1E90cf48F11Dd52802eC7D1AF7082122A6a59312`
			);
			console.log('What is nft:', nft);
			isPageLoaded = nft.ok;
			console.log('Test:', isPageLoaded);
			nfts = await nft.json();
			// .then(response => response.json())
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
	/* .todos {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
	} */

	.new {
		margin: 0 0 0.5rem 0;
	}

	input {
		border: 1px solid transparent;
	}

	input:focus-visible {
		box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid #ff3e00 !important;
		outline: none;
	}

	.new input {
		font-size: 28px;
		width: 100%;
		padding: 0.5em 1em 0.3em 1em;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		text-align: center;
	}

	/* .todo {
		display: flex;
		grid-template-columns: 2rem 1fr 2rem;
		grid-gap: 0.5rem;
		align-items: center;
		margin: 0 0 0.5rem 0;
		padding: 0.5rem;
		background-color: white;
		border-radius: 8px;
		filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));
		transform: translate(-1px, -1px);
		transition: filter 0.2s, transform 0.2s;
	} */

	.done {
		transform: none;
		opacity: 0.4;
		filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.1));
	}

	form.text {
		position: relative;
		display: flex;
		align-items: center;
		flex: 1;
	}

	.todo input {
		flex: 1;
		padding: 0.5em 2em 0.5em 0.8em;
		border-radius: 3px;
	}

	.todo button {
		width: 2em;
		height: 2em;
		border: none;
		background-color: transparent;
		background-position: 50% 50%;
		background-repeat: no-repeat;
	}

	button.toggle {
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 50%;
		box-sizing: border-box;
		background-size: 1em auto;
	}

	.done .toggle {
		background-image: url("data:image/svg+xml,%3Csvg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1.5L7.4375 14.5L1.5 8.5909' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
	}

	.delete {
		background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
		opacity: 0.2;
	}

	.delete:hover,
	.delete:focus {
		transition: opacity 0.2s;
		opacity: 1;
	}

	.save {
		position: absolute;
		right: 0;
		opacity: 0;
		background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 2H3.5C2.67158 2 2 2.67157 2 3.5V20.5C2 21.3284 2.67158 22 3.5 22H20.5C21.3284 22 22 21.3284 22 20.5V3.5C22 2.67157 21.3284 2 20.5 2Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M17 2V11H7.5V2H17Z' fill='white' stroke='white' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13.5 5.5V7.5' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M5.99844 2H18.4992' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A");
	}

	.todo input:focus + .save,
	.save:focus {
		transition: opacity 0.2s;
		opacity: 1;
	}

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

	h3  {
		justify-content: center;
	}
</style>
