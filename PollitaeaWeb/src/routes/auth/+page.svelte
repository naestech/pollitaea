<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$lib/assets//Logo.png';

	const isValid =
		$page.url.toString().includes('access_token') &&
		$page.url.toString().includes('refresh_token') &&
		$page.url.toString().includes('type');
	// if (isValid) {
	// 	supabase.auth.verifyOtp({
	// 		token_hash: $page.url.searchParams.get('token') || '',
	// 		type: 'email'
	// 	});
	// }
</script>

<svelte:head>
	<title>Join Pollitaea</title>
	<meta name="description" content="Pollitaea signup" />
</svelte:head>
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h5 class="h5">Knowledge is power</h5>
		<figure>
			<section class="img-bg" />
			<img class="h-15 w-15" src={Logo} alt="Pollitaea Logo" />
		</figure>
		{#if isValid}
			<h2 class="mx-9">
				Welcome to Pollitaea! Thank you for confirming your account. <br /> You can head back to the
				app and sign in.
			</h2>
		{:else}
			<h3 class="mx-9">
				Unauthorized - Either something went wrong during your signup (our bad) or you're digging
				around where you shouldn't be.
			</h3>
			<h6>We believe in the benefit of the doubt over here though 😶‍🌫️</h6>
			<a href="/"> [ Go Home! ] </a>
		{/if}
	</div>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite, glow 5s linear infinite;
	}
</style>
