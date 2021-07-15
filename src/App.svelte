<script>
  import Modal from './lib/Modal.svelte'
  let codeBase = "";
  let openModal = false
  const reset = () => {
    codeBase = "";
  }
  const analys = () => {
    openModal = !openModal
  }

  function detectionTab(e) {
    if (e.keyCode === 9 || e.which === 9) {
      e.preventDefault()
      let s = this.selectionStart;
      this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
      this.selectionEnd = s+1
    }
  }
</script>

<main class="h-screen p-4">
  <Modal code={codeBase} {openModal} on:close={(e) => openModal = e.detail.openModal }/>
  <div class="flex h-full flex-col space-y-2">
    <div class="flex justify-between items-center"> 
      <h1 class="text-gray-400 font-semibold text-xl">Compiler Java With Javascript</h1>
      <div class="space-x-2 flex">
        <button on:click={reset} class="no-tap-highlighting py-2 px-4 rounded border-pink-600 border-2 bg-transparent hover:border-pink-700 flex focus:outline-none items-center space-x-1">
          <span>Reset</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 17.29A8 8 0 105.06 11M3 6l2 5 5-2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>
        </button>
        <button on:click="{analys}" class="no-tap-highlighting py-2 px-4 rounded bg-pink-600 hover:bg-pink-700 flex text-white focus:outline-none items-center space-x-1">
          <span>Analysis</span>
          <svg class="h-5 w-5"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M20 10h-.59a1 1 0 01-.94-.67v0a1 1 0 01.2-1.14l.41-.41a1 1 0 000-1.42l-1.42-1.43a1 1 0 00-1.42 0l-.41.41a1 1 0 01-1.14.2h0a1 1 0 01-.69-.95V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v.59a1 1 0 01-.67.94h0a1 1 0 01-1.14-.2l-.41-.41a1 1 0 00-1.42 0L4.93 6.34a1 1 0 000 1.42l.41.41a1 1 0 01.2 1.14v0a1 1 0 01-.94.67H4a1 1 0 00-1 1v2a1 1 0 001 1h.59a1 1 0 01.94.67v0a1 1 0 01-.2 1.14l-.41.41a1 1 0 000 1.42l1.41 1.41a1 1 0 001.42 0l.41-.41a1 1 0 011.14-.2h0a1 1 0 01.67.94V20a1 1 0 001 1h2a1 1 0 001-1v-.59a1 1 0 01.67-.94h0a1 1 0 011.14.2l.41.41a1 1 0 001.42 0l1.41-1.41a1 1 0 000-1.42l-.41-.41a1 1 0 01-.2-1.14v0a1 1 0 01.94-.67H20a1 1 0 001-1V11a1 1 0 00-1-1z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>
        </button>
      </div>
    </div>
    <div class="h-full">
      <textarea on:keydown={detectionTab} bind:value={codeBase} class="resize-none h-full w-full p-2 focus:outline-none focus:ring-pink-600 rounded ring-2 ring-gray-400" placeholder="enter java code here"></textarea>
    </div>
  </div>
  
</main>
<style >

</style>

