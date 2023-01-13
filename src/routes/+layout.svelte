<script lang="ts">
	import Navi from '$lib/component/Navi.svelte';
	import '../app.scss';
</script>

<svelte:head>
	<title>cool app</title>
</svelte:head>

<div>
	<nav>
		<ul>
			<li>
				<Navi />
			</li>
			<li>
				<Navi to="about" />
			</li>
		</ul>
	</nav>
	<slot />
</div>

<style lang="scss">
</style>
