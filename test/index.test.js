const { getAllFilesAndDirs, getDirSize, handlePathArg, filterByThreshold, parseArgs } = require('../index')
const filesize = require('filesize')
const fs = require('fs')

describe('getAllFilesAndDirs(pathname, dirsArr, currDir)', () => {

  const testPath = 'test'
  let testDir = {
    name: testPath,
    blocks: getDirSize(testPath),
    files: []
  }
  let dirArr = getAllFilesAndDirs(testPath, [], testDir)

  test('getAllFilesAndDirs returns array', () => {
    expect(Array.isArray(dirArr)).toBe(true)
  })

  test('getAllFilesAndDirs array contains all objects', () => {
    let dirArrHasObjects = true;
    for (let dir in dirArr) {
      if (typeof dirArr[dir] != 'object') dirArrHasObjects = false
    } 
    expect(dirArrHasObjects).toBe(true)
  })

  test('expect length of array to be total number of dirs (29 including test folder)', () => {
    expect(dirArr.length).toBe(29)
  })

  test('expect file count to be total number of files in folders (42 including in test folder)', () => {
    let fileCount = 0
    dirArr.forEach(dir => {
      fileCount += dir.files.length
    })
    expect(fileCount).toBe(42)
  })
})

describe('getDirSize(pathname)', () => {

  test('Size of full test folder is 1.04 MB', () => {
    expect(filesize(getDirSize('test/folderToTest'))).toBe('1.04 MB')
  })

  test('Size of fries test folder is correct size metric (6.16 KB)', () => {
    expect(filesize(getDirSize('test/folderToTest/Ilikefood/burgers'))).toBe('6.16 KB')
  })

  test('Size of f31 test folder is 70 bytes', () => {
    expect(filesize(getDirSize('test/folderToTest/f1/f3/f31'))).toBe('70 B')
  })
})

describe ('handlePathArg(path)', () => {

  test('handlePathArg valid path returns array', () => {
    expect(Array.isArray(handlePathArg('.'))).toBe(true)
  })

  test('handlePathArg invalid path returns false', () => {
    expect(handlePathArg('.birds_are_real')).toBe(false)
  })
})

describe ('filterByThreshold(dirArr, threshold)', () => {
  
  const testPath = 'test/folderToTest/f1/f3'
  let testDir = {
    name: testPath,
    size: getDirSize(testPath),
    files: []
  }
  let dirArr = getAllFilesAndDirs(testPath, [], testDir)

  test('all files filtered threshold 1 returns 1 file', () => {
    expect(filterByThreshold(dirArr, 1).length).toBe(1)
  })

})

describe ('parseArgs() sad path input tests', () => {

  test('parseArg -help wrong format returns format error', () => {
    process.argv.push('-help')
    let langCode = 'en'
    let errData = fs.readFileSync(`./messages.${langCode}.json`, 'utf-8')
    let errInfo = JSON.parse(errData)
    expect(parseArgs()).toBe(console.log(errInfo.help.format))
  })

  test('parseArg --metrick returns format error', () => {
    process.argv.push('--metrick')
    let langCode = 'en'
    let errData = fs.readFileSync(`./messages.${langCode}.json`, 'utf-8')
    let errInfo = JSON.parse(errData)
    expect(parseArgs()).toBe(console.log(errInfo.metric.format))
  })

  test('parseArg --threshold romanian test returns number error', () => {
    process.argv.push('--threshold', ' -1')
    let langCode = 'ro'
    let errData = fs.readFileSync(`./messages.${langCode}.json`, 'utf-8')
    let errInfo = JSON.parse(errData)
    expect(parseArgs()).toBe(console.log(errInfo.threshold.number))
  })

  test('parseArg --first test bad arg returns argument error', () => {
    process.argv.push('--first', ' Covid')
    let langCode = 'en'
    let errData = fs.readFileSync(`./messages.${langCode}.json`, 'utf-8')
    let errInfo = JSON.parse(errData)
    expect(parseArgs()).toBe(console.log(errInfo.first.argument))
  })

  test('parseArg --first test bad arg returns argument error', () => {
    process.argv.push('--first', ' Covid')
    let langCode = 'en'
    let errData = fs.readFileSync(`./messages.${langCode}.json`, 'utf-8')
    let errInfo = JSON.parse(errData)
    expect(parseArgs()).toBe(console.log(errInfo.first.argument))
  })

  test('parseArg --sorts test bad arg returns plural error', () => {
    process.argv.push('--sorts', ' alpha')
    let langCode = 'en'
    let errData = fs.readFileSync(`./messages.${langCode}.json`, 'utf-8')
    let errInfo = JSON.parse(errData)
    expect(parseArgs()).toBe(console.log(errInfo.sort.plural))
  })
  
})