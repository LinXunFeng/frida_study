

// if (ObjC.available) {
//   // for (var className in ObjC.classes) {
//   //   if (className.toLowerCase().indexOf('translate' != -1)) {
//   //     console.log("[#] className -- " + className);
//   //   }
//   // }

  // var methods = ObjC.classes.T1HomeTimelineItemsViewController.$methods
//   var methods = ObjC.classes.T1TranslateButton.$methods
//   for (var i = 0; i < methods.length; i++) {
//     var method = methods[i]
//     // console.log(method.toLowerCase()) // translate
//     if (method.toLowerCase().indexOf('didTap') !== -1) {
//       console.log("[-] " + method);
//     }
//   }
// }

// if (ObjC.available) {
//   var className = 'T1TweetDetailsFocalStatusView'
//   var methodsNames = ['- visibleAutoTranslateBodyView', '- visibleTranslateTweetView']

//   for (var index in methodsNames) {
//     var methodsName = methodsNames[index]
//     var hook = eval('ObjC.classes.' + className + '["' +methodsName+ '"]')

//     Interceptor.attach(hook.implementation, {
//       onEnter: function (args) { 
//         console.log("---- onEnter ----")
//         console.log("[*] Class Name: " + className)
//         console.log("[*] Method Name: " + methodsName)
//         // console.log("\t[-] args: " + args)
//         console.log("-----------------")
//        },
//       onLeave: function (retval) {
//         console.log("---- onLeave ----")
//         console.log("[*] Class Name: " + className)
//         console.log("[*] Method Name: " + methodsName)
//         console.log("\t[-] Return Value: " + retval)
//         console.log("-----------------")
//       },
//     })
//   }
// }


// (void)setTitleText:(id)
// -(void)_didTap:(id) forEvent:(id)

if (ObjC.available) {
    const { NSString } = ObjC.classes;
    var UIAlertController = ObjC.classes.UIAlertController;
    var UIAlertAction = ObjC.classes.UIAlertAction;
    var UIApplication = ObjC.classes.UIApplication;

    function showAlert() {
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

    var didTap = ObjC.classes.T1TranslateButton['- _didTap:forEvent:']
    var setTitle = ObjC.classes.T1TranslateButton['- setTitleText:']
    var translateView = ObjC.classes.T1TweetDetailsFocalStatusView['- visibleTranslateTweetView']
    
    // 保留旧实现
    var setTitleOldImp = setTitle.implementation
    var translateViewOldImp = translateView.implementation
    var didTapOldImp = didTap.implementation

    // hook
    Interceptor.attach(setTitleOldImp, {
      onEnter: function(args) {
        args[2] = ptr(NSString.stringWithString_("Hello LinXunFeng，点击我来弹个窗和听个曲吧"))
        // console.log("args 0 -- ", ObjC.Object(args[0]))
        // console.log("args 2 -- ", ObjC.Object(args[2]))
      }
    })

    // 覆盖实现
    didTap.implementation = ObjC.implement(setTitle, function(handle, selector, arg1, arg2) {

      // var self = ObjC.Object(handle)
      // var sel = ObjC.Object(selector) , " sel -- " , sel
      // var a = ObjC.Object(args)
      // console.log("self -- ", self, " args -- " , args) 

      // 调用旧实现
      // didTapOldImp(handle, selector, arg1, arg2)
      
      playSystemSound()
      showAlert()
    })

    translateView.implementation = ObjC.implement(setTitle, function(handle, selector) {
      return translateViewOldImp(handle, selector)
    })
}
