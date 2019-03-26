const inquirer = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)

const question = [{
        type: 'input',
        name: 'name',
        message: '设置你的模版名称:',
        validate(val) {
            if (tplList[val]) {
                return '模版已存在!'
            } else if (val === '') {
                return '模版名称必填!'
            } else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: 'place',
        message: 'Git仓库位置：仓库拥有者/仓库名  例：gengchen528/qiya-cli-express-template',
        validate(val) {
            if (val !== '') {
                return true
            }
            return '已关联!'
        }
    },
    {
        type: 'input',
        name: 'branch',
        message: '所属分支:（默认master）',
        default: 'master'
    }
]

module.exports = inquirer.prompt(question).then(({ name, place, branch }) => {
    tplList[name] = {}
    tplList[name]['owner/name'] = place
    tplList[name]['branch'] = branch

    writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList), 'utf-8', (err) => {
        if (err) {
            console.log(err)
        }
        listTable(tplList, '新的模版已经添加成功!')
    })
}).catch(err => {
    console.log('err', err)
})