<script lang="ts">
	import Voter from '$lib/assets/Voter.png';
	import Logo from '$lib/assets/Logo.png';
	const scriptURL =
		'https://script.google.com/macros/s/AKfycbwHHnN8HF7AjBwyO_ehYqfot6Y5luCO3gBdda6Ww45Mxz_jMZ-XcN1z2KhwT9wLRqTmjg/exec';
	// const message = document.getElementById('message');

	const handleSubmit = (e: any) => {
		console.log(e);
		// e.preventDefault();
		// fetch(scriptURL, { method: 'POST', body: new FormData(form) })
		// 	.then((response) => {
		// 		message.innerHTML = 'Thank you for your interest!';
		// 		setTimeout(function () {
		// 			message.innerHTML = '';
		// 		}, 5000);
		// 		form.reset();
		// 	})
		// 	.catch((error) => console.error('Error!', error.message));
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

		<form name="submit-to-google-sheet" class="form" method="post">
			<p>Cast your vote with confidence. Coming soon!</p>
			<input type="email" name="Email" placeholder="Enter your email." required />
			<button type="submit">I'm In!</button>
		</form>
		<span id="message" />
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

	span {
		margin-top: 10px;
		display: block;
	}
</style>
