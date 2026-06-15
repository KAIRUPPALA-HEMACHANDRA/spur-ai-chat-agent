<script lang="ts">
	import { onMount } from 'svelte';

	import { sendMessage, getConversation } from '$lib/services/chat.service';

	import MessageBubble from '$lib/components/MessageBubble.svelte';
	import ChatInput from '$lib/components/ChatInput.svelte';

	interface Message {
		sender: 'USER' | 'AI';
		content: string;
	}

	let message = $state('');
	let loading = $state(false);
	let sessionId = $state<string | null>(null);
	let messages = $state<Message[]>([]);
	let chatContainer = $state<HTMLDivElement | null>(null);

	let errorMessage = $state('');

	const MAX_MESSAGE_LENGTH = 1000;

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
			errorMessage = 'Please enter a message.';
			return;
		}

		if (message.length > MAX_MESSAGE_LENGTH) {
			errorMessage = `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`;
			return;
		}

		const userMessage = message;

		errorMessage = '';

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
				content:
					'⚠️ Unable to contact the support agent. Please try again.'
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
			<MessageBubble
				sender={msg.sender}
				content={msg.content}
			/>
		{/each}

		{#if loading}
			<div class="text-sm text-gray-500">
				Agent is typing...
			</div>
		{/if}
	</div>

	{#if errorMessage}
		<div
			class="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700"
		>
			{errorMessage}
		</div>
	{/if}

	<ChatInput
		bind:message
		{loading}
		onSend={handleSend}
	/>
</div>