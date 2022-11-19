<script>
	export let name = 'ชื่ออาหาร';
	export let price = '99';
	export let img =
		'https://static01.nyt.com/images/2021/02/17/dining/17tootired-grilled-cheese/17tootired-grilled-cheese-articleLarge.jpg?quality=75&auto=webp&disable=upscale';
	export let link = '#';
</script>

<div class="max-w-sm font-Taviraj bg-white shadow-sm border border-gray-200 rounded-lg ">
	<a href={link}>
		<img
			class="object-cover rounded-t-lg h-72 w-full hover:opacity-60 transition duration-500"
			src={img}
			alt="food"
		/>
		<div class="px-5 pb-6 border-t border-gray-200">
			<h1 class="text-xl font-semibold mt-3" id="name">{name}</h1>
			<span class="font-bold text-red-600 mt-2" id="price">ราคา : {price} บาท</span>
		</div>
	</a>
</div>

