import requests
import base64
import uuid
import json


def get_node_v1():
    # https://linux.do/t/topic/166364
    def get_subscribe_url():
        headers = {
            'Host': 'api.ad67.xyz',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'http://localhost',
            'X-Requested-With': 'com.lbjqys.lbjsqxyz',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'http://localhost/login',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; Pixel XL Build/NZH54D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.117 Mobile Safari/537.36'
        }
        data = {
            'oaid': str(uuid.uuid4()),
            'device': 'android',
            'channel_uuid': 'lbDEFAULT'
        }
        response = requests.post('http://api.ad67.xyz/api/v1/passport/auth/oaid2Login', headers=headers, data=data)
        if response.status_code != 200:
            print("oaid2Login:", response.status_code,
                  response.content.decode('utf-8').encode('latin1').decode('unicode_escape'))
            return None

        auth_data = response.json()['data']['auth_data']
        headers = {
            'Host': 'api.ad67.xyz',
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/plain, */*',
            'Authorization': auth_data,
            'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; Pixel XL Build/NZH54D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.117 Mobile Safari/537.36',
            'Content-Type': 'application/json',
            'Origin': 'http://localhost',
            'X-Requested-With': 'com.lbjqys.lbjsqxyz',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'http://localhost/permission',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'
        }
        response = requests.get('http://api.ad67.xyz/api/v1/user/getSubscribe', headers=headers)
        if response.status_code != 200:
            print("getSubscribe:", response.status_code,
                  response.content.decode('utf-8').encode('latin1').decode('unicode_escape'))
            return None

        return response.json()['data']['subscribe_url']

    api = get_subscribe_url()
    response = requests.get(api)
    content = base64.b64decode(response.text).decode('utf-8')
    url = f'https://sub-back.zeze.love/sub?target=clash&url={content}'
    response = requests.get(url)
    print(response.text)


def get_node_v2():
    # https://linux.do/t/topic/156975
    api = "http://bailao.cangqion.sbs/get_free_node"
    response = requests.get(api, timeout=60)
    if response.status_code != 200:
        print("get_free_v2:", response.status_code, response.text)
        return None
    data = json.loads(response.text)
    url = data['output'][0].split(' ')[1]
    response = requests.get(url)
    print(response.text)


def get_node_turbo_vpn():
    # https://linux.do/t/topic/163060
    response = requests.get("http://testt.leov.asia/linuxdo/fox.php")
    raw = response.text.split(':"OK","data":')[1][:-1:]
    data = json.loads(raw)['server_list']
    print(data)


if __name__ == '__main__':
    get_node_v2()
