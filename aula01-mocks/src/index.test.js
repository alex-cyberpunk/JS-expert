const {error}=require("./src/cosntants")
const File = require("./src/file")
//IFEE
;(async()=>{
    //variaveis criadas nesse bloco , so sao validas durantes a execucao
    {
        const fiePath='./mocks/emptyFile-invalid.csv'
        const expected = new Error(error.FILE_LENGHT_ERROR_MESSAGE)
        const result = File.csvToJSON(fiePath)
        await assert.reject(result,expected)
    }
})()