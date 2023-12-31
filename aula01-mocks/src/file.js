const {readFile} = require('fs/promises')
const {error}=require("./constants.js")
const DEFAULT_OPTIONS = {
    maxLines:3,
    fields:["id","name","profession","age"]
}
class File {
    static async csvToJSON(fiePath){
        const content = await readFile(fiePath,"utf-8")
        const validation = this.isValid(content)
        if(!validation.valid) throw new Error(validation.error)
        const users = this.parseCSVToJSON(content)
        return users
    }

    static isValid(csvString,options=DEFAULT_OPTIONS){
        //para ver o conteudo do arquivo
        //

        //[0] = headers
        //[1] = primeira linha
        //[2] = segunda linha
        const [headers,...fileWithoutHeader]=csvString.split(/\r?\n/)
        const isHeaderValid = headers === options.fields.join(",")
        if(!isHeaderValid){
            return{
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid:false
            }
        }
        if(!fileWithoutHeader.length || 
            fileWithoutHeader.length > options.maxLines){
            return{
                error: error.FILE_LENGHT_ERROR_MESSAGE,
                valid:false
            }
        }
        return {valid:true}
    }
    static parseCSVToJSON(csvString){
        const lines = csvString.split(/\r?\n/)
        const firstLine = lines.shift()
        const header = firstLine.split(",")
        const users = lines.map(line=>{
            const columns = line.split(",")
            let user = {}
            for(const index in columns){
                user[header[index]] = columns[index]
            }
            return user
        })
        return users
    }
}

module.exports = File