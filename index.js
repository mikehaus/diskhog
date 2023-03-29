const fs = require('fs')
const filesize = require('filesize')
const program = require('commander')
const chalk = require('chalk')

function parseArgs() {
  // NEW COMMAND LINE PARSING

  // intermediate variable used due to logic of parsing.
  let dirArr = []
  
  program
    // help and help sad paths
    .option('-h, --help [helpArg]')
    .option('-H, --HELP, --Help') // Sad Path Cap
    .option('-ELP') // Sad path cap
    .option('-elp') // Sad Path Format
    .option('-elps, --helps') // Sad Path Plural
    .option('--Helps') // Sad Path Plural
    .option('-ELPS, --HELPS') // Sad Path Plural
    // path and path sad paths
    .option('-p, --path [path]')
    .option('-P, --PATH, --Path') // Sad Path Cap
    .option('-ATH') // Sad path cap
    .option('-ath') // Sad Path Format
    .option('-aths, --paths') // Sad Path Plural
    .option('--Paths') // Sad Path Plural
    .option('-ATHS, --PATHS') // Sad Path Plural
    // sort and sort sad paths
    .option('-s, --sort [type]')
    .option('-S, --SORT') // Sad sort Cap
    .option('--Sort') // sad sort cap
    .option('-ORT') // Sad sort cap
    .option('-ort') // Sad sort Format
    .option('-orts, --sorts') // Sad sort Plural
    .option('--Sorts') // Sad sort Plural
    // Metric and metric sad paths
    .option('-m --metric [metricArgCheck]')
    .option('-M, --Metric') // Sad sort Cap
    .option('--Metric') // sad sort cap
    .option('-ETRIC') // Sad sort cap
    .option('-etric') // Sad sort Format
    .option('-etrick') // Sad metric spelling
    .option('-ETRICK') // Sad metric spelling
    .option('--Metrick') // Sad m spelling
    .option('--metrick') // Sad m spelling
    .option('--METRICK') // Sad m spelling
    .option('-etrics, --metrics') // Sad metric Plural
    .option('--Metrics') // Sad metric Plural
    // Threshold and threshold sad paths
    .option('-t --threshold [thresholdVal]')
    .option('-T, --THRESHOLD') // Sad threshold Cap
    .option('--Thresold') // sad threshold cap
    .option('-HRESHOLD') // Sad threshold cap
    .option('-hreshold') // Sad threshold Format
    .option('-hresholds, --thresholds') // Sad threshold Plural
    .option('--Thresholds') // Sad threshold Plural
    .option('--Threshold') // Sad threshold Plural
    // Language arg (Not worrying about sad path)
    .option('-l, --lang [languageCode]')
    // First parameters and sad paths
    .option('-f, --first [filesOrDirs]')
    .option('-F, --FIRST') // Sad first Cap
    .option('--fist') // misspell sad path
    .option('--First') // sad first cap
    .option('-IRST') // Sad first cap
    .option('-irst') // Sad first Format
    .option('-irsts, --firsts') // Sad first Plural
    .option('--Firsts') // Sad First Plural
    .parse(process.argv)

  const options = program.opts()
  //process.env.LANG
  let langCode = options.lang ||= process.env.LANG ||= 'en'
  if (langCode.length > 2) langCode = langCode.substring(0, 2)
  let errData = fs.readFileSync(`./messages.${langCode}.json`, 'utf-8')
  let errInfo = JSON.parse(errData)

  // Handling help option
  // MARK: SAD PATHS
  if (options.HELP) return console.log(errInfo.help.cap)
  if (options.Elp) return console.log(errInfo.help.format)
  if (options.helps) return console.log(errInfo.help.plural)
  if (options.Helps) return console.log(errInfo.help.format)
  if (options.HELPS) return console.log(errInfo.help.cap)
  if (options.help) {
    // help argument
    if (options.help != true) return console.log(errInfo.help.format) // Sad path Got Argument
    // HAPPY PATH HELP
    return help(langCode)
  }

  // Handle path options
  // MARK: Sad Paths
  if (options.PATH) return console.log(errInfo.path.cap)
  if (options.Ath) return console.log(errInfo.path.argument)
  if (options.paths) return console.log(errInfo.path.plural)
  if (options.Paths) return console.log(errInfo.path.cap)
  if (options.PATHS) return console.log(errInfo.path.plural)
  if (options.path) {
    if (options.path.match(/[-!$%^&*()_+|~=`{}\[\][\/\.]:";'<>?,]/)) return console.log(errInfo.path.symbol)
    dirArr = handlePathArg(options.path)
    // Sad path check bad dir
    if (!dirArr) return console.log(errInfo.path.dir)
  }

  // if it doesn't generate the dirArr then generate dirArr with default path
  if (dirArr.length == 0) dirArr = handlePathArg('.')

  // if threshold is in args then filter by threshold
  // MARK: Threshold sad paths
  if (options.THRESHOLD) return console.log(errInfo.threshold.cap)
  if (options.Hreshold) return console.log(errInfo.threshold.format)
  if (options.thresholds) return console.log(errInfo.threshold.format)
  if (options.HRESHOLDS) return console.log(errInfo.threshold.plural)
  if (options.THRESHOLDS) return console.log(errInfo.threshold.cap)
  if (options.Threshold) return console.log(errInfo.threshold.cap)
  if (options.threshold) {
    if (isNaN(options.threshold)) return console.log(errInfo.threshold.number)
    if (options.threshold.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.]/)) return console.log(errInfo.threshold.symbol)
    // theshold happy path
    dirArr = filterByThreshold(dirArr, options.threshold)
  }

  // Handle First Operation
  // MARK: First sad path
  if (options.FIRST) return console.log(errInfo.first.cap)
  if (options.fist) return console.log(errInfo.first.format)
  if (options.ist) return console.log(errInfo.first.format)
  if (options.firsts) return console.log(errInfo.first.plural)
  if (options.Firsts) return console.log(errInfo.first.plural)
  if (options.FIRSTS) return console.log(errInfo.first.cap)
  if (options.First) return console.log(errInfo.first.cap)
  if (options.Irst) return console.log(errInfo.first.format)
  if (options.first) {
    if (!options.first.match(/files|dirs/)) return console.log(errInfo.first.argument)
  }

  // Handle Sort operations
  // MARK: Sort sad paths
  if (options.SORT) return console.log(errInfo.sort.cap)
  if (options.Ort) return console.log(errInfo.sort.format)
  if (options.sorts) return console.log(errInfo.sort.plural)
  if (options.Sorts) return console.log(errInfo.sort.cap)
  if (options.SORTS) return console.log(errInfo.sort.cap)
  if (options.Sort) return console.log(errInfo.sort.cap)
  if (options.sort) {
    if (!options.sort.match(/alpha|size/)) return console.log(errInfo.sort.type)
    if (options.sort === 'alpha') dirArr = sortDirArrAlpha(dirArr)
    if (options.sort === 'size') dirArr = sortDirArrSize(dirArr)
  }

  // Handle Metric Operations
  // MARK: Metric Sad Path
  if (options.METRIC) return console.log(errInfo.metric.cap)
  if (options.Etric) return console.log(errInfo.metric.format)
  if (options.metrics) return console.log(errInfo.metric.plural)
  if (options.Metrics) return console.log(errInfo.metric.plural)
  if (options.METRICS) return console.log(errInfo.metric.plural)
  if (options.Metric) return console.log(errInfo.metric.cap)
  if (options.Metrick) return console.log(errInfo.metric.format)
  if (options.Etrick) return console.log(errInfo.metric.format)
  if (options.metrick) return console.log(errInfo.metric.format)
  if (options.metric) {
    if (options.metric != true) return console.log(errInfo.metric.argument)
  }

  if (options.first) return printDirArrFirstArg(dirArr, options.metric, options.first)
  return printDirArr(dirArr, options.metric)
}

// handles if path is argument checks first if valid directory
function handlePathArg(path) {
  if (fs.existsSync(path)) {
    let baseDir = {
      name: path,
      size: getDirSize(path),
      files: []
    }
    return getAllFilesAndDirs(path, [], baseDir)
  }
  return false
}

// TAKES IN PATH AND RETURNS ARRAY OF DIRECTORY AND FILE OBJECTS
function getAllFilesAndDirs(pathName, dirsArr, currDir) {
  // opens dir and puts all filenames into array to count tabs
  let dirEntries = fs.readdirSync(pathName + '/')
  pathCount = pathName.split('/')
  let regCheck = /^[^\.].+/g
  let tabs = ''
  // Counting up total tabs to use (tabs if file in folder)
  for (let dir in pathCount) {
    tabs += '  '
  }

  dirsArr.push(currDir)

  dirEntries.forEach(dir => {
    let stats = fs.statSync(pathName + '/' + dir)
    // if it's a valid file or folder
    if (dir.match(regCheck)) {
      // if directory, calculate dir size and print size then name of folder
      if (stats.isDirectory()) {
        let dirObj = {
          tabs: tabs,
          name: pathName.slice(2) + '/' + dir,
          size: getDirSize(pathName + '/' + dir),
          files: []
        }
        dirsArr = getAllFilesAndDirs(pathName + '/' + dir, dirsArr, dirObj)
      }
      else {
        let size = stats.size
        let fileObj = {
          tabs: tabs,
          name: currDir.name + '/' + dir,
          size: size,
        }
        currDir.files.push(fileObj)
      }
    } 
  })

  return dirsArr;
}

// Takes pathname and recursively adds all file sizes to get directory size
function getDirSize(pathName, totalSize) {
  let dirEntries = fs.readdirSync(pathName)

  totalSize = totalSize || 0

  dirEntries.forEach(dir => {
    let stats = fs.statSync(pathName + '/' + dir)
    if (stats.isDirectory()) totalSize = getDirSize(pathName + '/' + dir, totalSize)
    else totalSize += stats.size
  })

  return totalSize
}

// Prints contents of help.txt to console
function help(langCode) {
  if (langCode.length > 2) langCode = langCode.substring(0, 2)
  return console.log(fs.readFileSync(`./help.${langCode}.txt`, 'utf-8'))
}

// Helper function to offload work of printing to avoid repeating code
function printFileOrDirArr(dirOrFileArr, isMetric, type) {
  dirOrFileArr.forEach(dirOrFile => {
    let tabs = dirOrFile.tabs || ''
    if (type == 'dir') {
      if (isMetric) console.log(tabs + '(' + filesize(dirOrFile.size) + ') ' + chalk.red(dirOrFile.name + '/'))
      else console.log(tabs + '(' + filesize(dirOrFile.size, { exponent: 0 }) + ') ' + chalk.red(dirOrFile.name + '/'))
    }
    if (type == 'file') {
      if (isMetric) console.log(tabs + '(' + filesize(dirOrFile.size) + ') ' + chalk.cyan(dirOrFile.name))
      else console.log(tabs + '(' + filesize(dirOrFile.size, { exponent: 0 }) + ') ' + chalk.cyan(dirOrFile.name))
    }
  })
}

// Prints dirArr (directory array) in order prioritizing first paramenter. If isMetric is true, print metric, otherwise print non-metric
function printDirArrFirstArg(dirArr, isMetric = false, first) {
  if (first == 'dirs') {
    // print dirs first
    printFileOrDirArr(dirArr, isMetric, 'dir')
    // then print files
    dirArr.forEach(dir => {
      if (dir.files.length) printFileOrDirArr(dir.files, isMetric, 'file')
    })
  }  
  if (first == 'files') {
    // print files first
    dirArr.forEach(dir => {
      if (dir.files.length) printFileOrDirArr(dir.files, isMetric, 'file')
    })
    // then print dirs
    printFileOrDirArr(dirArr, isMetric, 'dir')
  }
}

// Prints dirArr (directory array) in order. If isMetric is true, print metric, otherwise print non-metric
function printDirArr(dirArr, isMetric = false) {
  dirArr.forEach(dir => {
    let tabs = dir.tabs || ''
    if (isMetric) console.log(tabs + '(' + filesize(dir.size) + ') ' + chalk.red(dir.name + '/'))
    else console.log(tabs + '(' + filesize(dir.size, { exponent: 0}) + ') ' + chalk.red(dir.name + '/'))
    if (dir.files.length) {
      dir.files.forEach(file => {
        if (isMetric) console.log(file.tabs + '(' + filesize(file.size) + ') ' + chalk.cyan(file.name))
        else console.log(file.tabs + '(' + filesize(file.size, { exponent: 0 }) + ') ' + chalk.cyan(file.name))
      })
    }
  })
}

// Takes in array of dirs and files, filters out any dirs or arrays smaller than threshold * 1000000
function filterByThreshold(dirArr, threshold) {

  // array to put filtered dirs into
  filteredArr = []
  dirArr.forEach(dir => {
    // For each dir, check if larger than threshold, if not skip, 
    // if it is, do same for files and then push filtered dir into return array
    if (dir.size >= threshold * 1000000) {
      let files = []
      dir.files.forEach(file => {
        if (file.size >= threshold * 1000000) files.push(file)
      })
      dir.files = files
      filteredArr.push(dir)
    }
  })
  return filteredArr
}

// Sorts dir array alphabetically ascending
function sortDirArrAlpha(dirArr) {
  // first sort the files in each alphabetically
  dirArr.forEach(dir => {
    dir.files.sort((firstFile, secondFile) => {
      if (firstFile.name > secondFile.name) return -1
      if (firstFile.name < secondFile.name) return 1
      return 0
    })
  })
  // second sort the directories themselves by name
  dirArr.sort((firstDir, secondDir) => {
    if (firstDir.name > secondDir.name) return -1
    if (firstDir.name < secondDir.name) return 1
    return 0
  })
  return dirArr
}

// sorts dir array descending size
function sortDirArrSize(dirArr) {
  // first sort the files in each dir by size
  dirArr.forEach(dir => {
    dir.files.sort((firstFile, secondFile) => {
      if (firstFile.size > secondFile.size) return -1
      if (firstFile.size < secondFile.size) return 1
      return 0
    })
  })
  // second sort the directories themselves by size
  dirArr.sort((firstDir, secondDir) => {
    if (firstDir.size > secondDir.size) return -1
    if (firstDir.size < secondDir.size) return 1
    return 0
  })
  return dirArr
}

function main() {
  console.log('Diskhog started...\n')
  parseArgs()
}

module.exports = { 
  main,
  parseArgs,
  getDirSize,
  getAllFilesAndDirs,
  filterByThreshold,
  handlePathArg
}