<script>
	import { onMount, onDestroy } from "svelte"
	import { FeedbackStore } from "$lib/stores/feedback"
	import { fade, scale } from "svelte/transition"
	import FeedbackItem from "./FeedbackItem.svelte"

	const unsubscribe = FeedbackStore.subscribe(() => {
		console.log("Subscribed to FeedbackStore")
	})

	onMount(() => {
		console.log("onMount called")
	})

	onDestroy(() => {
		console.log("onDestroy called")
		unsubscribe()
	})
</script>

{#each $FeedbackStore as store (store.id)}
	<div in:scale out:fade={{ duration: 500 }}>
		<FeedbackItem item={store} />
	</div>
{/each}
