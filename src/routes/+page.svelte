<script lang="ts">
	import Form from '../component/Form.svelte';
	import { userStore } from '../util/store';
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	export let form: ActionData;

	userStore.set(data.user ? true : false);
</script>

<div>
	<Form />
</div>
{#if form?.success && $userStore}
	<p>user loggined!</p>
{/if}

<style lang="scss">
</style>
