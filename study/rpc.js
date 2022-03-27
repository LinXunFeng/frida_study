function getHomeDirectory() {
    var NSHomeDirectory = new NativeFunction(ptr(Module.findExportByName("Foundation", "NSHomeDirectory")), 'pointer', [])
    var path = new ObjC.Object(NSHomeDirectory());
    return path.toString()
}

function openUrl(url) {
    var UIApplication = ObjC.classes.UIApplication.sharedApplication()
    var toOpen = ObjC.classes.NSURL.URLWithString_(url)
    return UIApplication.openURL_(toOpen)
}

function showAlert() {
    var UIAlertController = ObjC.classes.UIAlertController;
    var UIAlertAction = ObjC.classes.UIAlertAction;
    var UIApplication = ObjC.classes.UIApplication;
    var alertHandler = new ObjC.Block({ retType: 'void', argTypes: ['object'], implementation: function () {} });

    ObjC.schedule(ObjC.mainQueue, function () {
        var alert = UIAlertController.alertControllerWithTitle_message_preferredStyle_('LinXunFeng', '欢迎关注公众号：FSA全栈行动\n博客：https://fullstackaction.com', 1);
        var defaultAction = UIAlertAction.actionWithTitle_style_handler_('OK', 0, alertHandler);
        alert.addAction_(defaultAction);
        UIApplication.sharedApplication().keyWindow().rootViewController().presentViewController_animated_completion_(alert, true, NULL);
    })
}

function playSystemSound() {
    var playSound = new NativeFunction(Module.findExportByName('AudioToolbox', 'AudioServicesPlaySystemSound'), 'void', ['int'])
    playSound(1111)
}

// 导出 RPC 函数
rpc.exports = {
    openurl: function (url) {
        openUrl(url)
    },
    sound: function () {
        playSystemSound()
    },
    alert: function () {
        showAlert()
    },
    homedirectory: function () { // homedirectory 必须小写
        return getHomeDirectory()
    }
}