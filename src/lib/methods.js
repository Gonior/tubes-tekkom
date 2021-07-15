export const getKeywords = () => {
    console.log('hallo dunia tipu tipu')

}

export const getStringLiteral = (array) => {
    //goal function  : mencari string literal dan mengembalikannya, mengembalikan array tanpa ada string literal    
    let quoteDetected = false
    let temp = ""
    let result = []
    let startIndex;
    let lastIndex;
    let arrIndex = []    
    let exceptIndex;    
    let line;
    //step 1 mencari tanda petik ganda (pembuka)    
    for (let i = 0; i < array.length; i++)  {
        if (/\"/g.test(array[i].value) && !quoteDetected) {
            quoteDetected = true
            startIndex = i
            line = array[i].line.ln+1
        } else if (/\"/g.test(array[i].value) && quoteDetected) {
            temp += array[i].value
            lastIndex = i
            result.push({inx : {startIndex, lastIndex},value :temp, line : line})
            temp = ""
            lastIndex = undefined
            startIndex = undefined
            quoteDetected = false
        }
        if (quoteDetected) {
            temp += array[i].value
        }   
    }    
    for (let i = 0; i < array.length; i++) {
        if (/\d/.test(array[i].value)) {
            if (array[i+1].value.trim() === "." && /\d/.test(array[i+2].value.trim())) {
                startIndex = i;
                lastIndex = i + 2;
                exceptIndex = lastIndex
                result.push({inx : {startIndex, lastIndex},value : `${array[i].value}.${array[lastIndex].value}`, line : array[i].line.ln+1})                
            } else if (/^[0-9]+\.?[0-9]*/.test(array[i].value.trim())) {
                if (exceptIndex !== i && exceptIndex - 1 !== i) {
                    arrIndex.push(i)
                    result.push({inx : {startIndex, lastIndex},value : array[i].value, line : array[i].line.ln+1})
                }
            }
        } else if (/(this|false|true|null)/g.test(array[i].value)) {
            arrIndex.push(i)
            result.push({inx : {startIndex, lastIndex},value : array[i].value, line : array[i].line.ln+1})
        }
        startIndex = undefined;
        lastIndex = undefined;
    }
    if (result.length > 0) {
        let arrWithoutresult = []
        result.map(v => {
            if (!!v.inx.startIndex && !!v.inx.lastIndex) {
                for (let x = v.inx.startIndex; x <= v.inx.lastIndex; x++ ) {
                    arrIndex.push(x)
                }
            }
        })        
        for (let i = 0; i < array.length;i++) {
            if (!arrIndex.includes(i)) arrWithoutresult.push(array[i])
        }
        array = [...arrWithoutresult]
        return {array, result}
    }
}

export const getBlockComment = (arr) => {
    let result = [];
    let temp = "";
    let blockCommentDetected = false
    let startIndex;
    let line;
    let lastIndex;
    for (let i = 0; i < arr.length; i++) {
        if (/\/\*/g.test(arr[i].value)) {
            blockCommentDetected = true
            startIndex = i
            line = arr[i].line.ln + 1
        } else if (/\*\//g.test(arr[i].value) && blockCommentDetected) {
            temp += arr[i].value
            lastIndex = i;
            result.push({
                inx : {
                    startIndex, lastIndex
                }, 
                line : line,
                value : temp.replace(/<newline>/g,'').trim()
            })
            lastIndex = undefined
            startIndex= undefined
            temp = ""
            blockCommentDetected = false
        }
        if (blockCommentDetected) temp += arr[i].value + " "
    }
    if (result.length > 0) {
        let sliceArray = []
        let arrIndex = []
        result.map(v => {
            for (let i = v.inx.startIndex; i <= v.inx.lastIndex; i++) {
                arr.push(i)
            }
        })
        for (let i = 0; i < arr.length; i++) {
            if(!arrIndex.includes(i)) sliceArray.push(arr[i])
        }
        arr = [...sliceArray]
    }
    
    return {array : arr, result}
}
export const getInlineComment = (arr) => {
    let result = [];        
    let temp = "";        
    let blockCommentDetected = false        
    let startIndex;        
    let lastIndex;
    let line;
    for (let i = 0; i < arr.length; i++) {
        if (/\/\//.test(arr[i].value)) {
            blockCommentDetected = true

            line = arr[i].line.ln + 1
        } else if (/<newline>/g.test(arr[i].value) && blockCommentDetected) {
            temp += arr[i].value
            lastIndex = i;
            result.push({
                inx : {
                    startIndex,
                    lastIndex
                },
                line : line, 
                value : temp.replace(/<newline>/g,'').trim()
            })
            lastIndex = undefined
            startIndex= undefined
            temp = ""
            line = undefined
            blockCommentDetected = false
            }
            if (blockCommentDetected) temp += arr[i].value + " "
    }
        if (result.length > 0) {
        let sliceArray = []            
        let arrIndex = []            
        result.map(v => {
            for (let i = v.inx.startIndex; i <= v.inx.lastIndex; i++) {
                arr.push(i)
            }            
        })
        for (let i = 0; i < arr.length; i++) {                
            if(!arrIndex.includes(i)) sliceArray.push(arr[i])            
        }            
        arr = [...sliceArray]        
    }
    return {array : arr, result}
}
export const getLiteral = (array) => {        
    let result = [];        
    let literalRegex = /[true|false|\d]/g
}

