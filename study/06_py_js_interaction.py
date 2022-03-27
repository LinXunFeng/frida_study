import frida
import threading

# Python 与 JS 交互

g_event = threading.Event()  # 同步


def payload_message(payload):
    # print("payload_message -- ", payload)
    if "msg" in payload:
        print(payload["msg"])

    if 'status' in payload:
        if payload['status'] == 'success':
            g_event.set()


def on_message(message, data):
    # print("on_message message -- ", message)
    if message['type'] == 'send':
        payload_message(message['payload'])
    elif message['type'] == 'error':
        print(message['stack'])


SCRIPT_JS = ("""
    function handleMessage(message) {
        var cmd = message['cmd'] 
        if (cmd == 'GetDirectory') {
            var name = message['name']
            var path;
            switch (name) {
            case 'home':
                var NSHomeDirectory = new NativeFunction(ptr(Module.findExportByName("Foundation", "NSHomeDirectory")), 'pointer', []);
                path = new ObjC.Object(NSHomeDirectory());
                break;
            case 'tmp':
                var NSTemporaryDirectory = new NativeFunction(ptr(Module.findExportByName("Foundation", "NSTemporaryDirectory")), 'pointer', []);
                path = new ObjC.Object(NSTemporaryDirectory());
                break;
            default:
                path = "写的啥呀"
            }
            if (path) send({msg: path.toString()});
        }   
        send({status: 'success'});
    }
    recv(handleMessage);
""")


# 根据名字获取对应的沙盒路径
def getDirectory(target_process, name):
    device = frida.get_usb_device()
    session = device.attach(target_process)
    script = session.create_script(SCRIPT_JS)
    script.on('message', on_message)
    script.load()
    script.post({'cmd': 'GetDirectory', 'name': name})
    g_event.wait()
    session.detach()


if __name__ == '__main__':
    getDirectory('Twitter', 'home')
    # getDirectory('Twitter', 'tmp')
