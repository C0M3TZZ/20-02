<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { userLogin } from '$lib/store.js';

	let deliType;

	onMount(() => {
		deliType = localStorage.getItem($userLogin + 'deliType');
		if (deliType == null) {
			goto('/menu');
		}
	});
</script>

<svelte:head>
	<title>Check Out</title>
</svelte:head>

<div class="h-screen w-full flex justify-center items-center">
	<div class="flex justify-center w-3/4 flex-col items-center">
		<img src={deliType == 'now' ? '/cooking.png' : '/clock.png'} alt="" />
		<h1 class="text-3xl p-10 font-Kanit">
			{deliType == 'now'
				? 'เรากำลังจัดเตรียมอาหารให้คุณ!'
				: 'เราจะจัดส่งอาหารให้ตามเวลาที่คุณกำหนด!'}
		</h1>
		<button
			on:click={() => {
				localStorage.removeItem($userLogin + 'deliType');
				localStorage.removeItem($userLogin + 'orders');
				goto('/');
			}}
			class="w-2/4 h-20 bg-stone-800 text-3xl text-white rounded-lg p-2v font-Kanit">กลับหน้าแรก</button
		>
	</div>
</div>
