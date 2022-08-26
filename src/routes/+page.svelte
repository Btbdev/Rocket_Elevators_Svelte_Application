<script>
	// import Counter from '$lib/Counter.svelte';
	// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
	import Card from './shared/card.svelte';
	// import { Swiper, SwiperSlide } from 'swiper/svelte';
	// import { Images } from 'svelte-images';
	// import { Carousel } from 'svelte-images';

	// const { Modal, open, close } = Carousel;

	// export let images = [];

	// const popModal = (idx) =>
	// 	setTimeout(() => {
	// 		open(images, idx);
	// 	}, 0);

	// const images = [
	// 	{
	// 		src: '/nfts.png'
	// 	},
	// 	{
	// 		src: '/RocketElevatorsNFTImage_1.png'
	// 	},
	// 	{
	// 		src: '/RocketElevatorsNFTImage_23.png'
	// 	}
	// ];

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
		Let's support financially those foundations <br />and buy an
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

	/* .welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	} */

	main {
		height: 75vh;
	}

	.gallery {
		display: flex;
		flex-flow: row wrap;
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
