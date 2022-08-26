<script>
	import { onMount } from 'svelte';
	import { connected, web3, selectedAccount, chainId, chainData } from 'svelte-web3';
	import { defaultEvmStores } from 'svelte-web3';
	import { Styles } from 'sveltestrap';
	import { Button, Tooltip } from 'sveltestrap';

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

	// to check if the nft smart contract allowance   ${checkAccount}
	onMount(async function () {
		const res = await fetch(`https://express-api.codeboxxtest.xyz/NFT/allowance/${checkAccount}`);

		const data = await res.json();
		if (data === true) {
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

		<Styles />
		<Button color="danger" size="lg" on:click={approve}>Connect my wallet</Button> <br />

		<div class="button-buy">
			{#if isAddressEligible}
				<Button color="primary" size="lg" on:click={doPost}>Buy NFT</Button>
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

	/* .button {
		background-color: #fff;
		height: 50px;
		width: 100%;
		font-size: 18px;
	} */

	.button-buy {
		padding-top: 50px;
	}

	h1 {
		padding-top: 25px;
		padding-bottom: 100px;
	}
</style>
