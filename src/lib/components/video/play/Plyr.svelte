<script lang="ts">
	import { onMount } from 'svelte';
	import Plyr from 'plyr';
	import 'plyr/dist/plyr.css';

	import { videoLinks } from '$core/store/writable';

	let playerElement: HTMLElement;
	export let player: Plyr;
	export let isNextCtrl: boolean;

	onMount(() => {
		player = new Plyr(playerElement, {
			iconUrl: '/sprite.svg',
			// debug: true,
			blankVideo: '',
			keyboard: { focused: true, global: true },
			captions: { update: true, active: true, language: 'auto' }
		});

		// window.onkeydown = function (e) {
		// 	if (e.keyCode == 32 && e.target == document.body) player.togglePlay();
		// };

		player.on('ready', (e) => {
			if (!isNextCtrl) return;

			player.play();
			player.fullscreen.enter();
		});
	});
</script>

<!-- TODO: responsive subtitles -->

<!-- svelte-ignore a11y-media-has-caption -->

<video bind:this={playerElement} controls playsinline on:ended>
	<slot />
</video>

<style>
	::cue {
		font-size: 200%;
	}
</style>
