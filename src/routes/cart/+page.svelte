<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { goto, afterNavigate } from '$app/navigation';

	import { userLogin, addNotification } from '$lib/store.js';

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
		return total;
	};

	let calAllTotal = (data) => {
		let total = 0;
		data.forEach((item) => {
			total += CalTotal(item);
		});
		return total;
	};
</script>

<svelte:head>
	<title>Cart</title>
</svelte:head>

<div class="w-full flex justify-center flex-col items-center font-Kanit gap-10">
	<div
		class="w-3/4 py-3 flex flex-col gap-2 justify-center items-center border-b border-black bg-gray-100"
	>
		<div class="font-Kanit">ส่งไปยัง</div>
		{#if deliveryData.length == 0}
			<div
				transition:fly={{ y: 100, duration: 250, opacity: 0 }}
				class="flex justify-center items-center w-3/4 h-10 bg-stone-800 text-white rounded-sm font-Kanit"
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
					<label class="w-1/6 flex justify-center items-center gap-2 font-Kanit">
						<input
							bind:group={deliverySelect}
							disabled={item.editMode}
							type="radio"
							name="useAddress"
							value={index}
						/>
						ที่อยู่
					</label>
					<div class="w-3/4 min-h-[5rem] font-Kanit">
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
					<div class="w-1/4 flex justify-center items-center py-2 border-l border-black font-Kanit">
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
					<span class="material-icons"> delete </span>
					</button>
				</div>
			</div>
		{/each}
		<button class="w-24 h-10 rounded-md font-Kanit transition-all hover:bg-neutral-300"
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
		<h1 class="text-3xl p-8 font-Kanit">รายการสั่งซื้อ</h1>
		<div class="w-full h-[1px] border-b border-black" />
		<!-- Menu -->
		<div class="w-full m-3 px-3">
			{#if data.length == 0}
				<div class="font-Kanit">
					ไม่มีสินค้าในตะกร้า <span
						><button
							on:click={() => {
								goto('/menu');
							}}
							class="p-2 bg-stone-800 text-white rounded-lg font-Kanit">ดู Menu</button
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
					<div class="item w-full flex justify-between items-center px-1">
						<p class="w-1/3 font-Kanit">{item.name}</p>
						<p class="w-1/3 text-left font-Kanit">x{item.quantity}</p>
						<p class="flex justify-center items-center">
							{CalTotal(item)}.-
							<span
								><button
									on:click={() => {
										data.splice(index, 1);
										data = data;
										localStorage.setItem($userLogin + 'orders', JSON.stringify(data));
									}}><span class="material-icons"> delete </span></button
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
						</div>
					{/each}
				</div>
			{/each}
		</div>
		<div class="w-full h-[1px] border-b border-black" />
		<div class="w-full px-3 pt-3 pb-14">
			<div class="w-full flex justify-between px-1">
				<p class="w-1/3 font-Kanit">ค่าอาหาร</p>
				<p class="font-Kanit">{calAllTotal(data)} บาท</p>
			</div>

			<div class="w-full flex justify-between px-1">
				<p class="w-1/3 font-Kanit">ค่าส่ง</p>
				<p class="font-Kanit">{calAllTotal(data) * 0.25} บาท</p>
			</div>

			<div class="w-full flex justify-between px-1">
				<p class="w-1/3 font-Kanit">รวมทั้งหมด</p>
				<p class="font-Kanit">{calAllTotal(data) * 1.25} บาท</p>
			</div>
		</div>
	</div>

	<div class="w-3/4 flex justify-around items-center font-Kanit">
		<div>
			<label>
				<input bind:group={deliveryWhen} type="radio" name="when" value="now"/>
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
				if (deliverySelect == -1) {
					addNotification('กรุณาเลือกที่อยู่จัดส่ง', 'danger', 2000);
					return;
				}
				if (localStorage.getItem($userLogin + 'orders') == null || JSON.parse(localStorage.getItem($userLogin + 'orders')).length == 0) {
					addNotification('ไม่มีสินค้าในตะกร้า', 'danger', 2000);
					return;
				} else {
					localStorage.setItem($userLogin + 'deliType', deliveryWhen);
					goto('/done');
				}
					
			}}
			class="w-3/4 rounded-xl bg-stone-800 text-white py-3 mb-10 transition-all hover:bg-stone-600 active:bg-stone-600 font-Kanit"
			>ยืนยันการสั่งซื้อ</button
		>
	</div>
</div>
