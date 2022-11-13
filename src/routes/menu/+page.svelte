<script>
	import Card from '$lib/components/card.svelte';
</script>

<section class="max-w-4xl mx-auto my-10 grid grid-cols-3 gap-x-6 gap-y-8">
	<!-- example for food menu -->
	<!-- when you using card component that delete loop  -->
	{#each { length: 10 } as _, i}
		<Card
			name="อาหาร {i + 1}"
			price="{20 * (i + 1)}"
			img="https://picsum.photos/id/{Math.floor(Math.random() * 100)}/400/400"
		/>
	{/each}
</section>
