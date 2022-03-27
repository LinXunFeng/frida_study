import frida

# 获取设备
if __name__ == '__main__':

    deviceManager = frida.get_device_manager()

    # 枚举所有连接的设备
    print(deviceManager.enumerate_devices())

    # 根据 UDID 获取设备
    print(deviceManager.get_device("d007dc58edd70caad950ff01b41ebf73cfa49fbe"))

    # 获取当前 USB 连接的设备
    print(frida.get_usb_device())
