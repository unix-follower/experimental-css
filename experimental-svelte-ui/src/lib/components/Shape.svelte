<script lang="ts">
	import "./shape.css"
	import { shapes } from "./shapes"

	let { initialSelection = [] }: { initialSelection?: string[] } = $props()

	let selectedShapeNames = $derived([...initialSelection])

	function handleShapeChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement
		selectedShapeNames = Array.from(target.selectedOptions, (option) => option.value)
	}

	function getSelectedShapes() {
		return shapes.filter((shape) => selectedShapeNames.includes(shape.name))
	}
</script>

<svelte:head>
	<title>Experimental CSS Shapes</title>
</svelte:head>

<div class="shape-gallery">
	<div class="controls">
		<label for="selectShape">Choose shapes:</label>
		<select
			id="selectShape"
			multiple
			size="12"
			onchange={handleShapeChange}
			aria-describedby="shape-selection-help"
		>
			{#each shapes as shape (shape.id)}
				<option value={shape.name} selected={selectedShapeNames.includes(shape.name)}>
					{shape.name}
				</option>
			{/each}
		</select>
		<p id="shape-selection-help">Hold Command to choose multiple shapes.</p>
	</div>

	<div class="preview" aria-live="polite">
		{#if selectedShapeNames.length === 0}
			<p class="empty-state">Select one or more shapes to preview them.</p>
		{:else}
			{#each getSelectedShapes() as shape (shape.id)}
				<div class="shape-card">
					<h2>{shape.name}</h2>
					<div id={shape.id} aria-label={shape.name}></div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.shape-gallery {
		display: grid;
		gap: 2rem;
		padding: 2rem;
	}

	.controls {
		display: grid;
		gap: 0.75rem;
		max-width: 18rem;
	}

	label {
		font-size: 0.95rem;
		font-weight: 600;
	}

	select {
		min-height: 16rem;
		padding: 0.75rem;
		font: inherit;
	}

	p {
		margin: 0;
	}

	.preview {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
		align-items: start;
	}

	.shape-card {
		display: grid;
		gap: 1rem;
		justify-items: center;
		padding: 1rem;
		border: 1px solid #d9dde3;
		border-radius: 1rem;
		background: #fff;
	}

	.shape-card h2 {
		margin: 0;
		font-size: 1rem;
	}

	.empty-state {
		color: #55606e;
	}

	@media (min-width: 800px) {
		.shape-gallery {
			grid-template-columns: minmax(16rem, 18rem) minmax(0, 1fr);
			align-items: start;
		}
	}
</style>
