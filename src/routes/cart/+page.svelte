<script>
	import { fade, fly } from "svelte/transition";


	let deliveryWhen = 'now';

	let deliverySelect = 0;

	let deliveryData = [
		{
			address: '123 ถนน สุขุมวิท แขวง บางนา เขต บางนา กรุงเทพมหานคร 10260',
			editMode: false
		}
	];

	let data = [
		{
			name: 'TEST',
			price: 100,
			quantity: 3,
			option: [
				{
					name: 'Opt 01',
					price: 10
				}
			]
		},
		{
			name: 'TEST2',
			price: 100,
			quantity: 8,
			option: [
				{
					name: 'Opt 01',
					price: 10
				},
				{
					name: 'Opt 01',
					price: 10
				}
			]
		}
	];

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
		{#each deliveryData as item, index}
			<div
				class="w-11/12 transition-all relative bg-slate-200 p-1 {index == deliverySelect
					? 'border border-green-600'
					: 'border'}"
        transition:fly={{y: -100, duration: 250}}
			>
				<div class="flex justify-center items-center">
					<label class="w-1/6 flex justify-center items-center gap-2">
						<input bind:group={deliverySelect} type="radio" name="useAddress" value={index} />
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
							}}>แก้ไข</button
						>
					</div>
				</div>
				<div class="absolute top-1 right-2">
					<button
						on:click={() => {
							deliveryData.splice(index, 1);
							deliveryData = deliveryData;
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
			{#each data as item}
				<div class="w-full">
					<div class="item w-full flex justify-between px-1">
						<p class="w-1/3">{item.name}</p>
						<p class="w-1/3 text-left">x{item.quantity}</p>
						<p>{CalTotal(item)}</p>
					</div>
					{#each item.option as option}
						<div class="pl-5 pr-1 w-full flex justify-between">
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
		<button class="w-3/4 rounded-xl bg-black text-white py-3 mb-10 transition-all hover:bg-slate-800 active:bg-slate-600">ยืนยันการสั่งซื้อ</button>
	</div>
</div>
