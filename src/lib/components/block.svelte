<!-- <script>
    export let big = true;
</script>

<div class="{big ? "min-h-64" : "min-h-32"}  border-2 border-gray-300 row-start-1 col-start-1 row-span-2 col-span-2">
    <img class="" src="./cat.jpeg" alt="" />
    <div class="p-2">
        <h1 class="text-xl font-bold">name</h1>
        <p class="text-rose-600">price.-</p>
    </div>
</div> -->
<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	export let data = [];
    let showData = [];
    onMount(() => {
        showData = data;
    });

	// export let name = "unknow";
	// export let price = 0;
	// export let image = "unknow";
	// export let custom = "row-start-1 col-start-1 row-span-2 col-span-2";
	// export let height = 32;
	// export let textsize = "xs";
	// export let imageheight = 2/3;
</script>

{#each showData as item, index}
	<div in:fly={{
        y: '100',
        delay: 100 * index,
        opacity: 0
    }} class="min-h-{item.height}  border-2 border-gray-300 {item.custom}">
		<img class="object-cover w-full h-{item.imageheight}" src={item.image} alt="" />
		<div class="p-2 mb-4">
			<h1 class="text-{item.textsize} text-stone-700 font-bold">{item.name}</h1>
			<p class="text-{item.textsize} text-rose-600">{item.price}.-</p>
		</div>
	</div>
{/each}

<!-- <div transition:fade={{delay:1000}} class="min-h-{height}  border-2 border-gray-300 {custom}">
    <img class="object-cover w-full h-{imageheight}" src="{image}" alt="" />
    <div class="p-2 mb-4">
        <h1 class="text-{textsize} text-stone-700 font-bold">{name}</h1>
        <p class="text-{textsize} text-rose-600">{price}.-</p>
    </div>
</div> -->
