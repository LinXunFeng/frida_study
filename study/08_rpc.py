import codecs
import frida

if __name__ == '__main__':
    device = frida.get_usb_device()
    session = device.attach('Twitter')

    # 读取 JS 脚本
    with codecs.open('./rpc.js', 'r', 'utf-8') as f:
        source = f.read()

    script = session.create_script(source)
    script.load()

    rpc = script.exports
    # rpc.openurl("https://fullstackaction.com")
    rpc.sound()
    # rpc.alert()
    print(rpc.homeDirectory())
    # print(rpc)

    session.detach()
