<script>
	import Block from '$lib/components/block.svelte';
	import flashSaleData from '$lib/json/flashSale.json';
	import recommendData from '$lib/json/recommend.json';
	import { onMount } from 'svelte';

	// onMount(async () => {
	// 	test = flashSaleData;
	// })

	let ele;
	let eleData = {
		width: 0,
		height: 0
	};
	let count = 0;

	var des = new Date().setHours(23, 59, 59, 0);
	var now = new Date().getTime();
	let diff_time = (des - now) / 1000;
	let hr = Math.floor(diff_time / (60 * 60))
		.toString()
		.padStart(2, 0);
	let min = Math.floor((diff_time % (60 * 60)) / 60)
		.toString()
		.padStart(2, 0);
	let sec = Math.floor(diff_time % 60)
		.toString()
		.padStart(2, 0);

	let timer = setInterval(() => {
		diff_time -= 1;
		hr = Math.floor(diff_time / (60 * 60))
			.toString()
			.padStart(2, 0);
		min = Math.floor((diff_time % (60 * 60)) / 60)
			.toString()
			.padStart(2, 0);
		sec = Math.floor(diff_time % 60)
			.toString()
			.padStart(2, 0);
		if (diff_time <= 0) {
			clearInterval(timer);
			hr = '00';
			min = '00';
			sec = '00';
		}
	}, 1000);
</script>

<div class="w-full h-[512px] z-10 absolute">
	<button
		class="w-[50px] h-[50px] rounded-full absolute top-[231px] left-10"
		on:click={() => {
			if (count - 1 < 0) {
				count = 3;
			} else {
				count--;
			}
			ele.scrollLeft = eleData.width * count;
		}}
	>
		<img
			class="object-cover select-none z-20 bg-white bg-opacity-50 rounded-full p-2"
			src="./prev.png"
			alt=""
		/>
	</button>
	<button
		class="w-[50px] h-[50px] rounded-full absolute top-[231px] right-10"
		on:click={() => {
			count = (count + 1) % 4;
			ele.scrollLeft = eleData.width * count;
		}}
	>
		<img
			class="object-cover select-none z-20 bg-white bg-opacity-50 rounded-full p-2"
			src="./next.png"
			alt=""
		/>
	</button>
	<div class="w-full h- z-50 absolute top-[90%] inline-flex gap-5 place-content-center">
		<div class="w-4 z-20 h-4 {count == 0 ? 'bg-white' : 'bg-gray-500'} opacity-50 rounded-full" />
		<div class="w-4 z-20 h-4 {count == 1 ? 'bg-white' : 'bg-gray-500'} opacity-50 rounded-full" />
		<div class="w-4 z-20 h-4 {count == 2 ? 'bg-white' : 'bg-gray-500'} opacity-50 rounded-full" />
		<div class="w-4 z-20 h-4 {count == 3 ? 'bg-white' : 'bg-gray-500'} opacity-50 rounded-full" />
	</div>
</div>

<div
	bind:this={ele}
	bind:clientWidth={eleData.width}
	bind:clientHeight={eleData.height}
	class="w-full h-[512px] flex flex-nowrap overflow-scroll snap-x snap-mandatory scroll-smooth no-scrollbar"
>
	<img class="snap-center object-cover w-full flex-shrink-0 " src="./Promo1.jpg" alt="" />
	<img class="snap-center object-cover w-full flex-shrink-0 " src="./Promo2.jpg" alt="" />
	<img class="snap-center object-cover w-full flex-shrink-0 " src="./Promo3.jpg" alt="" />
	<img class="snap-center object-cover w-full flex-shrink-0 " src="./Promo4.jpg" alt="" />
</div>

<div class="w-screen flex flex-col items-center">
	<div class="my-12 flex flex-col items-center">
		<div class="inline-flex gap-4 mb-6">
			<p class="text-2xl mb-4 font-Taviraj">FLASH SALE!</p>
			<div class="w-40 h-9 inline-flex gap-1">
				<div class="w-12 h-9 bg-stone-800 rounded-md text-center">
					<p class="text-white text-2xl font-bold">{hr}</p>
				</div>
				<p class="text-stone-500 text-2xl font-bold">:</p>
				<div class="w-12 h-9 bg-stone-800 rounded-md text-center">
					<p class="text-white text-2xl font-bold">{min}</p>
				</div>
				<p class="text-stone-500 text-2xl font-bold">:</p>
				<div class="w-12 h-9 bg-stone-800 rounded-md text-center">
					<p class="text-white text-2xl font-bold">{sec}</p>
				</div>
			</div>
		</div>
		<hr class="w-20 border-4 border-stone-800" />
	</div>

	<div class="max-w-xl h-fit p-2 grid grid-cols-4 grid-rows-3 gap-2">
		<Block sale=true data={flashSaleData}></Block>
	</div>

	<div class="my-12 flex flex-col items-center">
		<div class="inline-flex mb-6">
			<p class="text-2xl mb-4 font-Taviraj">WE RECOMMEND</p>
		</div>
		<hr class="w-20 border-4 border-stone-800" />
	</div>

	<div class="max-w-xl h-fit p-2 grid grid-cols-4 grid-rows-3 gap-2 mb-10">
		<Block data={recommendData}></Block>
	</div>
</div>
