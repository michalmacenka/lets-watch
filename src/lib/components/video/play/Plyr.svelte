<script lang="ts">
	import { onMount } from 'svelte';
	import Plyr from 'plyr';
	import 'plyr/dist/plyr.css';

	let playerElement: HTMLElement;
	export let player: Plyr;
	export let isNextCtrl: boolean;

	onMount(() => {
		player = new Plyr(playerElement, {
			iconUrl: '/sprite.svg',
			// debug: true,
			blankVideo: '',
			captions: { update: true, active: true, language: 'auto' }
		});

		player.on('ready', (e) => {
			if (!isNextCtrl) return;

			player.play();
			player.fullscreen.enter();
		});
	});
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video bind:this={playerElement} controls playsinline on:ended>
	<slot />
</video>
