<script>
	import Card from '$lib/components/card.svelte';
	import menu from '$lib/json/menu';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	let categories = 'one';
	let selected;

	let changeMenu = async (category) => {
		selected = [];
		await setTimeout(() => {
			console.log('change menu');
			selected = menu[category];
		}, 500);
	};

	onMount(() => {selected = menu[categories]});
</script>

<div class="w-full flex justify-center items-center pt-5">
	<div class="w-3/4 flex justify-between items-center">
		<button on:click={() => {changeMenu('one')}} class="hover:bg-slate-700 rounded-lg text-xl transition-all hover:text-white p-2"
			>อาหารจานเดียว</button
		>
		<button on:click={() => {changeMenu('two')}} class="hover:bg-slate-700 rounded-lg text-xl transition-all hover:text-white p-2"
			>กับข้าว</button
		>
		<button on:click={() => {changeMenu('three')}} class="hover:bg-slate-700 rounded-lg text-xl transition-all hover:text-white p-2"
			>อาหารทานเล่น</button
		>
		<button on:click={() => {changeMenu('four')}} class="hover:bg-slate-700 rounded-lg text-xl transition-all hover:text-white p-2"
			>เครื่องดื่ม และ ของหวาน</button
		>
	</div>
</div>

<section class="max-w-4xl mx-auto my-10 grid grid-cols-3 gap-x-6 gap-y-8">
	<!-- example for food menu -->
	<!-- when you using card component that delete loop  -->
	{#if selected != null || undefined}
		{#each selected as item, index}
			<div transition:fly={{ y: 100, delay: 100 * index , opacity: 0}}>
				<Card name={item.name} price={item.price} img={item.photo} />
			</div>
		{/each}
	{/if}
	<!-- {#each { length: 10 } as _, i}
		<Card
			name="อาหาร {i + 1}"
			price={20 * (i + 1)}
			img="https://picsum.photos/id/{Math.floor(Math.random() * 100)}/400/400"
		/>
	{/each} -->
</section>
