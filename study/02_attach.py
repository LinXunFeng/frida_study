import frida

# 附加进程
if __name__ == '__main__':
    device = frida.get_usb_device()
    session = device.attach("Twitter")  # 进程名
    # session = device.attach(27489)  # PID
    print(session)
