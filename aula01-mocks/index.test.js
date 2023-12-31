const {error}=require("./src/constants.js")
const File = require("./src/file.js")
const assert = require('assert')
//IFEE
;(async()=>{
    //variaveis criadas nesse bloco , so sao validas durantes a execucao
    {
        const fiePath='./mocks/emptyFile-invalid.csv'
        const expected = new Error(error.FILE_LENGHT_ERROR_MESSAGE)
        const result = File.csvToJSON(fiePath)
        await assert.rejects(result,expected)
    }
    {
        const fiePath='./mocks/invalidHeader-invalid.csv'
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJSON(fiePath)
        await assert.rejects(result,expected)
    }
    {
        const fiePath='./mocks/fiveItems-invalid.csv'
        const expected = new Error(error.FILE_LENGHT_ERROR_MESSAGE)
        const result = File.csvToJSON(fiePath)
        await assert.rejects(result,expected)
    }
    {
        const fiePath='./mocks/threeItems-valid.csv'
        const expected = [
            {
                id:1,
                name : "Alesq",
                profession:"intern",
                age:26
            },
            {
                id:2,
                name : "Alesq",
                profession:"develper junior",
                age:28
            },
            {
                id:3,
                name : "Alesq",
                profession:"develper pleno",
                age:31
            }
        ]
        const result = await File.csvToJSON(fiePath)
        await assert.deepEqual(result,expected)
    }
})()
