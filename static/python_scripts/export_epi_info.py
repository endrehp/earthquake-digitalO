import json

def export_epi_info(epi_speed, delay, duration_min, duration_sec, title):
    
    max_time = int(duration_min)*60 + int(duration_sec)
    epi_info = {'epi_speed': epi_speed, 'delay': delay, 'max_time': max_time}
    epi_url = 'media/epi_info_' + title + '.json'
    
    with open(epi_url, 'w') as public_file: 
        json.dump(epi_info, public_file)