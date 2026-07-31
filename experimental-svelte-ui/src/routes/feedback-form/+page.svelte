<script lang="ts">
	import FeedbackForm from "$lib/components/feedback-form/FeedbackForm.svelte"
	import FeedbackList from "$lib/components/feedback-form/FeedbackList.svelte"
	import FeedbackStats from "$lib/components/feedback-form/FeedbackStats.svelte"
</script>

<svelte:head>
	<title>Feedback Form</title>
</svelte:head>

<main class="container">
	<FeedbackForm />
	<FeedbackStats />
	<FeedbackList />
</main>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		font-family: "Poppins", sans-serif;
		background-color: #202142;
		line-height: 1.6;
		color: #fff;
	}

	:global(ul) {
		list-style: none;
	}

	.container {
		max-width: 768px;
		margin: 100px auto;
		padding: 0 20px;
	}
</style>
