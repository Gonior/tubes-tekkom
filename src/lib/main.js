
const {getStringLiteral, getBlockComment, getInlineComment} = require('./methods')
const {TYPE} = require('./type')
const code = `
public class Test {
    public static void main(String args[]) {
        int[] numbers = {20.1,10,20,30,40,50, 10.5,};
        String mhs = "Dedi Cahya";
        boolean menikah = true;
        for(int : x : numbers) {
            System.out.print(x);            
            system.out.print(",");        
        }        
        // This is comment        
        System.out.print("\n");      
        String [] names = {"James", "Dedi cahya", "Agung", "Firman", "Dodo"};
        /*
            loop over 
        */
        for (String name : names) {
            System.out.print(name);
            System.out.print(",");
        }
    }
}`
const getLexeme = (str) => {    
    let resultwithLine = []
    let ln = 0;    
    let col = 0;
    let cols = []    
    let lexeme = "";    
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
            else lexeme += "*"        
        }
        else if (value === '/') {
            if (arrString[index+1] !== "*" && arrString[index -1 ] !== '*') lexeme +='/'
            else continue;        
        } else {
            if (value != '') {
                lexeme += value;
                cols.push(col)
            }
            if (index+1 < arrString.length) {
                if (arrString[index+1] == " " || KEYWORDS.includes(lexeme) || KEYWORDS.includes(arrString[index+1])) {
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
    resultwithLine = resultwithLine.filter(v => v.value != " " && v.value != "")
    console.log(resultwithLine)
    return lexer(resultwithLine);
}
const lexer = (array) => {
    const result = {
        indetifiers : [],
        keywords : [],
        separators : [],        
        opertors : [],
        literals : [],
        comments : []
    }
    result.comments = [...getBlockComment(array).result.map(v => v.value)]    
    array = [...getBlockComment(array).array]
    result.comments = [...result.comments, ...getInlineComment(array).result.map(v => v.value)]
    array = [...getInlineComment(array).array]
    result.literals = [...getStringLiteral(array).result.map(v => v.value)]
    array = [...getStringLiteral(array).array]
    return result
}
console.log(getLexeme(code))