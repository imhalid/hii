<script lang="ts">
	import './layout.css';
	import 'dialkit/styles.css';
	import { DialRoot } from 'dialkit/svelte';
	import { browser } from '$app/environment';

	const { children } = $props();
</script>

{@render children()}
{#if browser}
	<DialRoot />
{/if}
