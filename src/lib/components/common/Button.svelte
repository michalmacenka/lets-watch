<script lang="ts">
	type btnOptions = 'normal' | 'fill' | 'custom';
	export let look: btnOptions = 'normal';
</script>

{#if look === 'normal'}
	<button
		on:click
		type={$$props.type}
		class="
  {$$props.class}
  bg-transparent border-2  border-light text-light
  fill-light
  hover:bg-light/20

  "><slot>Button</slot></button
	>
{:else if look === 'fill'}
	<button
		on:click
		type={$$props.type}
		class="
  {$$props.class}
  bg-main  text-dark border-2 border-main
  hover:text-main 
  hover:bg-dark/20 hover:border-dark
 "><slot>Button</slot></button
	>
{:else if look === 'custom'}
	<button
		on:click
		type={$$props.type}
		class="
  {$$props.class}
  
 "><slot>Button</slot></button
	>
{/if}

<style>
	button {
		@apply font-medium
  flex gap-2
  
  items-center
  duration-300  backdrop-filter backdrop-blur
  rounded-lg
  py-2
  px-5;
	}
</style>
