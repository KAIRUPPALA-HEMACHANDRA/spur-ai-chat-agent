<script lang="ts">
	import { onMount } from 'svelte';
	import { sendMessage, getConversation } from '$lib/services/chat.service';

	interface Message {
		sender: 'USER' | 'AI';
		content: string;
	}

	let message = $state('');
	let loading = $state(false);
	let sessionId = $state<string | null>(null);
	let messages = $state<Message[]>([]);
	let chatContainer = $state<HTMLDivElement | null>(null);

	onMount(async () => {
		const savedSessionId = localStorage.getItem('sessionId');

		if (!savedSessionId) {
			return;
		}

		try {
			const conversation = await getConversation(savedSessionId);

			sessionId = savedSessionId;

			messages = conversation.messages.map((msg: Message) => ({
				sender: msg.sender,
				content: msg.content
			}));

			scrollToBottom();
		} catch (error) {
			console.error(error);
		}
	});

	async function handleSend() {
		if (!message.trim()) {
			return;
		}

		const userMessage = message;

		messages.push({
			sender: 'USER',
			content: userMessage
		});

		scrollToBottom();

		message = '';
		loading = true;

		try {
			const result = await sendMessage(
				userMessage,
				sessionId ?? undefined
			);

			if (!sessionId) {
				sessionId = result.sessionId;

				localStorage.setItem(
					'sessionId',
					result.sessionId
				);
			}

			messages.push({
				sender: 'AI',
				content: result.reply
			});

			scrollToBottom();
		} catch (error) {
			messages.push({
				sender: 'AI',
				content: 'Sorry, something went wrong.'
			});

			scrollToBottom();
		} finally {
			loading = false;
		}
	}

	function scrollToBottom() {
		setTimeout(() => {
			chatContainer?.scrollTo({
				top: chatContainer.scrollHeight,
				behavior: 'smooth'
			});
		}, 50);
	}
</script>

<div class="max-w-3xl mx-auto p-6">
	<h1 class="text-3xl font-bold mb-6">
		Spur AI Support
	</h1>

	<div
		bind:this={chatContainer}
		class="border rounded-lg p-4 h-[500px] overflow-y-auto mb-4 space-y-3"
	>
		{#each messages as msg}
			<div
				class={`flex ${
					msg.sender === 'USER'
						? 'justify-end'
						: 'justify-start'
				}`}
			>
				<div
					class={`max-w-[80%] px-4 py-2 rounded-lg ${
						msg.sender === 'USER'
							? 'bg-blue-500 text-white'
							: 'bg-gray-200 text-black'
					}`}
				>
					{msg.content}
				</div>
			</div>
		{/each}

		{#if loading}
			<div class="text-sm text-gray-500">
				Agent is typing...
			</div>
		{/if}
	</div>

	<div class="flex gap-2">
		<input
			bind:value={message}
			class="border rounded-lg p-2 flex-1"
			placeholder="Ask a question..."
			onkeydown={(event) => {
				if (event.key === 'Enter' && !loading) {
					handleSend();
				}
			}}
		/>

		<button
			onclick={handleSend}
			disabled={loading}
			class="border rounded-lg px-4 py-2 disabled:opacity-50"
		>
			Send
		</button>
	</div>
</div>