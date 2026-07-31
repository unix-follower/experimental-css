<script>
	import { feedbackCount, feedbackAverage } from "$lib/stores/feedback"
</script>

<div class="feedback-stats">
	<h4>{$feedbackCount} Reviews</h4>
	<h4>Ratings Average: {$feedbackAverage}</h4>
</div>

<style>
	.feedback-stats {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
