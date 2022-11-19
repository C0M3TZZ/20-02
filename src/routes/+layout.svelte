<script>
	import '../app.postcss';	
</script>

<div class="font-Taviraj text-xl">
	<div class="flex justify-between items-center px-5 py-2">
		<div>
			Menu
		</div>
		<div class="text-5xl">
			20:02
		</div>
		<div>
			Cart
		</div>
	</div>
	<div class="w-full h-[1px] border"></div>
	<div class="flex justify-center gap-2 py-2 select-none">
		<button class="border-b-2 border-transparent hover:border-black transition-all">Home</button>
		<p>/</p>
		<button class="border-b-2 border-transparent hover:border-black transition-all">Menu</button>
	</div>
	<div class="w-full h-[1px] border"></div>

</div>
<slot />
<div class="w-full flex flex-col justify-center items-center font-Taviraj p-3 bg-black text-white">
	<h1 class="text-3xl">Member</h1>
	<div class="w-1/12 h-[1px] border-white border-b-2 mb-2"></div>
	<p>เขมฐิติ หวังทรัพย์ทวี 64070011</p>
	<p>พลวิชญ์ ดวงสุข 64070072</p>
	<p>พีรวิชญ์ กริชฉกาจ 64070076</p>
	<p>ภาพตะวัน ปัญญาพานิชกุล 64070085</p>
	<p>พรนภัส สิงห์คำ 64070194</p>
</div>
