from prometheus_client import start_http_server, Gauge
import psutil
import time

cpu_usage = Gauge('system_cpu_usage', 'CPU usage percentage')
memory_usage = Gauge('system_memory_usage', 'Memory usage percentage')
disk_usage = Gauge('system_disk_usage', 'Disk usage percentage')
swap_usage = Gauge('system_swap_usage', 'Swap usage percentage')
load_avg = Gauge('system_load_average', 'System load average')

def collect_metrics():
    """Récupère les métrics systèmes"""
    cpu_usage.set(psutil.cpu_percent(interval=1))
    memory_usage.set(psutil.virtual_memory().percent)
    disk_usage.set(psutil.disk_usage('/').percent)
    swap_usage.set(psutil.swap_memory().percent)
    load_avg.set(psutil.getloadavg()[0]) # charge moyenne sur une minute

if __name__ == "__main__":
    start_http_server(8000)
    print("Serveur Prometheus exposé sur http://localhost:8000/metrics")

    while True:
        collect_metrics()
        time.sleep(5)
