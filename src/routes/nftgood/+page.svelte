<script>
	import { enhance } from '$lib/form';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';
	import { connected, web3, selectedAccount, chainId, chainData } from 'svelte-web3';
	import { defaultEvmStores } from 'svelte-web3';
	import { Button } from 'sveltestrap';

	// to add the connection with Metamask
	import RocketTokenContract from '../../RocketToken.json';
	import { page } from '$app/stores';
	const NFTCONTRACT_ADDRESS = '0x5E2bB780fE31C097aF60A2D5B35726F102a75049';

	let contractInstance;

	let isAddressEligible = false;

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

	async function approve() {
		try {
			const res = await contractInstance.methods.approve(NFTCONTRACT_ADDRESS, 1).send({
				from: $selectedAccount
			});

			console.log('approve res is:', res);
			console.log('approve status is:', res.status);

			isAddressEligible = res.status;
		} catch (error) {
			console.warn('approve error:', error);
		}
	}

	// let isActive = false;
	// to check if the nft smart contract allowance   ${checkAccount}
	onMount(async function () {
		const res = await fetch(`https://express-api.codeboxxtest.xyz/NFT/allowance/${checkAccount}`);

		const data = await res.json();
		if (data === true) {
			// window.location.replace('/portfolio');

			alert('Success ! Here comes your portfolio !');
		}
	});

	// to buy NFT with Rocket token

	async function doPost() {
		const res = await fetch(
			`https://express-api.codeboxxtest.xyz/NFT/buyWithRocket/${checkAccount}`,
			{
				method: 'POST'
			}
		);
		console.log('the mintNft is:', res);
		// const json = await mintNft.json();

		if (res.status === 200) {
			window.location.replace('/portfolio');
			alert('Success ! Here comes your portfolio !');
		}
	}
</script>

<svelte:head>
	<title>NFT minting</title>
	<meta name="description" content="A todo list app" />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
	/>
</svelte:head>

<div class="todos">
	<h1>Welcome to Rocket Elevator Minting!</h1>

	<div class="todos-wallet">
		<h1>Your Wallet Address <span class="wallet">{checkAccount}</span></h1>

		<Button color="primary" size="lg" on:click={approve}>Connect my wallet</Button> <br />

		<div class="button-buy">
			{#if isAddressEligible}
				<Button color="danger" size="lg" on:click={doPost}>Buy NFT</Button>
			{/if}
		</div>
	</div>
</div>

<style>
	.todos {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
	}

	.todos-wallet {
		text-align: center;
	}

	.wallet {
		font-size: 20px;
	}

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

	.todo {
		display: grid;
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
	}

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

	.button {
		background-color: #fff;
		height: 50px;
		width: 100%;
		font-size: 18px;
	}

	.button-buy {
		padding-top: 50px;
	}

	h1 {
		padding-top: 25px;
		padding-bottom: 100px;
	}
</style>
