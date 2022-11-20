<script>
	import '../app.postcss';
	import { goto } from '$app/navigation';
	import { userLogin, addNotification, nofitication } from '$lib/store.js';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	let user = $userLogin;

	// onMount(() => {
	// 	addNotification('ยังไม่มีรายการอาหารในตะกร้า', 'success', 5000);
	// 	addNotification('2', 'primary', 1000);
	// });

	$: {
		user = $userLogin;
	}
	let path = $page.url.pathname;

	$: {
		path = $page.url.pathname;
	}
</script>

<div class="fixed z-50 top-0 w-full flex flex-col justify-center items-center mt-2 gap-2">
	{#each $nofitication as noti}
		<div
			transition:fly={{ y: -100, opacity: 0 }}
			class:bg-stone-800={noti.type == 'primary'}
			class:bg-green-800={noti.type == 'success'}
			class:bg-red-800={noti.type == 'danger'}
			class:bg-yellow-800={noti.type == 'warning'}
			class="w-2/4 p-2 rounded-lg flex justify-center items-center text-white"
		>
			{noti.message}
		</div>
	{/each}
</div>

<div class="font-Taviraj text-xl">
	<div class="flex justify-between items-center px-5 py-2">
		{#if user != null}
			<button
				on:click={() => {
					userLogin.set(null);
					addNotification('ออกจากระบบสำเร็จ', 'success', 5000);
					goto('/');
				}}
			>
				Sign Out
			</button>
		{:else}
			<button
				on:click={() => {
					goto('/login');
				}}
			>
			Sign In
			</button>
		{/if}
		<button on:click={() => {goto('/')}} class="text-5xl">20:02</button>
		<button
			on:click={() => {
				goto('/cart');
			}}
		>
		<span class="material-icons">
			shopping_cart
			</span>
		</button>
	</div>
	<div class="w-full h-[1px] border" />
	<div class="flex justify-center gap-2 py-2 select-none">
		<button
			on:click={() => {
				goto('/');
			}}
			class="border-b-2 {path == '/'
				? 'border-stone-800'
				: 'border-transparent'} hover:border-stone-800 transition-all">Home</button
		>
		<p>/</p>
		<button
			on:click={() => {
				goto('/menu');
			}}
			class="border-b-2 {path == '/menu'
				? 'border-stone-800'
				: 'border-transparent'} hover:border-stone-800 transition-all">Menu</button
		>
	</div>
	<div class="w-full h-[1px] border" />
</div>
<slot />
<div
	class="w-full flex flex-col justify-center items-center p-3 bg-stone-800 text-white"
>
	<h1 class="text-3xl font-Taviraj">Member</h1>
	<div class="w-1/12 h-[1px] border-white border-b-2 mb-2" />
	<p class="font-Kanit">เขมฐิติ หวังทรัพย์ทวี 64070011</p>
	<p class="font-Kanit">พลวิชญ์ ดวงสุข 64070072</p>
	<p class="font-Kanit">พีรวิชญ์ กริชฉกาจ 64070076</p>
	<p class="font-Kanit">ภาพตะวัน ปัญญาพานิชกุล 64070085</p>
	<p class="font-Kanit">พรนภัส สิงห์คำ 64070194</p>
</div>
