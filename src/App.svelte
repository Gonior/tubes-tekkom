<script>
  import Modal from './lib/Modal.svelte'
  import {getStringLiteral, getBlockComment, getInlineComment, getKeywords, getOperators, getSeparators, getIdentifiers} from './lib/methods'
  import {TYPE} from './lib/type'
import { onMount } from 'svelte';
  let code = {};
  let openModal = false
  let codeBase = ""

  // let codeBase = `public class Test {
  //     public static void main(String args[]) {
  //         int[] numbers = {20.1,10,20,30,40,50, 10.5,};
  //         String mhs = "Dedi Cahya";
  //         boolean menikah = true;
  //         for(int : x : numbers) {
  //             System.out.print(x);            
  //             system.out.print(",");        
  //         }        
  //         // This is comment        
  //         System.out.print("\n");      
  //         String [] names = {"James", "Dedi cahya", "Agung", "Firman", "Dodo"};
  //         /* loop over */ 
  //         /* loop over */ 
  //         for (String name : names) {
  //             System.out.print(name);
  //             System.out.print(",");
  //         }
  //     }
  // }`
  const getLexeme = (str) => {    
    let resultwithLine = []
    let ln = 0;    
    let col = 0;
    let cols = []    
    let lexeme = "";    
    let whitespace = " ";
    const KEYWORDS = [...TYPE.keywords, ...TYPE.operator, ...TYPE.other_symbols, ...TYPE.separator, ...TYPE.symbols]
    let arrString = str.split("");
    
    for (let [index, value] of arrString.entries()) {
      if (value == "\n") {
          ln++            
          col = 0            
          cols = []
      }        
      col++
      
      if (value === "*") {
        if (arrString[index-1] === '/') lexeme +='/*'            
        else if(arrString[index+1] === '/') lexeme += "*/"            
        else if (/\d/g.test(arrString[index+1])) {
          cols.push(col)
          lexeme += "*"
          if (lexeme != "") {         
              resultwithLine.push({line : {ln, cols}, value : lexeme.replace('\n', '<newline>')})
              lexeme = ""
              cols = []
          }
          continue
        }
        else lexeme += "*"
      }
      else if (value === '/') {
        if (arrString[index+1] !== "*" && arrString[index -1 ] !== '*') {
          lexeme +='/'
        }
        else {
          cols.push(col)
          continue;
        }
      }
      else {
        if (value != whitespace) {
          lexeme += value;
          cols.push(col)
        }
        if (index+1 <= arrString.length) {
          console.log(arrString[index+1] == whitespace,arrString[index+1])
          if (arrString[index+1] == whitespace || KEYWORDS.includes(lexeme) || KEYWORDS.includes(arrString[index+1])) {
            
            if (lexeme != "") {
              resultwithLine.push({line : {ln, cols}, value : lexeme.replace('\n', '<newline>')})
              lexeme = ""
              cols = []
            }
          }
        }
      }
    }
    
    resultwithLine = resultwithLine.map(v => {        
        return {
            line : {
                ln : v.line.ln,                
                col : v.line.cols[0]        
            },
            value : v.value
        }
    })
    
    resultwithLine = resultwithLine.filter(v => !!v.value.trim())
    resultwithLine = resultwithLine.map(v => {
      return {value : v.value.trim(), line : v.line}
    })
    console.log(resultwithLine)
    return lexer(resultwithLine);
  }
  const lexer = (array) => {
      const result = {
          identifiers : [],
          keywords : [],
          separators : [],        
          operators : [],
          literals : [],
          comments : []
      }

      
      let commentsBlock = getBlockComment(array)
      result.comments = [...commentsBlock.result]    
      array = [...commentsBlock.array]
      
      let inlineComments = getInlineComment(array)
      result.comments = [...result.comments, ...inlineComments.result]
      array = [...inlineComments.array]
      
      let literals = getStringLiteral(array)
      result.literals = literals && [...literals.result.map(v => {return {value : v.value, line : v.line, col :v.col}})]
      array = literals && [...literals.array]

      let keywords = getKeywords(array)
      result.keywords = [...keywords.result]
      array = [...keywords.array]
      
      let operators = getOperators(array)
      result.operators = [...operators.result]
      array = [...operators.array]
      
      let separators = getSeparators(array)
      result.separators = [...separators.result]
      array = [...separators.array]
      
      let identifiers = getIdentifiers(array)
      result.identifiers = [...identifiers.result]
      array = [...identifiers.array]
      

      return result
  }
  onMount(() => {
    if (localStorage.getItem("sourceCode")) codeBase = JSON.parse(localStorage.getItem("sourceCode"))
  })
  const reset = () => { 
    localStorage.setItem("sourceCode", "")
    codeBase = "";
  }
  
  const analys = () => {
    if (codeBase) {
      code = getLexeme(codeBase)
      openModal = !openModal  
      
    }
    else alert("No java code detected")
    
  }
  
  const saveToLocal=() => {
    localStorage.setItem("sourceCode",JSON.stringify(codeBase))
    codeBase = JSON.parse(localStorage.getItem("sourceCode"))

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
  {#if openModal}
    <Modal {code} {openModal} on:close={(e) => openModal = e.detail.openModal }/>
  {/if}
  <div class="flex h-full flex-col space-y-2">
    <div class="flex justify-between items-center"> 
      <h1 class="text-gray-400 font-semibold text-xl">Scanner Java With Javascript</h1>
      <div class="space-x-2 flex">
        <button on:click={() => reset()} class="no-tap-highlighting py-2 px-4 rounded border-pink-600 border-2 bg-transparent hover:border-pink-700 flex focus:outline-none items-center space-x-1">
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
      <textarea on:keyup={saveToLocal} on:keydown={detectionTab} bind:value={codeBase} class="resize-none h-full w-full p-2 focus:outline-none focus:ring-pink-600 rounded ring-2 ring-gray-400" placeholder="enter java code here"></textarea>
    </div>
  </div>
  
</main>
<style >

</style>


