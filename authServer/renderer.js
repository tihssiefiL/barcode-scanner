let auth = document.querySelector('#auth')
let http = require('http')
let url = require('url')
let startAuth = () => {
    try {
        let server = http.createServer((req, res) => {
            let u = url.parse(req.url).pathname
            if (u == '/auth') {
                res.end('authed')
                auth.innerHTML = '授权成功'
            }
            console.log(u)
        })
        server.listen(52096)
    } catch (error) {
        alert(error)
    }
}
auth.addEventListener('click', () => {
    auth.innerHTML = '授权中'
    startAuth()
})
