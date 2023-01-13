<script lang="ts">
	import Form from '$lib/component/Form.svelte';
	import { userStore } from '$lib/util/store';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	userStore.set(data.user);
</script>

<Form />
{#if form?.success && $userStore}
	<p>user loggined!</p>
{/if}

<style lang="scss">
</style>
