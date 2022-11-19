<script>
  import { page } from '$app/stores';
  import menu from '$lib/json/menu.json';
  const { foodId } = $page.params;
  let food = menu[foodId - 1];

	let count = 1;
	let price = food.price;
	let totalprice = price;
	let egg = false;

  let options = [];

	function addPrice() {
		totalprice = price * count;
	}

	function addOrder() {
		count += 1;
	}

	function deleteOrder() {
		count -= 1;
	}
	function isZero(count) {
		return count == 0;
	}
  
  $: totalprice = price + options.reduce((acc, cur) => acc + cur.price, 0);

</script>

<div class="flex justify-center mb-10">
	<div class="w-96">
		<div class="relative">
			<button class="bg-black w-10 h-10 rounded-full absolute left-5 top-5 text-white">&lt</button>
			<img class="w-full" src=.{food.photo} alt="" />
		</div>
		<div class="p-10 border-2 border-b-[#d8d8d8]">
			<h1 class="text-4xl pb-5">{food.name}</h1>
			<p class="text-1xl ">รายระเอียด________</p>
		</div>
		<div class="p-10 border-2 border-b-[#d8d8d8]">
			<h2 class="text-2xl pb-5">เพิ่มเติม</h2>
      {#each food.options as option}
        <label>
          <input value={option} bind:group={options} type="checkbox" />
          {option.name} + {option.price} บาท
        </label><br />
      {/each}
		</div>
		<div class="p-10 border-2 border-b-[#d8d8d8]">
			<h2 class="text-2xl pb-7">รายละเอียดเพิ่มเติม</h2>
			<label>
				<input
					type="textbox"
					placeholder=" เช่น ไม่เอาผัก"
					class="border-2 border-[#d8d8d8] w-full"
				/>
			</label>
			<div class="relative w-full pb-11 pt-7">
				<p class="absolute left-12">{count}</p>
				{#if isZero(count)}
					<button
						disabled
						class="border-2 border-[#3d3d3d] w-7 h-7 rounded-full absolute hover:bg-black hover:text-white"
						on:click={deleteOrder}
						on:click={addPrice}
					>
						-
					</button>
				{:else}
					<button
						class="border-2 border-[#3d3d3d] w-7 h-7 rounded-full absolute hover:bg-black hover:text-white"
						on:click={deleteOrder}
						on:click={addPrice}
					>
						-
					</button>
				{/if}
				<button
					class=" border-2 border-[#3d3d3d] w-7 h-7 rounded-full absolute left-20 hover:bg-black hover:text-white"
					on:click={addOrder}
					on:click={addPrice}
				>
					+
				</button>
			</div>
			<div>
				{#if isZero(count)}
					<button class=" bg-[#3d3d3d] text-white w-full h-7 rounded-lg  hover:bg-[#272727] ">
						ยกเลิก
					</button>
				{:else}
					<button class=" bg-[#3d3d3d] text-white w-full h-7 rounded-lg  hover:bg-[#272727] ">
						เพิ่มลงตะกร้า {totalprice} บาท
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
