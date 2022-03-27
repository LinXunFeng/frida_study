import codecs
import frida

# js脚本注入
if __name__ == '__main__':
    device = frida.get_usb_device()
    pid = device.spawn("com.atebits.Tweetie2")
    session = device.attach(pid)
    device.resume(pid)

    script = session.create_script("""
    if (ObjC.available) {
        var NSHomeDirectory = new NativeFunction(ptr(Module.findExportByName("Foundation", "NSHomeDirectory")), 'pointer', []);
        var path = new ObjC.Object(NSHomeDirectory());
        console.log(path);
    }
    """)

    # 加载本地 JS 脚本
    # with codecs.open('./xxx.js', 'r', 'utf-8') as f:
    #     source = f.read()
    # script = session.create_script(source)

    script.load()
    session.detach()
