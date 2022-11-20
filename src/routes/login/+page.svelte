<script>
	import { userLogin, addNotification } from '$lib/store.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	let email = '';
	let password = '';

	onMount(async () => {
		if ($userLogin) {
			goto('/menu');
			return;
		}
	});
</script>

<!--Video-->
<div class="2xl:container h-screen m-auto">
	<div hidden class="fixed inset-0 w-7/12 lg:block">
		<div
			class="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-7xl text-white"
		>
			<p>20-02</p>
			<div class="w-20">
				<div class="mt-4 border-t-4  border-white">
					<span class="block w-4 mx-auto mt-4" />
				</div>
			</div>
		</div>
		<video class="w-full h-full object-cover" autoplay loop src="/video/Lines-4760.mp4">
			<track kind="captions" />
		</video>
	</div>

	<!-- Head Login -->
	<div
		hidden
		class="fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block"
	/>
	<div class="relative h-full ml-auto lg:w-6/12">
		<div class="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
			<div class="space-y-4">
				<img class="w-40"/>
				<p class="text-5xl text-black">Sign In</p>
			</div>
			<div class="w-20">
				<div class="mt-4 border-t-4  border-black">
					<span class="block w-4 mx-auto mt-4" />
				</div>
			</div>

			<!--insert email-->
			<div action="" class="space-y-6 py-6">
				<div>
					<input
						bind:value={email}
						type="email"
						placeholder="Your Email"
						class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none shadow-xl"
					/>
				</div>

				<div class="flex flex-col items-end">
					<input
						bind:value={password}
						type="password"
						placeholder="Password"
						class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none shadow-xl"
					/>
				</div>

				<div>
					<div class="w-full flex justify-end">
						<a href="/reset" type="reset" class="w-max pt-0 pb-4 pr-4">
							<span class="text-xs tracking-wide text-blue-600">Forgot Password?</span>
						</a>
					</div>

					<button
						class="w-full px-6 py-3 mb-4 rounded-xl bg-neutral-900 transition hover:bg-slate-800  active:bg-slate-900 shadow-xl"
						on:click={() => {
							let userData = localStorage.getItem('userData')
								? JSON.parse(localStorage.getItem('userData'))
								: [];
							if (userData.find((user) => user.email === email && user.password === password)) {
								userLogin.set(email);
								goto('/');
								addNotification('เข้าสู่ระบบสำเร็จ', 'success', 3000);
							} else {
								addNotification('Email หรือ รหัสไม่ถูกต้อง', 'danger', 3000);
							}
						}}
					>
						<span class="font-semibold text-white text-lg">Sign In</span>
					</button>

					<div class="w-full flex mb-4 justify-center">
						<div class="w-72">
							<div class="mt-3 border-t">
								<span
									class="block w-max mx-auto -mt-3 px-4 text-center text-gray-500 bg-white bg-transparent"
									>Or</span
								>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Signup-->
			<form action="/signup">
				<button
					class="w-full px-6 py-3 rounded-xl bg-white transition hover:bg-slate-200 active:bg-slate-200 border-2 border-black shadow-xl"
				>
					<span class="font-semibold text-black text-lg">Sign Up</span>
				</button>
			</form>
		</div>
	</div>
</div>
