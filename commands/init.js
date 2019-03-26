const { prompt } = require('inquirer')
const { writeFile, writeFileSync, existsSync, readFileSync } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)
const { resolve } = require('path')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
const handlebars = require('handlebars')

let tplList = require(`${__dirname}/../templates`)

const question = [{
        type: 'input',
        name: 'name',
        message: '你要使用的模版名称:（默认：qiya-express-cli）',
        default: 'qiya-express-cli',
        validate(val) {
            if (tplList[val]) {
                return true
            } else if (val === '') {
                return '模版名称必填!'
            } else if (!tplList[val]) {
                return '模版不存在'
            }
        }
    },
    {
        type: 'input',
        name: 'project',
        message: '你的项目名称:',
        validate(val) {
            if (val !== '') {
                return true
            }
            return '项目名称必填!'
        }
    },
    {
        type: 'input',
        name: 'description',
        message: '你的项目介绍:',
        default: ''
    },
    {
        type: 'input',
        name: 'author',
        message: '作者:',
        default: ''
    },
    {
        type: 'input',
        name: 'place',
        message: '项目存放的目录:（默认当前目录）',
        default: './'
    }
]

function go(name, project, description, author, place) {
    const gitPlace = tplList[name]['owner/name']
    const gitBranch = tplList[name]['branch']
    const spinner = ora('模版下载中，请稍等...')

    spinner.start()

    download(`${gitPlace}#${gitBranch}`, `${place}/${project}`, (err) => {

        const packageFile = `${place}/${project}/package.json`
        const meta = {
            project: project,
            description: description,
            author: author
        }
        if (existsSync(packageFile)) {
            const content = readFileSync(packageFile).toString()
            let dt = JSON.parse(content)
            dt.project = '{{project}}'
            dt.description = '{{description}}'
            dt.author = '{{author}}'
            const result = handlebars.compile(JSON.stringify(dt, null, 2))(meta)
            writeFileSync(packageFile, result)
            console.log(chalk.green('新的项目已经初始化成功!'))
        } else {
            console.log(chalk.red('package.json不存在!'))
        }
        if (err) {
            console.log(chalk.red(err))
            process.exit()
        }
        spinner.stop()
        console.log(chalk.green('新的项目已经初始化成功!'))
    })
}

module.exports = prompt(question).then(({ name, project, description, author, place }) => {
    if (!existsSync(project)) {
        go(name, project, description, author, place)
    } else {
        console.log(chalk.red('项目已存在，请重新命名项目名称'))
        const questionRename = [{
            type: 'input',
            name: 'rename',
            message: '重命名项目名称:',
            validate(val) {
                if (val !== '') {
                    return true
                }
                return '项目名称必填!'
            }
        }]
        prompt(questionRename).then(({ rename }) => {
            go(name, rename, description, author, place)
        })
    }
})