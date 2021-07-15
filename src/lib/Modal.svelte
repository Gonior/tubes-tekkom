<script>
  import {createEventDispatcher} from 'svelte'
  import {scale} from 'svelte/transition'
  const dispatch = createEventDispatcher();
  export let openModal = false;
  const closeModal = () => {
    dispatch('close', {
			openModal : false
		});
    openModal = !openModal
  }
  const code = [
    {
      line : 1,
      content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet, massa a molestie vehicula, sem nulla blandit lorem, a eleifend elit mi ac sapien. Duis pulvinar sem a arcu congue auctor. Phasellus sollicitudin tristique cursus. Praesent arcu dolor, gravida in sem non, bibendum gravida nibh. Maecenas sodales "
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : "1,2",
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 2,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 2,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 2,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 1,
      content : "lorem ipsum sir dolot amet"
    },
    {
      line : 2,
      content : "lorem ipsum sir dolot amet"
    },
    
  ]

</script>
{#if openModal}
<div class="absolute inset-0 overflow-hidden  z-10" transition:scale={{duration : 200}}>
  <div class="flex flex-col h-screen bg-gray-200">
    <div class="flex-none">
      <div class="px-4 pt-4 flex justify-between items-center "> 
        <h1 class="text-gray-400 font-semibold text-xl">Result of Analysis</h1>  
        <button on:click="{closeModal}" class="no-tap-highlighting py-2 px-4 rounded bg-pink-600 hover:bg-pink-700 flex text-white focus:outline-none items-center space-x-1">
          <svg class="h-5 w-5"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 19l-7-7 7-7M3 12h18"/></svg>
          <span>Back</span>
        </button>
      </div>
    </div>
    <div class="flex-grow">
      <div class="flex px-4 py-2 h-full">
        <div class="flex-none">
          <div class="flex flex-col px-4 py-2 border-2 border-pink-600 rounded space-y-2 items-start">
            <button class="px-2 py-2 border-l-2 border-pink-600 text-pink-600 focus:outline-none block">Literal</button>
            <button class="px-2 py-2 focus:outline-none">Keyword</button>
            <button class="px-2 py-2 focus:outline-none">Comments</button>
          </div>
        </div>
        <div class="flex-grow w-full">
          <div class="flex flex-col px-2 border-2 border-pink-600 rounded ml-2 overflow-y-auto h-4/5" >
            <table class="relative w-full">
              <thead class="">
                <tr class="">
                  <th class=" w-14 text-center sticky top-0 bg-gray-200">
                    line
                  </th>
                  <th class="text-left sticky top-0 bg-gray-200">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {#each code as c}
                <tr>
                  <td class="text-center text-gray-400">{c.line}</td>
                  <td>{c.content}</td>
                </tr>
                {/each}
              </tbody>
            </table>          
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}

<style>

/* Let's get this party started */
::-webkit-scrollbar {
    width: 6px;
}
 
/* Track */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: rgba(214, 1, 168, 0.8); 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
::-webkit-scrollbar-thumb:window-inactive {
	background: rgba(214, 1, 168, 0.8); 
}
</style>