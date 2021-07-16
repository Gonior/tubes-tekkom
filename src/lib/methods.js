import {TYPE} from './type'

export const getKeywords = (arr) => {
    const result = []
    const arrIndex = []
    
    arr.forEach((e, index) => {
        try {
            if (TYPE.keywords.includes(e.value.trim())) {
                result.push({value : e.value.trim(), line : e.line.ln + 1, col : e.line.col})
                arrIndex.push(index)
            }
        } catch (err) {}
        
    });
    arr = arr.filter((v, index) => !arrIndex.includes(index))
    return {array : arr, result}

}
export const getOperators = (arr) => {
    const result = []
    const arrIndex = []
    arr.forEach((e, index) => {
        if (TYPE.operator.includes(e.value.trim())) {
            result.push({value : e.value.trim(), line : e.line.ln + 1, col : e.line.col})
            arrIndex.push(index)
        }
    });
    arr = arr.filter((v,index) => !arrIndex.includes(index))
    return {array : arr, result}
}
export const getSeparators = (arr) => {
    const result = []
    const arrIndex = []
    arr.forEach((e, index) => {
        if (TYPE.separator.includes(e.value.trim())) {
            result.push({value : e.value.trim(), line : e.line.ln + 1, col : e.line.col})
            arrIndex.push(index)
        }
    });
    arr = arr.filter((v,index) => !arrIndex.includes(index))
    return {array : arr, result}
}

export const getIdentifiers = (arr) => {
    const result = []
    const arrIndex = []
    arr.forEach((e, index) => {
        if (!/<newline>/gi.test(e.value.trim())) {
            result.push({value : e.value.trim(), line : e.line.ln + 1, col : e.line.col})
            arrIndex.push(index)
        }
    })
    arr = arr.filter((v, index) => !arrIndex.includes(index))
    return {array : arr, result}
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
            line = array[i].line
        } else if (/\"/g.test(array[i].value) && quoteDetected) {
            temp += array[i].value
            lastIndex = i
            if (/<newline>/g.test(temp)) temp = "\"\\n\""

            result.push({inx : {startIndex, lastIndex},value :temp, line : line.ln+1, col : line.col})
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
            try {
                if (array[i+1].value.trim() === "." && /\d/.test(array[i+2].value.trim())) {
                    startIndex = i;
                    lastIndex = i + 2;
                    exceptIndex = lastIndex
                    result.push({inx : {startIndex, lastIndex},value : `${array[i].value}.${array[lastIndex].value}`, line : array[i].line.ln+1, col : array[i].line.col})                
                } else if (/^[0-9]+\.?[0-9]*/.test(array[i].value.trim())) {
                    if (exceptIndex !== i && exceptIndex - 1 !== i) {
                        arrIndex.push(i)
                        result.push({inx : {startIndex, lastIndex},value : array[i].value, line : array[i].line.ln+1,col : array[i].line.col})
                    }
                } 
            } catch(err) {console.log(err)}

        } else if (/(this|false|true|null)/g.test(array[i].value)) {
            arrIndex.push(i)
            result.push({inx : {startIndex, lastIndex},value : array[i].value, line : array[i].line.ln+1,col : array[i].line.col})
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
    }
    return {array, result}
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
            line = arr[i].line
        } else if (/\*\//g.test(arr[i].value) && blockCommentDetected) {
            temp += arr[i].value
            lastIndex = i;
            
            result.push({
                inx : {
                    startIndex, lastIndex
                }, 
                line : line.ln + 1,
                col : line.col,
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
        let arrIndex = []
        result.forEach(a => {
            for(let i = a.inx.startIndex; i <= a.inx.lastIndex;i++) {
                arrIndex.push(i)
            }
        })
        arr = arr.filter((v, index )=> !arrIndex.includes(index))
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
        if (/\/\//g.test(arr[i].value)) {
            blockCommentDetected = true
            startIndex = i
            line = arr[i].line
        } else if (/<newline>/g.test(arr[i].value) && blockCommentDetected) {
            temp += arr[i].value
            lastIndex = i;
            result.push({
                inx : {
                    startIndex,
                    lastIndex
                },
                line : line.ln+1, 
                col : line.col,
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
        
        let arrIndex = []
        result.forEach(a => {
            for(let i = a.inx.startIndex; i <= a.inx.lastIndex;i++) {
                arrIndex.push(i)
            }
        })
        arr = arr.filter((v, index )=> !arrIndex.includes(index))
    }
    
    return {array : arr, result}
}

