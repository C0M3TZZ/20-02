<!-- <script>
	import Card from '$lib/components/card.svelte';

	let show = false;

	let foods = [
		{
			name: 'Pizza',
			price: 100
		},
		{
			name: 'Burger',
			price: 50
		},
    {
      name: 'Sandwich',
      price: 30
    }
	];
</script>

<button
	on:click={() => {
		show = !show;
	}}
>
	Click Me
</button>

{#if show}
	<p>Am Here!</p>
{/if}

{#each foods as food}
  <Card name={food.name} price={food.price} />
{/each}
 -->
