<script lang="ts">
	interface Props {
		message: string;
		loading: boolean;
		onSend: () => void;
	}

	let {
		message = $bindable(),
		loading,
		onSend
	}: Props = $props();
</script>

<div class="flex gap-2">
	<input
		bind:value={message}
		class="border rounded-lg p-2 flex-1"
		placeholder="Ask a question..."
		onkeydown={(event) => {
			if (
				event.key === 'Enter' &&
				!loading
			) {
				onSend();
			}
		}}
	/>

	<button
		onclick={onSend}
		disabled={loading}
		class="border rounded-lg px-4 py-2 disabled:opacity-50"
	>
		Send
	</button>
</div>