const bc = document.querySelector('#bc')
const myDate = document.querySelector('#date')
const myTime = document.querySelector('#time')
const testDate = document.querySelector('#test-date')
const testUser = document.querySelector('#testuser')
const testUser2 = document.querySelector('#test-user')
const materiel = document.querySelector('#materiel')
const describes = document.querySelector('#describes')
const workTime = document.querySelector('#work-time')
const whoami = document.querySelector('#whoami')
const open = document.querySelector('#open')
const close = document.querySelector('#close')
const download = document.querySelector('#download')
const print = document.querySelector('#print')
const logs = document.querySelector('#logs')
const rule = document.querySelector('#rule')
const setting = document.querySelector('#settings')
const addUser = document.querySelector('#adduser')
const ruledialog = document.querySelector('.rule')
const settingdialog = document.querySelector('.setting')
const adduserdialog = document.querySelector('.addUser')
const x1 = document.querySelector('.x1')
const x2 = document.querySelector('.x2')
const x3 = document.querySelector('.x3')
const rulebc = document.querySelector('#rule-bc')
const ruledesc = document.querySelector('#rule-desc')
const rulenum = document.querySelector('#rule-num')
const ruleadd = document.querySelector('#rule-add')
const sourcePath = document.querySelector('#sourcepath')
const sourcefile = document.querySelector('#sourcefile')
const targetPath = document.querySelector('#targetpath')
const savesetting = document.querySelector('#savesetting')
const settingtitle = document.querySelector('#settingtitle')
const resultRepoter = document.querySelector('#result-report')
const addusernumber = document.querySelector('#addusernumber')
const addusername = document.querySelector('#addusername')
const adduseradd = document.querySelector('#adduser-add')
const usertype = document.querySelector('#usertype')
const adduserpswd = document.querySelector('#adduserpswd')
const openfiletarget = document.querySelector('#openfiletarget')
const loginusername = document.querySelector('#loginusername')
const loginuserpswd = document.querySelector('#loginuserpswd')
const logintitle = document.querySelector('#logintitle')
const login = document.querySelector('#login')
const gologin = document.querySelector('#gologin')
const title = document.querySelector('#title')
let isSetting = true
const sqlite3 = require('sqlite3');
const request = require('request')
testUser2.innerHTML = localStorage.getItem('testuser')
let openfile = (e) => {
    console.log(e)
    let file = localStorage.getItem(`targetfilepath`) + '\\' + openfiletarget.innerHTML + '.' + localStorage.getItem(`sourcefile`)
    let err = shell.openItem(localStorage.getItem('targetfilepath') + '\\' + openfiletarget.innerHTML + '.' + localStorage.getItem('sourcefile'))
    if (err) {} else {
        alert('打开失败')
    }
}
let checkAuth = () => {
    // console.log(localStorage.getItem('auth'))
    if (localStorage.getItem('auth') != 'true') {
        document.querySelector('#mask').style.display = 'block'
    } else {
        document.querySelector('#mask').style.display = 'none'
        // console.log('authed')
    }
}
checkAuth()
let auth = () => {
    request('http://127.0.0.1:52096/auth', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
            localStorage.setItem('auth', true)
            document.querySelector('#mask-title').innerHTML = '授权成功'
            checkAuth()
        } else {
            console.log(error)
            document.querySelector('#mask-title').innerHTML = '连接授权服务失败，请检查授权许可器是否启动'
            localStorage.setItem('auth', false)
            checkAuth()
        }
    })
}
var db = new sqlite3.Database('./main.db', function () {
    let sentence = `
    create table if not exists "datas"(
            "barcode" text(255,10) NOT NULL,
            "testdate" TEXT(255,10),
            "testuser" TEXT(255,10),
            "materiel" TEXT(255,10),
            "describe" TEXT(255,10),
            "worktime" TEXT(255,10),
            "report" TEXT(255,10),
            PRIMARY KEY ("barcode")
        );
    `
    let sentence2 = `
    create table if not exists "rule"(
        "barcode" text(255,10) NOT NULL,
        "goodsnumber" text(255,10),
        "describe" TEXT(255,10),
        PRIMARY KEY ("barcode")
    );
    `
    let sentence3 = `
    create table if not exists "users"(
        "usernumber" text(255,10) NOT NULL,
        "username" text(255,10),
        "userpassword" TEXT(255,10),
        "usertype" TEXT(255,10),
        PRIMARY KEY ("usernumber")
    );
    `
    db.run(sentence)
    db.run(sentence2)
    db.run(sentence3)
})
let timework = ''
workTime.innerHTML = '0时0分0秒0毫秒';
const fs = require('fs')
let tempbc = ''
bc.addEventListener('blur', () => {
    if (!isSetting) {
        bc.focus()
    }
})
let isInDb = false
const {
    ipcRenderer,
    remote,
    shell
} = require('electron')
var hour, minute, second;
hour = minute = second = 0;
var millisecond = 0;

function resettime() {
    window.clearInterval(timework);
    millisecond = hour = minute = second = 0;
    workTime.innerHTML = '0时0分0秒0毫秒';
}

function stoptime() {
    window.clearInterval(timework);
}

function starttime() {
    timework = setInterval(mytimer, 50);
}

function mytimer() {
    millisecond = millisecond + 50;
    if (millisecond >= 1000) {
        millisecond = 0;
        second = second + 1;
    }
    if (second >= 60) {
        second = 0;
        minute = minute + 1;
    }

    if (minute >= 60) {
        minute = 0;
        hour = hour + 1;
    }
    workTime.innerHTML = hour + 'h-' + minute + 'm-' + second + 's-' + millisecond + 'ms';

}
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}



ipcRenderer.on('main-process-messages', (event, arg) => {})

let date = (el) => {
    let date = new Date()
    el.innerHTML = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
    setInterval(() => {
        date = new Date()
        el.innerHTML = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
    }, 1000)
}
let time = (el) => {
    let date = new Date()
    el.innerHTML = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    setInterval(() => {
        date = new Date()
        el.innerHTML = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }, 1000)
}
date(myDate)
date(testDate)
time(myTime)
logs.addEventListener('click', (e) => {
    console.log(e)
    console.log(e.target)
})
bc.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        if (localStorage.getItem('logintype') == 'root') {
            console.log('超级管理员')
        } else if (localStorage.getItem('logintype') == 'admin') {
            console.log('管理员')
        } else if (localStorage.getItem('logintype') == 'scanner') {
            console.log('检验员')
            try {
                resettime()
            } catch (err) {

            }
            tempbc = bc.value

            db.all(`select report from datas where barcode = '${tempbc}'`, function (err, res) {
                if (err) {
                    throw err
                } else {
                    if (res[0]) {
                        if (res[0].report === 'true') {
                            resultRepoter.style.backgroundColor = '#12FB5D'
                        } else {
                            resultRepoter.style.backgroundColor = '#CBCBCB'
                            starttime()
                        }
                    } else {
                        resultRepoter.style.backgroundColor = '#CBCBCB'
                    }
                }
            });

            let query = `SELECT * from rule where barcode='${tempbc}'`
            let isindb = false
            db.all(query, async function (err, res) {

                if (err) throw err;
                else {
                    if (res[0]) {
                        let time = new Date().Format('yyyy-MM-dd HH:mm:ss')
                        isInDb = true
                        materiel.innerHTML = res[0].goodsnumber
                        describes.innerHTML = res[0].describe

                        function fun() {
                            alert(1)
                        }
                        let el = `
                            <p class='log-item'>
                                <span style="color:#E64242">码: <span id='openfiletarget'>${tempbc}</span>-</span>
                                <span style="color:#8E42E6">物料号: ${res[0].goodsnumber}-</span>
                                <span style="color:#429BE6">描述: ${res[0].describe}-</span>
                                <span style="color:#001AFF">日期: ${time}-</span>
                                <span style="color:#E66711">检验员: ${testUser2.innerHTML}</span>
                            </p>
                        `
                        logs.innerHTML += el
                        // let query2 = `insert into datas values ('${tempbc}', '${time}', '${testUser2.innerHTML}', '${res[0].goodsnumber}', '${res[0].describes}', '', 'false')`
                        let query2 = `update datas set testdate='${time}', testuser='${testUser2.innerHTML}'`
                        console.log(query2)
                        db.run(query2, function (res) {});
                    } else {
                        await alert('暂无该物品信息')
                        stoptime()
                        isInDb = false
                    }
                }
            });
            bc.value = ''
        } else {
            console.log('普通用户')
        }
    } else {
        if (bc.value.length == 1) {}
    }
})
x1.addEventListener('click', () => {
    x1.parentNode.style.display = 'none'
    isSetting = false
    bc.focus()
})
x2.addEventListener('click', () => {
    x2.parentNode.style.display = 'none'
    isSetting = false
    bc.focus()
})
x3.addEventListener('click', () => {
    x3.parentNode.style.display = 'none'
    isSetting = false
    bc.focus()
})
rule.addEventListener('click', () => {
    isSetting = true
    ruledialog.style.display = 'block'
})
setting.addEventListener('click', () => {
    isSetting = true
    settingdialog.style.display = 'block'
    let sourcefilepath = localStorage.getItem(`sourcefilepath`);
    let targetfilepath = localStorage.getItem(`targetfilepath`);
    let sourcefilename = localStorage.getItem(`sourcefile`);
    sourcePath.value = sourcefilepath
    targetPath.value = targetfilepath
    sourcefile.value = sourcefilename
})
ruleadd.addEventListener('click', () => {
    let bc = rulebc.value
    let desc = ruledesc.value
    let num = rulenum.value
    if (bc == '' || desc == '' || num == '') {
        document.getElementById('ruletitle').innerHTML = '请填写完整'
    } else {
        let query = `insert into rule values ('${bc}', '${num}', '${desc}')`
        db.run(query, function (res) {
            if (!res) {
                document.getElementById('ruletitle').innerHTML = '添加成功'
                let query2 = `insert into datas values ('${bc}', '', '', '${num}', '${desc}', '', 'false')`
                db.run(query2, function (res) {
                    console.log(res)
                });
            } else {
                document.getElementById('ruletitle').innerHTML = '已存在该条目'
            }
        });
    }
    setTimeout(() => {
        rulebc.value = ''
        ruledesc.value = ''
        rulenum.value = ''
        document.getElementById('ruletitle').innerHTML = ''
    }, 1000);
})
addUser.addEventListener('click', () => {
    isSetting = true
    adduserdialog.style.display = 'block'
})
adduseradd.addEventListener('click', () => {
    let anum = addusernumber.value
    let aname = addusername.value
    let pswd = adduserpswd.value
    let type = usertype.value
    if (anum == '' || aname == '' || pswd == '') {
        document.getElementById('ruletitle').innerHTML = '请填写完整'
    } else {
        let query = `insert into users values ('${anum}', '${aname}', '${pswd}', '${type}')`
        db.all(query, function (err, res) {
            if (err) {
                document.getElementById('addusertitle').innerHTML = '添加失败，已存在该用户'
            } else {
                document.getElementById('addusertitle').innerHTML = '添加成功'
            }
        });
    }
    setTimeout(() => {
        addusernumber.value = ''
        addusername.value = ''
        adduserpswd.value = ''
        document.getElementById('ruletitle').innerHTML = ''
    }, 1000);
})
savesetting.addEventListener('click', () => {
    let src = sourcePath.value
    let tar = targetPath.value
    let file = sourcefile.value
    let user = testuser.value
    localStorage.setItem(`sourcefilepath`, src);
    localStorage.setItem(`targetfilepath`, tar);
    localStorage.setItem(`sourcefile`, file);
    localStorage.setItem(`testuser`, user);
    remote.getGlobal('sharedObj').srcpath = src;
    remote.getGlobal('sharedObj').tarpath = tar;
    remote.getGlobal('sharedObj').sourcefile = file;
    remote.getGlobal('sharedObj').testuser = user;
    testUser2.innerHTML = user
    settingtitle.innerHTML = '保存成功'
    setTimeout(() => {
        settingtitle.innerHTML = ''
    }, 1000);
})
open.addEventListener('click', () => {
    let file = localStorage.getItem(`targetfilepath`) + '\\' + tempbc + '.' + localStorage.getItem(`sourcefile`)
    let err = shell.openItem(file)
    if (err) {} else {
        alert('打开失败')

    }
})

close.addEventListener('click', () => {
    location.reload();
    localStorage.setItem('login', false)
    testUser2.innerHTML = ''
    whoami.innerHTML = ''
})
var watch = require('watch')
try {
    watch.createMonitor(localStorage.getItem(`sourcefilepath`), function (monitor) {
        monitor.on("created", function (f, stat) {
            let fileName = null
            let fileExtName = null
            fileExtName = f.split('.')[1]
            let odder = f
            let d = new Date
            let newer = localStorage.getItem(`targetfilepath`) + '\\' + tempbc + '.' + fileExtName
            if (isInDb) {
                try {
                    fs.renameSync(odder, newer)
                    db.run(`UPDATE datas SET report= 'true' where barcode = '${tempbc}'`, function (err, res) {
                        if (err) {
                            resultRepoter.style.backgroundColor = '#CBCBCB'
                            throw err;
                        } else {
                            resultRepoter.style.backgroundColor = '#12FB5D'
                            stoptime()
                            db.run(`UPDATE datas SET worktime = '${workTime.innerHTML}' where barcode = '${tempbc}'`, function (res) {})
                            console.log(workTime.innerHTML)
                        }
                    });
                } catch (err) {
                    alert(err)
                }
            }
        })
        monitor.on("changed", function (f, curr, prev) {
            let odder = f
            fileExtName = f.split('.')[1]
            let d = new Date
            let newer = localStorage.getItem(`targetfilepath`) + '\\' + tempbc + '.' + fileExtName
            if (isInDb) {
                fs.renameSync(odder, newer)
                db.run(`UPDATE datas SET report= 'true' where barcode = '${tempbc}'`, function (res) {
                    if (err) {
                        resultRepoter.style.backgroundColor = '#CBCBCB'
                        throw err;
                    } else {
                        resultRepoter.style.backgroundColor = '#12FB5D'
                        stoptime()
                        db.run(`UPDATE datas SET worktime = '${workTime.innerHTML}' where barcode = '${tempbc}'`, function (res) {})
                        console.log(workTime.innerHTML)
                    }
                });
            }
        })
    })
} catch (err) {
    alert('未设置源文件路径')
}
document.querySelector('#auth').addEventListener('click', () => {
    document.querySelector('#mask-title').innerHTML = '授权中'
    auth()
})
gologin.addEventListener('click', () => {
    // create table if not exists "users"(
    //     "usernumber" text(255,10) NOT NULL,
    //     "username" text(255,10),
    //     "userpassword" TEXT(255,10),
    //     "usertype" TEXT(255,10),
    //     PRIMARY KEY ("usernumber")
    // );
    // `
    // isSetting = false
    if (loginusername.value == '' || loginuserpswd.value == '') {
        logintitle.innerHTML = '请全部填写'
    } else {
        db.all(`select * from users where usernumber=${loginusername.value} and userpassword=${loginuserpswd.value}`, function (err, res) {
            if (!err) {
                if (res.length == 1) {
                    let name = res[0].username
                    let number = res[0].usernumber
                    let type = res[0].usertype
                    logintitle.innerHTML = '登录成功'
                    localStorage.setItem('login', true)
                    localStorage.setItem('loginusername', name)
                    localStorage.setItem('loginnumber', number)
                    localStorage.setItem('logintype', type)
                    localStorage.setItem('testuser', name)
                    testUser2.innerHTML = name
                    if (type == 'root') {
                        whoami.innerHTML = '超级用户'
                    } else if (type == 'admin') {
                        whoami.innerHTML = '管理员'
                    } else if (type == 'scanner') {
                        whoami.innerHTML = '检测员'
                    } else {
                        whoami.innerHTML = '普通用户'
                    }
                    console.log(res)
                    setTimeout(() => {
                        logintitle.innerHTML = ''
                        login.style.display = 'none'

                    }, 1000);
                } else {
                    logintitle.innerHTML = '用户名或密码错误'
                }
            } else {
                alert('系统故障')
            }
        })
    }
})
if (localStorage.getItem('login') == 'true') {
    login.style.display = 'none'
} else {
    login.style.display = 'flex'
}