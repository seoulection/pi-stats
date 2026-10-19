import psutil, sys, time
from datetime import datetime, timezone

def stats():
    return {
        **get_boot_time(),
        **get_cpu_percent(),
        **get_temperature()
    }

def get_boot_time():
    boot_ts = psutil.boot_time()
    boot_dt = datetime.fromtimestamp(boot_ts, tz=timezone.utc)
    return {
        "boot_time": boot_dt.isoformat(),
        "uptime_seconds": time.time() - boot_ts,
    }

def get_cpu_percent():
    return {
            "cpu_percent": psutil.cpu_percent(percpu=True)
    }

def get_temperature():
    if sys.platform != "linux":
        return {"temperature": None}

    temps = psutil.sensors_temperatures()
    temp_celsius = temps["cpu_thermal"][0].current
    temp_fahrenheit = round(temp_celsius * 9 / 5 + 32, 1)
    return {
        "temperature": temp_fahrenheit
    }
