<script>
	import * as d3 from "d3"

	let { data, xProperty, yProperty, margin } = $props()

	let chartWidth = $state(400)
	let chartHeight = 400

	let innerChartWidth = $derived(chartWidth - margin.left - margin.right)
	let innerChartHeight = $derived(chartHeight - margin.top - margin.bottom)

	let xScale = $derived(
		d3
			.scaleLinear()
			.domain([d3.min(data, (row) => +row[xProperty]), d3.max(data, (row) => +row[xProperty])])
			.range([0, innerChartWidth])
			.nice(),
	)
	let yScale = $derived(
		d3
			.scaleLinear()
			.domain([d3.min(data, (row) => +row[yProperty]), d3.max(data, (row) => +row[yProperty])])
			.range([innerChartHeight, 0])
			.nice(),
	)

	let xTicks = $derived(xScale.ticks())
	let yTicks = $derived(yScale.ticks())
</script>

<div bind:clientWidth={chartWidth}>
	<svg
		width={chartWidth}
		height={chartHeight}
		role="img"
		aria-label="Scatter plot of {yProperty} vs {xProperty}"
	>
		<g style="transform: translate({margin.left}px, {margin.top}px)">
			<g style="transform: translate(0, {innerChartHeight}px)">
				<line x1="0" y1="0" x2={innerChartWidth} y2="0" stroke="black" stroke-width="4px" />
				{#each xTicks as tick (tick)}
					<text x={xScale(tick)} y={25}>{tick}</text>
				{/each}
				<text x={innerChartWidth / 2} y="50px">{xProperty}</text>
			</g>
			<g>
				<line x1="0" y1="0" x2="0" y2={innerChartHeight} stroke="black" stroke-width="4px" />
				{#each yTicks as tick (tick)}
					<text x="-35px" y={yScale(tick)}>{tick}</text>
				{/each}
				<g style="transform: translate(-65px, {innerChartHeight / 2}px) rotate(-90deg)">
					<text>{yProperty}</text>
				</g>
			</g>
			{#each data as row (row["Compound ID"])}
				<circle cx={xScale(+row[xProperty])} cy={yScale(+row[yProperty])} fill="blue" r="8px" />
			{/each}
		</g>
	</svg>
</div>

<style>
	svg {
		background-color: white;
	}

	text {
		dominant-baseline: middle;
		text-anchor: middle;
	}

	circle {
		transition: all 500ms ease;
	}
</style>
