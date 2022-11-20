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
	import menu from '$lib/json/menu.json';
	import { goto } from '$app/navigation';
	export let data = [];
	let showData = [];
	onMount(() => {
		showData = data;
	});

	export let sale = false;
</script>

{#each showData as item, index}
	<div
		in:fly={{
			y: '100',
			delay: 100 * index,
			opacity: 0
		}}
		class="min-h-{item.height} hover:scale-105 cursor-pointer transition-all border-2 border-gray-300 {item.custom}"
		on:click={() => {
			if (sale) {
				goto(`/order/sale/${item.id}`);
			} else {
				goto(`/order/${item.id}`);
			}
		}}
		on:keypress={() => {}}
	>
		<img class="object-cover w-full h-{item.imageheight}" src={menu[item.id - 1].photo} alt="" />
		<div class="p-2 mb-4">
			<h1 class="text-{item.textsize} font-Kanit text-stone-700 font-bold">{menu[item.id - 1].name}</h1>
			<p class="text-{item.textsize} font-Kanit text-rose-600">
				{item.price != null ? item.price : menu[item.id - 1].price}.-
			</p>
		</div>
	</div>
{/each}

