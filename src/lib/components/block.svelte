<!-- <script>
    export let big = true;
</script>

<div class="{big ? "min-h-64" : "min-h-32"}  border-2 border-gray-300 row-start-1 col-start-1 row-span-2 col-span-2">
    <img class="" src="./cat.jpeg" alt="" />
    <div class="p-2">
        <h1 class="text-xl font-bold">name</h1>
        <p class="text-rose-600">price.-</p>
    </div>
</div> -->
<script>
    export let name = "unknow";
    export let price = 0;
    export let image = "unknow";
    export let custom = "row-start-1 col-start-1 row-span-2 col-span-2";
    export let height = 32;
    export let textsize = "xs";
    export let imageheight = 2/3;
</script>

<div class="min-h-{height}  border-2 border-gray-300 {custom}">
    <img class="object-cover w-full h-{imageheight}" src="{image}" alt="" />
    <div class="p-2 mb-4">
        <h1 class="text-{textsize} text-stone-700 font-bold">{name}</h1>
        <p class="text-{textsize} text-rose-600">{price}.-</p>
    </div>
</div>