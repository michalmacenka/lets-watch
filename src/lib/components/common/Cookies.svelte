<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import Button from './Button.svelte';

	let showCookies = false;

	onMount(() => {
		if (localStorage.getItem('cookiesAllowed')) return;
		showCookies = true;
	});

	const allowCookies = () => {
		showCookies = false;
		localStorage.setItem('cookiesAllowed', 'true');
	};
</script>

{#if showCookies}
	<div
		class="py-6 px-3 fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full"
		in:scale={{ duration: 500, delay: 1000 }}
		out:scale={{ duration: 300 }}
	>
		<div
			class="px-8 py-4 text-light  bg-dark/70 w-full max-w-lg rounded-lg mx-auto"
			style="backdrop-filter: blur(8px);"
		>
			<div
				class="grid sm:grid-cols-[5.5rem_auto_auto] grid-cols-[5.5rem_auto] grid-rows-[1rem_auto]  sm:grid-rows-[1rem_auto_auto] sm:grid-flow-col  items-start gap-2"
			>
				<img src="/cookie.png" alt="cookie" class="row-span-2 sm:row-span-full" />
				<h3 class="text-xl font-semibold ">Cookies!</h3>
				<p class="sm:row-span-2 text-light/60">We use cookies to make your experience better</p>
				<Button class="flex justify-center sm:row-span-2 max-sm:w-full max-sm:col-span-2">
					<a href="/terms#cookies"> Cookies policy</a></Button
				>
				<Button
					look="fill"
					class="flex justify-center  max-sm:w-full max-sm:col-span-2"
					on:click={allowCookies}>Ok</Button
				>
			</div>
		</div>
	</div>
{/if}
