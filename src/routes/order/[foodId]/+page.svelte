<script>
	import { page } from '$app/stores';
	import menu from '$lib/json/menu.json';
	import { goto } from '$app/navigation';
	import { userLogin, addNotification } from '$lib/store.js';
	import { onMount } from 'svelte';
	const { foodId } = $page.params;
	let food = {
		name: '',
		price: 0,
		desc: '',
		photo: './ไข่ดาว.jpg',
		options: []
	};

	onMount(async () => {
		if (!menu[foodId - 1]) {
			goto('/menu');
			return;
		} else {
			food = menu[foodId - 1];
			price = food.price;
			totalprice = price;
		}

	});

	let count = 1;
	let price;
	let totalprice;

	let options = [];

	function addOrder() {
		count += 1;
	}

	function deleteOrder() {
		count -= 1;
	}
	function isZero(count) {
		return count == 0;
	}

	$: totalprice = (price + options.reduce((acc, cur) => acc + cur.price, 0)) * count;
</script>

<svelte:head>
	<title>{food.name}</title>
</svelte:head>

<div class="flex justify-center mb-10 font-Kanit">
	<div class="w-3/4">
		<div class="relative">
			<button
				on:click={() => {
					goto('/menu');
				}}
				class="bg-black w-10 h-10 rounded-full absolute left-5 top-5 text-white"
			>
				<img
					class="object-cover select-none z-20 bg-black bg-opacity-50 rounded-full p-2"
					src="../prev.png"
					alt=""
				/>
			</button>
			<img class="w-full" src="{food.photo}" alt="" />
		</div>
		<div class="p-10 border-2 border-b-[#d8d8d8]">
			<h1 class="text-4xl font-semibold pb-5 font-Kanit">{food.name}</h1>
			<p class="text-1xl font-Kanit text-neutral-500">{food.desc}</p>
		</div>
		<div class="p-10 border-2 border-b-[#d8d8d8]">
			<h2 class="text-2xl pb-5 font-Kanit">เพิ่มเติม</h2>
			{#if food.options.length == 0}
				<div class="" />
				ไม่มีตัวเลือกเพิ่มเติม
			{/if}
			{#each food.options as option}
				<label>
					<input value={option} bind:group={options} type="checkbox" />
					{option.name} + {option.price} บาท
				</label><br />
			{/each}
		</div>
		<div class="p-10 border-2 border-b-[#d8d8d8]">
			<h2 class="text-2xl pb-7 font-Kanit">รายละเอียดเพิ่มเติม</h2>
			<label>
				<input
					type="textbox"
					placeholder=" เช่น ไม่เอาผัก"
					class="border-2 border-[#d8d8d8] w-full h-10"
				/>
			</label>
			<div class="w-full flex justify-center items-center p-3">
				<div class="flex justify-center items-center gap-3">
					<button
						disabled={count <= 0}
						class="w-7 h-7 border-2 border-[#3d3d3d] rounded-full hover:bg-black hover:text-white"
						on:click={deleteOrder}>-</button
					>
					<div class="bg-black w-10 h-10 rounded-full text-white flex justify-center items-center">
						{count}
					</div>
					<button
						class="w-7 h-7 border-2 border-[#3d3d3d] rounded-full hover:bg-black hover:text-white"
						on:click={addOrder}>+</button
					>
				</div>
			</div>
			<div>
				{#if isZero(count)}
					<button
						on:click={() => {
							goto('/menu');
						}}
						class=" bg-[#3d3d3d] text-white w-full flex justify-center items-center h-7 rounded-lg p-5 hover:bg-[#272727] "
					>
						ยกเลิก
					</button>
				{:else}
					<button
						class=" bg-[#3d3d3d] text-white w-full flex justify-center items-center h-7 rounded-lg p-5 hover:bg-[#272727] "
						on:click={() => {
							if ($userLogin) {
								let order = {
									name: food.name,
									quantity: count,
									option: options,
									price: totalprice
								};
								let orders = JSON.parse(localStorage.getItem($userLogin + 'orders')) || [];
								orders.push(order);
								localStorage.setItem($userLogin + 'orders', JSON.stringify(orders));
								addNotification('เพิ่มรายการสำเร็จ', 'success', 2000);
							} else {
								goto('/login');
							}
						}}
					>
						เพิ่มลงตะกร้า {totalprice} บาท
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
