<script lang="ts">
	const navis = {
		home: '/',
		about: '/about'
	};

	type Navis = keyof typeof navis;
	export let where: Navis = 'home';
</script>

<a href={navis[where]}>
	<slot>no_named link</slot>
</a>
