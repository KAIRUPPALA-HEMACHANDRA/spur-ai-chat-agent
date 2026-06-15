<script lang="ts">
	interface Props {
		sender: 'USER' | 'AI';
		content: string;
	}

	let { sender, content }: Props = $props();
</script>

<div
	class={`flex ${
		sender === 'USER'
			? 'justify-end'
			: 'justify-start'
	}`}
>
	<div
		class={`max-w-[80%] px-4 py-2 rounded-lg ${
			sender === 'USER'
				? 'bg-blue-500 text-white'
				: 'bg-gray-200 text-black'
		}`}
	>
		{content}
	</div>
</div>