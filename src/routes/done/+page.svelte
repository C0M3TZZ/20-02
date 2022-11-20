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

<div class="h-screen w-full flex justify-center items-center">
	<div class="flex justify-center w-3/4 flex-col items-center">
		<h1 class="text-3xl p-10">
			{deliType == 'now'
				? 'เรากำลังจะจัดสินอาหารให้คุณ!'
				: 'เราจะจัดส่งอาหารให้คุณตามเวลาที่คุณกำหนด!'}
		</h1>
		<button
			on:click={() => {
        localStorage.removeItem($userLogin + 'deliType');
        localStorage.removeItem($userLogin + 'orders');
				goto('/');
			}}
			class="w-3/4 bg-stone-800 text-3xl text-white rounded-lg p-2">กลับหน้าแรก</button
		>
	</div>
</div>
