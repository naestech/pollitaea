<script lang="ts">
	import Logo from '$lib/assets/Logo.png';
	import Voter from '$lib/assets/Voter.png';

	const scriptURL =
		'https://script.google.com/macros/s/AKfycbwHHnN8HF7AjBwyO_ehYqfot6Y5luCO3gBdda6Ww45Mxz_jMZ-XcN1z2KhwT9wLRqTmjg/exec';
	let email = '';
	let submitted = false;
	let loading = false;

	const handleAuth = () => {
		loading = true;
		console.log(email);
		fetch(scriptURL, { method: 'post', body: JSON.stringify({ Email: email }) })
			.then((res) => {
				console.log('Successful Submit');
			})
			.catch(() => {
				email = '';
			})
			.finally(() => (submitted = true));

		loading = false;
	};
</script>

<svelte:head>
	<title>Pollitaea</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Home of organic music descovery. TwoTone music store" />
</svelte:head>

<body>
	<div class="navbar">
		<img src={Logo} alt="Pollitaea Logo" class="logo" />
	</div>

	<div class="container">
		<img src={Voter} alt="Voter holding a Ballot" class="top-left-image" />
	</div>

	<div class="hero">
		<h3>noun - /pohl-it-AY-uh/: knowledge is power</h3>
		<form name="submit-to-google-sheet" class="form" on:submit={handleAuth}>
			<p>Cast your vote with confidence. Coming soon!</p>
			<input
				disabled={loading || submitted}
				value={email}
				on:change={(e) => {
					email = e.currentTarget.value;
				}}
				type="email"
				name="Email"
				placeholder={submitted && email == ''
					? 'Something went wrong during your form submission'
					: 'Enter your email.'}
				required
			/>
			<button disabled={loading || submitted || (submitted && email == '')} type="submit"
				>I'm In!</button
			>
		</form>
		{#if submitted}
			<h3 class="h3">Thank you for your interest!</h3>
		{/if}
	</div>
</body>

<style>
	@import url('https://fonts.googleapis.com/css2?family=EB+Garamond&family=Open+Sans&display=swap');

	* {
		margin: 0;
		padding: 0;
		font-family: 'EB Garamond', serif;
		box-sizing: border-box;
	}
	.navbar {
		background-color: #f2ead1;
		display: flex;
		justify-content: right;
		align-items: right;
	}

	.logo {
		margin-top: 10px;
		height: 100px;
		width: auto;
		cursor: pointer;
	}

	.container {
		background-color: #f2ead1;
		display: flex;
		justify-content: left;
	}

	.top-left-image {
		position: fixed;
		margin-top: -15%;
		margin-left: -15%;
	}

	.hero {
		width: 100%;
		height: 100vh;
		background-color: #f2ead1;
		background-size: cover;
		background-position: right;
		padding: 10px 10%;
		color: black;
	}

	.hero h3 {
		color: #999696;
		text-align: center;
	}

	.hero p {
		position: absolute;
		bottom: 300px;
		right: 100px;
		font-size: 20px;
	}

	form {
		background: #d9d9d9;
		display: flex;
		width: fit-content;
		align-items: center;
	}

	form input {
		position: absolute;
		bottom: 200px;
		right: 100px;
		border-radius: 50px;
		border-color: black;
		outline: none;
		padding: 10px 20px;
		height: 70px;
		width: 600px;
		font-size: 16px;
	}

	form button {
		position: absolute;
		bottom: 200px;
		right: 100px;
		background: #eb8f8f;
		border-radius: 50px;
		border-color: black;
		outline: none;
		height: 70px;
		width: 100px;
		cursor: pointer;
	}
</style>
