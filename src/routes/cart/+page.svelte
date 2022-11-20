<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { goto, afterNavigate } from '$app/navigation';

	import { userLogin } from '$lib/store.js';

	let deliveryWhen = 'now';

	let deliverySelect = -1;

	let deliveryData = [];

	onMount(() => {
		if ($userLogin == null) {
			goto('/login');
			return;
		}
		deliveryData = localStorage.getItem($userLogin + 'deliveryData')
			? JSON.parse(localStorage.getItem($userLogin + 'deliveryData'))
			: deliveryData;
		data = localStorage.getItem($userLogin + 'orders')
			? JSON.parse(localStorage.getItem($userLogin + 'orders'))
			: data;
		deliverySelect = deliveryData.length == 0 ? -1 : 0;
	});

	let data = [];

	let CalTotal = (item) => {
		let total = 0;
		total += item.price;
		item.option.forEach((opt) => {
			total += opt.price;
		});
		return total * item.quantity;
	};

	let calAllTotal = (data) => {
		let total = 0;
		data.forEach((item) => {
			total += CalTotal(item);
		});
		return total;
	};
</script>

<div class="w-full flex justify-center flex-col items-center font-Taviraj gap-10">
	<div
		class="w-3/4 py-3 flex flex-col gap-2 justify-center items-center border-b border-black bg-gray-100"
	>
		<div>ส่งไปยัง</div>
		{#if deliveryData.length == 0}
			<div
				transition:fly={{ y: 100, duration: 250, opacity: 0 }}
				class="flex justify-center items-center w-3/4 h-10 bg-stone-800 text-white"
			>
				กรุณาเพิ่มที่อยู่ในการจัดส่ง
			</div>
		{/if}
		{#each deliveryData as item, index}
			<div
				class="w-11/12 transition-all relative rounded-lg bg-slate-200 p-1 {index == deliverySelect
					? 'border border-green-600'
					: 'border border-transparent'}"
				transition:fly={{ y: -100, duration: 250, delay: 100 * index, opacity: 0 }}
			>
				<div class="flex justify-center items-center">
					<label class="w-1/6 flex justify-center items-center gap-2">
						<input
							bind:group={deliverySelect}
							disabled={item.editMode}
							type="radio"
							name="useAddress"
							value={index}
						/>
						ที่อยู่
					</label>
					<div class="w-3/4 min-h-[5rem]">
						<div class="flex p-2 gap-1">
							{#if !item.editMode}
								<div class="w-full h-[4rem] overflow-y-scroll">
									{item.address}
								</div>
							{:else}
								<textarea bind:value={item.address} class="w-full" cols="10" rows="3" />
							{/if}
						</div>
					</div>
					<div class="w-1/4 flex justify-center items-center py-2 border-l border-black">
						<button
							on:click={() => {
								item.editMode = !item.editMode;
								deliverySelect = -1;
								if (!item.editMode && item.address == '') {
									deliveryData.splice(index, 1);
									deliveryData = deliveryData;
									deliverySelect = deliveryData.length == 0 ? -1 : 0;
									return;
								}

								if (!item.editMode) {
									deliverySelect = index;
								}
								localStorage.setItem($userLogin + 'deliveryData', JSON.stringify(deliveryData));
							}}>{item.editMode ? 'บันทึก' : 'แก้ไข'}</button
						>
					</div>
				</div>
				<div class="absolute top-1 right-2">
					<button
						on:click={() => {
							deliveryData.splice(index, 1);
							deliverySelect = deliveryData.length == 0 ? -1 : 0;
							deliveryData = deliveryData;
							localStorage.setItem($userLogin + 'deliveryData', JSON.stringify(deliveryData));
						}}
					>
						ลบ
					</button>
				</div>
			</div>
		{/each}
		<button
			on:click={() => {
				deliveryData.push({ address: '', editMode: true });
				deliveryData = deliveryData;
			}}
		>
			เพิ่มที่อยู่
		</button>
	</div>

	<div class="w-3/4 flex flex-col justify-center items-center bg-gray-100 rounded-b-xl">
		<div class="w-full h-[1px] border-b border-black" />
		<h1 class="text-3xl p-8">รายการสั่งซื้อ</h1>
		<div class="w-full h-[1px] border-b border-black" />
		<!-- Menu -->
		<div class="w-full m-3 px-3">
			{#if data.length == 0}
				<div>
					ไม่มีสินค้่าในตะกร้า <span
						><button
							on:click={() => {
								goto('./menu');
							}}
							class="p-2 bg-stone-800 text-white rounded-lg">ดู Menu</button
						></span
					>
				</div>
			{/if}
			{#each data as item, index}
				<div
					in:fly={{ y: 10, delay: 100 * index, opacity: 0 }}
					out:fly={{ y: 10, delay: 100, opacity: 0 }}
					class="w-full"
				>
					<div class="item w-full flex justify-between px-1">
						<p class="w-1/3">{item.name}</p>
						<p class="w-1/3 text-left">x{item.quantity}</p>
						<p>
							{CalTotal(item)}
							<span
								><button
									on:click={() => {
										data.splice(index, 1);
										data = data;
										localStorage.setItem($userLogin + 'orders', JSON.stringify(data));
									}}>ลบ</button
								></span
							>
						</p>
					</div>
					{#each item.option as option}
						<div
							in:fly={{ y: 10, delay: 110 * index, opacity: 0 }}
							class="pl-5 pr-1 w-full flex justify-between"
						>
							<p class="w-1/3">{option.name}</p>
							<p>{option.price}</p>
						</div>
					{/each}
				</div>
			{/each}
		</div>
		<div class="w-full h-[1px] border-b border-black" />
		<div class="w-full px-3 pt-3 pb-14">
			<div class="w-full flex justify-between px-1">
				<p class="w-1/3">ค่าอาหาร</p>
				<p>{calAllTotal(data)} บาท</p>
			</div>

			<div class="w-full flex justify-between px-1">
				<p class="w-1/3">ค่าส่ง</p>
				<p>{calAllTotal(data) * 0.25} บาท</p>
			</div>

			<div class="w-full flex justify-between px-1">
				<p class="w-1/3">รวมทั้งหมด</p>
				<p>{calAllTotal(data) * 1.25} บาท</p>
			</div>
		</div>
	</div>

	<div class="w-3/4 flex justify-around items-center">
		<div>
			<label>
				<input bind:group={deliveryWhen} type="radio" name="when" value="now" />
				จัดส่งทันที</label
			>
		</div>
		<div>
			<label>
				<input bind:group={deliveryWhen} type="radio" name="when" value="selectTime" />
				จัดส่งในเวลา</label
			>
		</div>
	</div>
	<div class="w-full flex justify-center items-center">
		{#if deliveryWhen === 'selectTime'}
			<div transition:fade class="w-3/4 flex justify-center items-center">
				<input class="w-1/2 text-xl" type="time" name="time" id="time" value="00:00" />
			</div>
		{/if}
	</div>
	<div class="w-full flex justify-center items-center">
		<button
			on:click={() => {
				localStorage.setItem($userLogin + 'deliType', deliveryWhen);
				goto('/done')
			}}
			class="w-3/4 rounded-xl bg-black text-white py-3 mb-10 transition-all hover:bg-slate-800 active:bg-slate-600"
			>ยืนยันการสั่งซื้อ</button
		>
	</div>
</div>
