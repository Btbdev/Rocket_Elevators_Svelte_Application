<script>
	import Counter from '$lib/Counter.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<!-- how to call an image -->
		<!-- <span class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp" />
				<img src="svelte-welcome.png" alt="Welcome" />
			</picture>
		</span> -->

		This is<br />the Home page for Svelte app
	</h1>

	<h2>
		This could be a paragraph <strong>src/routes/+page.svelte</strong>
	</h2>
	<h2>
		Content of the home page : details about the nft collection (to my discretion) and 
		a Call to Action to reach the nft page.
	</h2>
	<p>
		To our most loyal customer, we are proud to present to you our limited NFT collection of elevator themed artwork !
		<br />
	</p>

	<p>
		You want to be more involve in your commmunity ? Let's join our force and help us finance special foundation that are doing
		incredible work around those who suffered elevator related traumas in their life. 
		<br />
		Let's support financially those fundations and buy an <strong><a href="/nft">NFT</a></strong> !
	</p>

	<!-- <Counter /> -->
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
	}

	p {
		text-align: center;
	}

	.welcome {
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
	}

</style>
