<script>
	import Card from '$lib/components/card.svelte';
	import menu from '$lib/json/menu';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	let categories = 'Promo';
	let selected;
	let ele;

	let changeMenu = async (category) => {
		if (category === categories) {
			return;
		}
		
		selected = [];
		setTimeout(() => {
			categories = category;
			selected = menu.filter((item) => item.type === category);
		}, 100);
	};

	onMount(() => {selected = menu.filter((item) => item.type === categories);});
</script>

<svelte:head>
	<title>Menu</title>
</svelte:head>

<div class="w-full flex justify-center items-center pt-5">
	<div class="w-3/4 flex justify-between items-center">
		<button on:click={() => {changeMenu('Promo')}} class="font-Kanit hover:bg-stone-800 rounded-lg text-xl {categories == 'Promo' ? 'bg-stone-800 text-white' : ''} transition-all hover:text-white p-2"
			>โปรโมชั่น</button
		>
		<button on:click={() => {changeMenu('Main dish')}} class="font-Kanit hover:bg-stone-800 rounded-lg text-xl {categories == 'Main dish' ? 'bg-stone-800 text-white' : ''} transition-all hover:text-white p-2"
			>อาหารจานเดียว</button
		>
		<button on:click={() => {changeMenu('Side dish')}} class="font-Kanit hover:bg-stone-800 rounded-lg text-xl {categories == 'Side dish' ? 'bg-stone-800 text-white' : ''} transition-all hover:text-white p-2"
			>กับข้าว</button
		>
		<button on:click={() => {changeMenu('appetizer')}} class="font-Kanit hover:bg-stone-800 rounded-lg text-xl {categories == 'appetizer' ? 'bg-stone-800 text-white' : ''} transition-all hover:text-white p-2"
			>อาหารทานเล่น</button
		>
		<button on:click={() => {changeMenu('dessert')}} class="font-Kanit hover:bg-stone-800 rounded-lg text-xl {categories == 'dessert' ? 'bg-stone-800 text-white' : ''} transition-all hover:text-white p-2"
			>เครื่องดื่ม และ ของหวาน</button
		>
	</div>
</div>

<section bind:this={ele} class="max-w-4xl mx-auto my-10 grid grid-cols-3 gap-x-6 gap-y-8">
	<!-- example for food menu -->
	<!-- when you using card component that delete loop  -->
	{#if selected != null || undefined}
		{#each selected as item, index}
			<div in:fly={{ y: 100, delay: 50 * index , opacity: 0}}>
				<Card name={item.name} price={item.price} img={item.photo} link="/order/{item.id}"/>
			</div>
		{/each}
	{/if}
</section>
