<script lang="ts">
	const navis = {
		home: ['home', '/'],
		about: ['abount', '/about']
	};

	type Navis = keyof typeof navis;
	export let to: Navis = 'home';
</script>

<a href={navis[to].at(-1)}>
	<slot>{navis[to].at(0)}</slot>
</a>
