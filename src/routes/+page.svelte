<script lang="ts">
	import Form from '../component/Form.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="grid_">
	{#each data.users as user}
		{user.email}
		{user.name}
	{/each}
	<Form />
</div>

<style lang="scss">
</style>
