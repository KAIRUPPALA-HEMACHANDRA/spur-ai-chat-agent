<script lang="ts">
  import { sendMessage }
    from "$lib/services/chat.service";

let message = $state("");
let response = $state("");
let loading = $state(false);

  async function handleSend() {
    if (!message.trim()) return;

    loading = true;

    try {
      const result =
        await sendMessage(message);

      response = result.reply;
    } catch (error) {
      response =
        "Something went wrong";
    }

    loading = false;
  }
</script>

<div class="p-8">
  <h1 class="text-2xl font-bold mb-4">
    Spur AI Chat
  </h1>

  <input
    bind:value={message}
    class="border p-2 w-full"
    placeholder="Ask something..."
  />

  <button
    class="border px-4 py-2 mt-4"
    onclick={handleSend}
  >
    Send
  </button>

  {#if loading}
    <p class="mt-4">
      Thinking...
    </p>
  {/if}

  {#if response}
    <div class="mt-4">
      <strong>AI:</strong>
      {response}
    </div>
  {/if}
</div>