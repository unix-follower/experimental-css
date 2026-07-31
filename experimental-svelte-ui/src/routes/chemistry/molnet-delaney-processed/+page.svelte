<script>
	import { onMount } from "svelte"
	import * as d3 from "d3"

	import ScatterPlot from "$lib/components/d3-common/ScatterPlot.svelte"

	let data = $state([])
	let xProperty = $state("Number of Rings")
	let yProperty = $state("Polar Surface Area")

	onMount(async () => {
		data = await d3.csv(
			"https://raw.githubusercontent.com/unix-follower/molecule-analysis/main/data/delaney-processed.csv",
			d3.autoType,
		)
	})

	const margin = {
		top: 50,
		right: 50,
		bottom: 70,
		left: 95,
	}
</script>

<div>
	<label>
		Independent variable
		<select bind:value={xProperty}>
			<option value="Number of Rings">Number of Rings</option>
			<option value="Number of Rotatable Bonds">Number of Rotatable Bonds</option>
		</select>
	</label>

	<label>
		Dependent variable
		<select bind:value={yProperty}>
			<option value="Polar Surface Area">Polar Surface Area</option>
			<option value="measured log solubility in mols per litre"
				>Measured Log Solubility in Mols per Litre</option
			>
		</select>
	</label>
</div>

<ScatterPlot {data} {xProperty} {yProperty} {margin} />
