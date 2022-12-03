<script lang="ts">
	let input: HTMLElement;
	let hidePlaceholder = false;

	let term: string = '';
</script>

<form class="w-full max-w-lg">
	<div class="flex items-center w-full relative">
		<div class="absolute flex w-full px-5 text-middle gap-5 items-center -translate-y-[0.05rem] ">
			<button type="submit" class="flex items-center">
				<i class="ri-search-line " />
			</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<p
				class:opacity-0={hidePlaceholder || term.length > 0}
				class="grow cursor-text translate-y-[0.1rem]"
				on:click={() => input.focus()}
			>
				Let's watch Breaking Bad
			</p>

			<button on:click={() => (term = '')} class="flex items-center">
				<i
					class="ri-close-line cursor-pointer hover:text-light transition"
					class:hidden={term.length == 0}
				/>
			</button>
		</div>
		<input
			on:focusout={() => (hidePlaceholder = false)}
			bind:this={input}
			bind:value={term}
			type="text"
			class="pt-3.5  pb-3 px-14 text-white bg-dark rounded-lg w-full select-none"
		/>
	</div>
</form>
