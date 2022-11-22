<script>
	let ele;
	let eleData = {
		width: 0,
		height: 0
	};
	let count = 0;
</script>

<div class="w-full h-[512px] z-10 absolute">
  <button
  class="w-[50px] h-[50px] rounded-full absolute top-[231px] left-10"
  on:click={() => {
    if (count - 1 < 0) {
      count = 3;
    } else {
      count--;
    }
    ele.scrollLeft = eleData.width * count;
  }}
>
  <img
    class="object-cover z-20 bg-white bg-opacity-50 rounded-full p-2"
    src="/prev.png"
    alt=""
  />
</button>
<button
  class="w-[50px] h-[50px] rounded-full absolute top-[231px] right-10"
  on:click={() => {
    console.log(count);
    count = (count + 1) % 4;
    ele.scrollLeft = eleData.width * count;
  }}
>
  <img
    class="object-cover z-20 bg-white bg-opacity-50 rounded-full p-2"
    src="/next.png"
    alt=""
  />
</button>
<div class="w-full h- z-50 absolute top-[90%] inline-flex gap-5 place-content-center">
  <div class="w-4 h-4 bg-{count == 0? "white" : "slate-300"} opacity-90 rounded-full" />
  <div class="w-4 h-4 bg-{count == 1? "white" : "slate-300"} opacity-90 rounded-full" />
  <div class="w-4 h-4 bg-{count == 2? "white" : "slate-300"} opacity-90 rounded-full" />
  <div class="w-4 h-4 bg-{count == 3? "white" : "slate-300"} opacity-90 rounded-full" />
</div>
</div>

<div
	bind:this={ele}
	bind:clientWidth={eleData.width}
	bind:clientHeight={eleData.height}
	class="w-full h-[512px] flex flex-nowrap overflow-scroll snap-x snap-mandatory scroll-smooth no-scrollbar"
>
	<img class="snap-center object-cover w-full flex-shrink-0 " src="/cat1.jpg" alt="" />
	<img class="snap-center object-cover w-full flex-shrink-0 " src="/cat2.jpg" alt="" />
	<img class="snap-center object-cover w-full flex-shrink-0 " src="/cat3.jpg" alt="" />
	<img class="snap-center object-cover w-full flex-shrink-0 " src="/cat4.jpg" alt="" />
</div>
