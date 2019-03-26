const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)

const question = [{
    type: 'input',
    name: 'name',
    message: '你要删除模版的名称:',
    validate(val) {
        if (tplList[val]) {
            return true
        } else if (val === '') {
            return '模板名称必填!'
        } else if (!tplList[val]) {
            return '模版不存在'
        }
    }
}]

module.exports = prompt(question).then(({ name }) => {
    delete tplList[name]

    writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList), 'utf-8', (err) => {
        if (err) {
            console.log(err)
        }
        listTable(tplList, '模版已成功删除!')
    })
})