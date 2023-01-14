<script lang="ts">
	import { onMount } from 'svelte';
	import Plyr from 'plyr';
	import 'plyr/dist/plyr.css';

	let playerElement: HTMLElement;
	let player: Plyr;

	onMount(() => {
		player = new Plyr(playerElement, {
			iconUrl: '/sprite.svg',
			// debug: true,
			blankVideo: '',
			captions: { update: true, active: true, language: 'auto' }
		});
	});
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video bind:this={playerElement} controls playsinline>
	<slot />
</video>
