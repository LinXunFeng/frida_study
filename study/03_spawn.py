import frida

# 启动进程
if __name__ == '__main__':
    device = frida.get_usb_device()
    pid = device.spawn("com.atebits.Tweetie2")
    # session = device.attach(pid)
    device.resume(pid)

    # 携带参数运行
    # pid = device.spawn("com.apple.mobilesafari", url="https://fullstackaction.com/")
    # device.resume(pid)
