<script>
	import Card from './shared/card.svelte';

	let array = [
		{
			name: 'Rocket Elevators #1',
			description: 'Rocket Elevators NFT Collection',
			image:
				'https://ipfs.moralis.io:2053/ipfs/QmU79SpmSA3xReg6FSiR7ZpTifTC6H2VAZfUNY5deCS4ZY/RocketElevatorsNFTImage_1.png'
		},
		{
			name: 'Rocket Elevators #2',
			description: 'Rocket Elevators NFT Collection',
			image:
				'https://ipfs.moralis.io:2053/ipfs/Qmf56Wu8Jwb77i1AjeJ1GniNEQfa8rWF8ZF7zUdZ4wchQK/RocketElevatorsNFTImage_2.png'
		},
		{
			name: 'Rocket Elevators #3',
			description: 'Rocket Elevators NFT Collection',
			image:
				'https://ipfs.moralis.io:2053/ipfs/QmfTx5aCvkkJKyYRQ1WyCVfvuRDzX5CKxTsuGzNGr18XVn/RocketElevatorsNFTImage_3.png'
		}
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="images">
		{#each array as array}
			<Card>
				<h3>{array.name}</h3>
				<span>{array.description}</span>
				<img class="image" src={array.image} alt="nftimage" />
			</Card>
		{/each}
	</div>

	<h1>Rocket Elevators NFT art is coming to you</h1>

	<p>
		You want to be more involved in your commmunity? Let's join our forces and help finance special
		foundations that are doing incredible work around those who suffered elevator related traumas in
		their life.
	</p>

	<h1>
		Let's support financially those foundations <br />and buy a
		<strong><a href="/nftgood">NFT</a></strong>!
	</h1>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
		padding-top: 25px;
		padding-bottom: 20px;
		color: #fff;
	}

	p {
		text-align: center;
		font-size: 24px;
		color: #fff;
	}

	img {
		width: 100%;
		height: auto !important;
		cursor: pointer;
	}
	img:hover {
		opacity: 0.5;
		filter: grayscale(0.5) blur(1px);
	}

	.images {
		display: flex;
		width: 100%;
		max-height: 50%;
		flex-direction: row;
		justify-content: space-around;
		padding-top: 75px;
	}
</style>
