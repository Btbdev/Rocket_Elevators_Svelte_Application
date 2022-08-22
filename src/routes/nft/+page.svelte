<script>
import { onMount } from "svelte";
import { apiData, drinkNames } from './store.js';

onMount(async () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon")
  .then(response => response.json())
  .then(data => {
		console.log(data);
    apiData.set(data);
  }).catch(error => {
    console.log(error);
    return [];
  });
});
</script>


<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="content">
	<h1>NFT Mining</h1>

	<p>
		This is a <a href="https://kit.svelte.dev">SvelteKit</a> app. You can make your own by typing the
		following into your command line and following the prompts:
	</p>

	<pre>npm create svelte@latest</pre>
	<!-- <pre>test??</pre>permet de faire un fond de commandepromt -->

	<p>
		On this paragraph space, I have to call the first GET endpoint (/NFT/gift/wallet_address) / boolean checkout
		Check if address is eligible here :

		
	
	
		
		<!-- The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading. -->
	</p>

	<p>
		If boolean is false -> bring user to buy an NFT with Rocket token - see David for more info. 
		If boolean is true, a success alert message is generated and redirect the user to the portfolio page.
		
		
		
		<!-- The <a href="/nft">NFTs</a> page illustrates SvelteKit's data loading and form handling. Try using
		it with JavaScript disabled! -->
	</p>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
