// 拦截类的所有方法
var resolver = new ApiResolver('objc')
resolver.enumerateMatches('*[T1TranslateButton *]', {
    onMatch: function (match) {
        console.log(match['name'] + ":" + match['address'])
    },
    onComplete: function () {}
})