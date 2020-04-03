import tornado.ioloop
import tornado.options
import tornado.web
import os.path
from tornado.options import define, options
import tornado.websocket
import logging
import uuid
import datetime
from tornado.web import RequestHandler

define("port", default=8888, help="run on the give port", type=int)


class Application(tornado.web.Application):
    
    def __init__(self):
        handlers =[
            (r"/chat", ChatHandler)
        ]
        settings = dict(
            cookie_secret = "12345",
            xsrf_cookie = True,
        )
        super(Application, self).__init__(handlers, **settings)


class ChatHandler(tornado.websocket.WebSocketHandler):
    waiters = set()
    # 返回发送信息,更新到缓存列表
    cache_list = []

    def check_origin(self, origin): # 跨域用
        return True

    def open(self):
        ChatHandler.waiters.add(self)
        chat_dict = {}
        chat_dict["cache"] = ChatHandler.cache_list
        ChatHandler.send_update(chat_dict)

    def on_close(self):
        ChatHandler.waiters.remove(self)

    def on_message(self, message):
        print(message)
        parsed_string = tornado.escape.json_decode(message)
        chat_msg = {}
        chat_msg["chat"] = parsed_string["chat"]
        ChatHandler.cache_list.append(chat_msg)
        ChatHandler.send_update(chat_msg)

    @classmethod
    def send_update(cls, msg):
        print("send all user")
        for waiter in cls.waiters:
            try:
                waiter.write_message(tornado.escape.json_encode(msg))
            except Exception as e:
                print(f"Error {e}")


def main():
    tornado.options.parse_command_line()
    app = Application()
    app.listen(options.port)
    tornado.ioloop.IOLoop.current().start()

if __name__ == "__main__":
    main()


























