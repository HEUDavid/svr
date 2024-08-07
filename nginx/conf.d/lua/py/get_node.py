import requests
import base64
import uuid
import json


def get_node():
    """
    逆向某网页接口(机场节点)
    https://linux.do/t/topic/156975
    :return:
    """
    api = "http://bailao.cangqion.sbs/get_free_node"
    response = requests.get(api, timeout=60)
    if response.status_code != 200:
        print("get_free_node:", response.status_code, response.text)
        return None
    data = response.json()
    raw = str(data['output'])
    s = raw.index('http')
    e = raw.index(r"']")
    url = raw[s:e]
    response = requests.get(url)
    print(response.text)


if __name__ == '__main__':
    get_node()
