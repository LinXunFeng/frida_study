import frida

# 脱离进程
if __name__ == '__main__':
    device = frida.get_usb_device()
    pid = device.spawn("com.atebits.Tweetie2")
    session = device.attach(pid)
    device.resume(pid)

    session.detach()
