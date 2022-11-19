<script>
	import Block from '$lib/components/block.svelte';
	import { fade, fly } from 'svelte/transition';
	// import Grid from './lib/components/gridLayout.svelte';
	let pos1 = 0;
	let pos2 = 100;
	let pos3 = 200;
	let pos4 = 300;
	let pos_bar = 1;
	let opa1 = 100;
	let opa2 = 50;
	let opa3 = 50;
	let opa4 = 50;

	let slideEle;

	let slideImg = ['./cat1.jpg', './cat2.jpg', './cat3.jpg', './cat4.jpg']

	let new_slide = 1;

	let move_slide = (index) => {
		new_slide = Math.abs((new_slide + index) % 4);
		slideEle.style.backgroundImage = `url(${slideImg[new_slide]})`;
	}

	var des = new Date('nov 19, 2022 11:47:00').getTime();
	var now = new Date().getTime();
	let diff_time = (des - now) / 1000;
	let hr = Math.floor(diff_time / (60 * 60)).toString().padStart(2,0);
	let min = Math.floor((diff_time % (60 * 60)) / 60).toString().padStart(2,0);
	let sec = Math.floor(diff_time % 60).toString().padStart(2,0);

	let timer = setInterval(() => {
		diff_time -=1
		hr = Math.floor(diff_time / (60 * 60)).toString().padStart(2,0);
	 	min = Math.floor((diff_time % (60 * 60)) / 60).toString().padStart(2,0);
	 	sec = Math.floor(diff_time % 60).toString().padStart(2,0);
		if (diff_time == 0) {
			clearInterval(timer);
			console.log("stop");
			hr = "00";
			min = "00";
			sec = "00";
			console.log(hr);
			console.log(min);
			console.log(sec);
		}
	}, 1000);
	
	function slide(word) {
		if (word == 'next') {
			pos1 = (pos1 - 100) % 400;
			pos2 = (pos2 - 100) % 400;
			pos3 = (pos3 - 100) % 400;
			pos4 = (pos4 - 100) % 400;
			pos_bar = Math.abs(pos_bar + 1) % 4;
		} else if (word == 'prev') {
			pos1 = (pos1 + 100) % 400;
			pos2 = (pos2 + 100) % 400;
			pos3 = (pos3 + 100) % 400;
			pos4 = (pos4 + 100) % 400;
			pos_bar = Math.abs(pos_bar - 1) % 4;
		}
		if (pos_bar == 1) {
			opa1 = 100;
			opa2 = 50;
			opa3 = 50;
			opa4 = 50;
		} else if (pos_bar == 2) {
			opa1 = 50;
			opa2 = 100;
			opa3 = 50;
			opa4 = 50;
		} else if (pos_bar == 3) {
			opa1 = 50;
			opa2 = 50;
			opa3 = 100;
			opa4 = 50;
		} else if (pos_bar == 0) {
			opa1 = 50;
			opa2 = 50;
			opa3 = 50;
			opa4 = 100;
			pos_bar = 4;
		}
		console.log(pos_bar);
	}
</script>

<div bind:this={slideEle} class="w-full h-[512px] bg-slate-400 relative overflow-hidden inline-flex" style="background-size: cover; background-position: center;">
	{#each slideImg as Item, index}
		{#if new_slide == index}
			<img
				transition:fly={{x:1000, duration:500, opacity: 1}}
				class="object-cover w-full h-full z-0 shrink-0"
				src={Item}
				alt=""
			/>
		{/if}
	{/each}
	<button
		class="w-[50px] h-[50px] rounded-full absolute top-[231px] left-10"
		on:click={() => move_slide(-1)}
	>
		<img
			class="object-cover z-20 bg-white bg-opacity-50 rounded-full p-2"
			src="./prev.png"
			alt=""
		/>
	</button>
	<button
		class="w-[50px] h-[50px] rounded-full absolute top-[231px] right-10"
		on:click={() => move_slide(1)}
	>
		<img
			class="object-cover z-20 bg-white bg-opacity-50 rounded-full p-2"
			src="./next.png"
			alt=""
		/>
	</button>
	<div class="w-full h- z-50 absolute top-[90%] inline-flex gap-5 place-content-center">
		<div class="w-4 h-4 bg-white opacity-{opa1} rounded-full" />
		<div class="w-4 h-4 bg-white opacity-{opa2} rounded-full" />
		<div class="w-4 h-4 bg-white opacity-{opa3} rounded-full" />
		<div class="w-4 h-4 bg-white opacity-{opa4} rounded-full" />
	</div>
</div>

<div class="w-screen h-screen flex flex-col items-center">
	<div class="my-12 flex flex-col items-center">
		<div class="inline-flex gap-4 mb-6">
			<p class="text-2xl mb-4">FLASH SALE!</p>
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
		<Block
			name="แมวต้ม"
			price="20"
			image="./cat1.jpeg"
			custom="row-start-1 col-start-1 row-span-2 col-span-2"
			height="64"
			textsize="xl"
			imageheight="3/4"
		/><Block
			name="แมวเจียว"
			price="30"
			image="./cat1.jpeg"
			custom="row-start-2 col-start-3 row-span-2 col-span-2"
			height="64"
			textsize="xl"
			imageheight="3/4"
		/><Block
			name="แมวตุ๋น"
			price="35"
			image="./cat1.jpeg"
			custom="row-start-3 col-start-1"
			height="32"
			textsize="xs"
			imageheight="2/3"
		/><Block
			name="แมวทอด"
			price="40"
			image="./cat1.jpeg"
			custom="row-start-3 col-start-2"
			height="32"
			textsize="xs"
			imageheight="2/3"
		/><Block
			name="แมวตากแห้ง"
			price="25"
			image="./cat1.jpeg"
			custom="row-start-1 col-start-3"
			height="32"
			textsize="xs"
			imageheight="2/3"
		/><Block
			name="แมวอบ"
			price="25"
			image="./cat1.jpeg"
			custom="row-start-1 col-start-4"
			height="32"
			textsize="xs"
			imageheight="2/3"
		/>
	</div>

	<div class="my-12 flex flex-col items-center">
		<div class="inline-flex mb-6">
			<p class="text-2xl mb-4">WE RECOMMEND</p>
		</div>
		<hr class="w-20 border-4 border-stone-800" />
	</div>

	<div class="max-w-xl h-fit p-2 grid grid-cols-4 grid-rows-3 gap-2">
		<Block
			name="แมวต้ม"
			price="20"
			image="./cat1.jpeg"
			custom="row-start-1 col-start-1 row-span-2 col-span-2"
			height="64"
			textsize="xl"
			imageheight="3/4"
		/><Block
			name="แมวเจียว"
			price="30"
			image="./cat1.jpeg"
			custom="row-start-1 col-start-3 row-span-2 col-span-2"
			height="64"
			textsize="xl"
			imageheight="3/4"
		/><Block
			name="แมวตุ๋น"
			price="35"
			image="./cat1.jpeg"
			custom="row-start-3 col-start-1"
			height="32"
			textsize="xs"
			imageheight="2/3"
		/><Block
			name="แมวทอด"
			price="40"
			image="./cat1.jpeg"
			custom="row-start-3 col-start-2"
			height="32"
			textsize="xs"
			imageheight="2/3"
		/><Block
			name="แมวตากแห้ง"
			price="25"
			image="./cat1.jpeg"
			custom="row-start-3 col-start-3"
			height="32"
			textsize="xs"
			imageheight="2/3"
		/><Block
			name="แมวอบ"
			price="25"
			image="./cat1.jpeg"
			custom="row-start-3 col-start-4"
			height="32"
			textsize="xs"
			imageheight="2/3"
		/>
	</div>
</div>
