<script lang="ts">
	import Shape from "$lib/components/Shape.svelte"
</script>

<svelte:head>
	<title>Experimental CSS Gallery</title>
	<meta
		name="description"
		content="Preview CSS-generated geometric shapes in a Svelte implementation."
	/>
</svelte:head>

<section class="page-shell">
	<div class="intro">
		<p class="eyebrow">Experimental CSS</p>
		<h1>CSS shape gallery for Svelte</h1>
	</div>

	<Shape />
</section>

<style>
	:global(body) {
		margin: 0;
		font-family: "Avenir Next", Avenir, "Segoe UI", sans-serif;
		background: radial-gradient(circle at top, #fdf7ef 0, #f5efe5 24%, #edf1f5 60%, #e5e9ee 100%);
		color: #14202b;
	}

	.page-shell {
		min-height: 100vh;
		padding: 3rem 1.5rem 4rem;
	}

	.intro {
		display: grid;
		gap: 0.75rem;
		max-width: 42rem;
		margin: 0 auto 1.5rem;
		text-align: center;
	}

	.eyebrow {
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 0.75rem;
		color: #8d5e3f;
	}

	h1 {
		margin: 0;
		font-size: clamp(2.25rem, 5vw, 4.5rem);
		line-height: 0.95;
	}

	.intro p:last-child {
		margin: 0;
		font-size: 1rem;
		color: #425161;
	}

	@media (max-width: 640px) {
		.page-shell {
			padding-inline: 1rem;
		}
	}
</style>
