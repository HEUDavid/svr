import requests
import base64
import uuid
import json


def transfer2clash(data):
    url = f'https://sub-back.zeze.love/sub?target=clash&url={data}'
    response = requests.get(url)
    return response.text


def get_url():
    api = "http://bailao.cangqion.sbs/get_free_node"
    response = requests.get(api, timeout=60)
    if response.status_code != 200:
        print("get_free_node:", response.status_code, response.text)
        return None
    data = response.json()
    raw = str(data['output'])
    s = raw.index('http')
    e = raw.index(r"']")
    url = raw[s:e]  # 机场url
    return url


def get_node():
    """
    逆向某网页接口(机场节点)
    https://linux.do/t/topic/156975
    :return:
    """
    url = get_url()
    response = requests.get(url)
    data = response.text
    data = base64.b64decode(data).decode('utf-8')
    data = transfer2clash(data)
    print(data)


if __name__ == '__main__':
    get_node()
